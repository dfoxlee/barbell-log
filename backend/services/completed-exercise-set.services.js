const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.insertCompletedExerciseSet = async ({
   completedExerciseSet,
   completedExerciseId,
}) => {
   const query = `
      insert into completed_exercise_set (
         completed_exercise_id, 
         completed_exercise_set_order, 
         had_reps, 
         was_timed,
         was_completed,
         was_distance, 
         completed_reps, 
         completed_weight, 
         completed_weight_unit, 
         completed_hr, 
         completed_min, 
         completed_sec, 
         completed_distance, 
         completed_distance_unit,
         notes
      )
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
   `;

   const values = [
      completedExerciseId,
      completedExerciseSet.completedExerciseSetOrder,
      completedExerciseSet.hadReps,
      completedExerciseSet.wasTimed,
      completedExerciseSet.wasCompleted,
      completedExerciseSet.wasDistance,
      completedExerciseSet.completedReps,
      completedExerciseSet.completedWeight,
      completedExerciseSet.completedWeightUnit,
      completedExerciseSet.completedHr,
      completedExerciseSet.completedMin,
      completedExerciseSet.completedSec,
      completedExerciseSet.completedDistance,
      completedExerciseSet.completedDistanceUnit,
      completedExerciseSet.notes,
   ];
   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to insert completed exercise set.");
   }

   return results.insertId;
};

exports.getCompletedExerciseSet = async ({ completedExerciseSetId }) => {
   const query = `
      select completed_exercise_id as completedExerciseId, 
         completed_exercise_set_order as completedExerciseSetOrder, 
         had_reps as hadReps, 
         was_timed as wasTimed, 
         was_distance as wasDistance, 
         completed_reps as completedReps, 
         completed_weight as completedWeight, 
         completed_weight_unit as completedWeightUnit, 
         completed_hr as completedHr, 
         completed_min as completedMin, 
         completed_sec as completedSec, 
         completed_distance as completedDistance, 
         completed_distance_unit as completedDistanceUnit,
         notes
      from completed_exercise_set
      where completed_exercise_set_id = ?;
   `;

   const values = [completedExerciseSetId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getCompletedExerciseSets = async ({ completedExerciseId }) => {
   const query = `
      select completed_exercise_id as completedExerciseId,
         completed_exercise_set_id as completedExerciseSetId,
         completed_exercise_set_order as completedExerciseSetOrder, 
         had_reps as hadReps, 
         was_completed as wasCompleted,
         was_timed as wasTimed, 
         was_distance as wasDistance, 
         completed_reps as completedReps, 
         completed_weight as completedWeight, 
         completed_weight_unit as completedWeightUnit, 
         completed_hr as completedHr, 
         completed_min as completedMin, 
         completed_sec as completedSec, 
         completed_distance as completedDistance, 
         completed_distance_unit as completedDistanceUnit,
         notes
      from completed_exercise_set
      where completed_exercise_id = ?;
   `;

   const values = [completedExerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.updateCompletedExerciseSet = async ({ completedExerciseSet }) => {
   const query = `
      update completed_exercise_set
      set completed_exercise_set_order = ?, 
         had_reps = ?, 
         was_timed = ?,
         was_completed = ?,
         was_distance = ?, 
         completed_reps = ?, 
         completed_weight = ?, 
         completed_weight_unit = ?, 
         completed_hr = ?, 
         completed_min = ?, 
         completed_sec = ?, 
         completed_distance = ?, 
         completed_distance_unit = ?,
         notes = ?
      where completed_exercise_set_id = ?;
   `;

   const values = [
      completedExerciseSet.completedExerciseSetOrder,
      completedExerciseSet.hadReps,
      completedExerciseSet.wasTimed,
      completedExerciseSet.wasCompleted,
      completedExerciseSet.wasDistance,
      completedExerciseSet.completedReps,
      completedExerciseSet.completedWeight,
      completedExerciseSet.completedWeightUnit,
      completedExerciseSet.completedHr,
      completedExerciseSet.completedMin,
      completedExerciseSet.completedSec,
      completedExerciseSet.completedDistance,
      completedExerciseSet.completedDistanceUnit,
      completedExerciseSet.notes,
      completedExerciseSet.completedExerciseSetId,
   ];

   const [results] = await pool.execute(query, values);

   return;
};

exports.deleteCompletedExerciseSet = async ({ completedExerciseSetId }) => {
   const query = `
      delete from completed_exercise_set
      where completed_exercise_set_id = ?;
   `;

   const values = [completedExerciseSetId];

   const [results] = await pool.execute(query, values);

   return;
};
