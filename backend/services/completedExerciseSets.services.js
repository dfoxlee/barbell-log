const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const selectCompletedExerciseSetIds = async ({ completedExerciseId }) => {
   const query = `
      SELECT completed_exercise_set_id as completedExerciseSetId
      FROM completed_exercise_set
      WHERE completed_exercise_id = ?
   `;
   const values = [completedExerciseId];

   const [selectCompletedExerciseSetIdsResult] = await pool.execute(
      query,
      values
   );

   return selectCompletedExerciseSetIdsResult.map(
      (s) => s.completedExerciseSetId
   );
};

const selectCompletedExerciseSets = async ({ completedExerciseId }) => {
   let query = ``;
   let values = [];

   if (completedExerciseId) {
      query = `
      SELECT completed_exercise_set_id as completedExerciseSetId,
         completed_exercise_id as completedExerciseId,
         completed_reps as completedReps,
         completed_weight as completedWeight,
         notes,
         is_complete as isComplete,
         completed_distance as completedDistance,
         completed_hr as completedHr,
         completed_min as completdMin,
         completed_sec as completedSec,
         completed_exercise_set_order as completedExerciseSetOrder,
         completed_weight_unit as completedWeightUnit,
         completed_distance_unit as completedDistanceUnit,
         had_reps as hadReps,
         was_bodyweight as wasBodyweight,
         was_timed as wasTimed,
         was_distance as wasDistance,
         was_warmup as wasWarmup
      FROM completed_exercise_set
      WHERE completed_exercise_id = ?
      `;

      values = [completedExerciseId];
   } else {
      throw new Error("No values match.");
   }

   const [selectCompletedExerciseSetsResults] = await pool.execute(
      query,
      values
   );

   return selectCompletedExerciseSetsResults;
};

const insertCompletedExerciseSet = async (completedExerciseSet) => {
   const [insertCompletedExerciseSetResults] = await pool.execute(
      `
         INSERT INTO completed_exercise_set (
            completed_exercise_id,
            completed_reps,
            completed_weight,
            notes,
            is_complete,
            completed_distance,
            completed_hr,
            completed_min,
            completed_sec,
            completed_exercise_set_order,
            completed_weight_unit,
            completed_distance_unit,
            had_reps,
            was_bodyweight,
            was_timed,
            was_distance,
            was_warmup,
            update_exercise_set_id
         )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
         completedExerciseSet.completedExerciseId,
         completedExerciseSet.completedReps,
         completedExerciseSet.completedWeight,
         completedExerciseSet.notes,
         completedExerciseSet.isComplete ? 1 : 0,
         completedExerciseSet.completedDistance,
         completedExerciseSet.completedHr,
         completedExerciseSet.completedMin,
         completedExerciseSet.completedSec,
         completedExerciseSet.completedExerciseSetOrder,
         completedExerciseSet.completedWeightUnit,
         completedExerciseSet.completedDistanceUnit,
         completedExerciseSet.hadReps,
         completedExerciseSet.wasBodyweight,
         completedExerciseSet.wasTimed,
         completedExerciseSet.wasDistance,
         completedExerciseSet.wasWarmup,
         completedExerciseSet.updateExerciseSetId
      ]
   );

   if (!insertCompletedExerciseSetResults.affectedRows) {
      throw new Error("Unable to insert completed exercise set.");
   }

   return;
};

const updateCompletedExerciseSet = async (completedExerciseSet) => {
   await pool.execute(
      `
         UPDATE completed_exercise_set
         SET completed_exercise_id,
            completed_reps,
            completed_weight,
            notes,
            is_complete,
            completed_distance,
            completed_hr,
            completed_min,
            completed_sec,
            completed_exercise_set_order,
            completed_weight_unit,
            copmleted_distance,Unit,
            had_reps,
            was_bodyweight,
            was_timed,
            was_distance,
            was_warmup
         WHERE completed_exercise_set_id = ?
      `,
      [
         completedExerciseSet.completedExerciseId,
         completedExerciseSet.completedReps,
         completedExerciseSet.completedWeight,
         completedExerciseSet.notes,
         completedExerciseSet.isComplete,
         completedExerciseSet.completedDistance,
         completedExerciseSet.completedHr,
         completedExerciseSet.completedMin,
         completedExerciseSet.completedSec,
         completedExerciseSet.completedExerciseSetOrder,
         completedExerciseSet.completedWeightUnit,
         completedExerciseSet.completedDistanceUnit,
         completedExerciseSet.hadReps,
         completedExerciseSet.wasBodyweight,
         completedExerciseSet.wasTimed,
         completedExerciseSet.wasDistance,
         completedExerciseSet.wasWarmup,
         completedExerciseSet.completedExerciseSetId,
      ]
   );

   return;
};

const deleteCompletedExerciseSet = async (completedExerciseSetId) => {
   await pool.execute(
      `
         DELETE FROM completed_exercise_set
         WHERE completed_exercise_set_id = ?
      `,
      [completedExerciseSetId]
   );
};

module.exports = {
   selectCompletedExerciseSetIds,
   selectCompletedExerciseSets,
   insertCompletedExerciseSet,
   updateCompletedExerciseSet,
   deleteCompletedExerciseSet,
};
