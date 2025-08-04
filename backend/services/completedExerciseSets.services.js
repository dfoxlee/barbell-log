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

const selectCompletedExerciseSets = async ({
   completedExerciseId,
   exerciseId,
}) => {
   let query = ``;
   let values = [];

   if (completedExerciseId) {
      query = `
      SELECT ces.completed_exercise_set_id AS completedExerciseSetId, 
            ces.completed_exercise_id AS completedExerciseId, 
            ces.exercise_set_id AS exerciseSetId, 
            ces.completed_exercise_set_order AS completedExerciseSetOrder,
            es.has_reps AS hasReps,
            es.is_bodyweight AS isBodyweight,
            es.is_timed AS isTimed,
            es.is_distance AS isDistance,
            es.is_warmup AS isWarmup,
            ces.completed_reps AS completedReps, 
            ces.completed_weight AS completedWeight, 
            ces.completed_weight_unit AS completedWeightUnit,
            ces.completed_distance AS completedDistance, 
            ces.completed_distance_unit AS completedDistanceUnit,
            ces.completed_hr AS completedHr, 
            ces.completed_min AS completedMin, 
            ces.completed_sec AS completedSec, 
            ces.notes, 
            ces.is_complete AS isComplete
         FROM completed_exercise_set ces
         INNER JOIN exercise_set es ON ces.exercise_set_id = es.exercise_set_id
         WHERE ces.completed_exercise_id = ?
         ORDER BY ces.completed_exercise_set_order
      `;

      values = [completedExerciseId];
   } else if (exerciseId) {
      query = `
         SELECT ces.completed_exercise_set_id AS completedExerciseSetId, 
            ces.completed_exercise_id AS completedExerciseId, 
            ces.exercise_set_id AS exerciseSetId, 
            ces.completed_exercise_set_order AS completedExerciseSetOrder,
            es.has_reps AS hasReps,
            es.is_bodyweight AS isBodyweight,
            es.is_timed AS isTimed,
            es.is_distance AS isDistance,
            es.is_warmup AS isWarmup,
            ces.completed_reps AS completedReps, 
            ces.completed_weight AS completedWeight, 
            ces.completed_weight_unit AS completedWeightUnit,
            ces.completed_distance AS completedDistance, 
            ces.completed_distance_unit AS completedDistanceUnit,
            ces.completed_hr AS completedHr, 
            ces.completed_min AS completedMin, 
            ces.completed_sec AS completedSec, 
            ces.notes, 
            ces.is_complete AS isComplete
            FROM completed_exercise_set AS ces
            INNER JOIN exercise_set es ON ces.exercise_set_id = es.exercise_set_id
            WHERE es.exercise_id = ?
            ORDER BY ces.completed_exercise_set_order
      `;

      values = [exerciseId];
   } else {
      throw new Error("No values match.");
   }

   const [selectCompletedExerciseSetsResults] = await pool.execute(
      query,
      values
   );

   return selectCompletedExerciseSetsResults;
};

const insertCompletedExerciseSet = async ({
   completedExerciseId,
   exerciseSetId,
   completedExerciseSetOrder,
   completedReps,
   completedWeight,
   completedWeightUnit,
   completedDistance,
   completedDistanceUnit,
   completedHr,
   completedMin,
   completedSec,
   notes,
   isComplete,
}) => {
   const [insertCompletedExerciseSetResults] = await pool.execute(
      `
         INSERT INTO completed_exercise_set (completed_exercise_id, exercise_set_id, completed_exercise_set_order, completed_reps, completed_weight, completed_weight_unit, completed_distance, completed_distance_unit, completed_hr, completed_min, completed_sec, notes, is_complete)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
         completedExerciseId,
         exerciseSetId,
         completedExerciseSetOrder,
         completedReps,
         completedWeight,
         completedWeightUnit,
         completedDistance,
         completedDistanceUnit,
         completedHr,
         completedMin,
         completedSec,
         notes,
         isComplete,
      ]
   );

   return insertCompletedExerciseSetResults.insertId;
};

const updateCompletedExerciseSet = async ({
   completedExerciseSetId,
   completedExerciseSetOrder,
   completedReps,
   completedWeight,
   completedWeightUnit,
   completedDistance,
   completedDistanceUnit,
   completedHr,
   completedMin,
   completedSec,
   notes,
   isComplete,
}) => {
   const [updateCompletedExerciseSetResults] = await pool.execute(
      `
         UPDATE completed_exercise_set
         SET completed_exercise_set_order = ?, completed_reps = ?, completed_weight = ?, completed_weight_unit = ?, completed_distance = ?, completed_distance_unit = ?, completed_hr = ?, completed_min = ?, completed_sec = ?, notes = ?, is_complete = ?
         WHERE completed_exercise_set_id = ?
      `,
      [
         completedExerciseSetOrder,
         completedReps,
         completedWeight,
         completedWeightUnit,
         completedDistance,
         completedDistanceUnit,
         completedHr,
         completedMin,
         completedSec,
         notes,
         isComplete,
         completedExerciseSetId,
      ]
   );

   if (!updateCompletedExerciseSetResults.affectedRows) {
      throw new Error("Unable to update completed exercise set.");
   }

   return;
};

const deleteCompletedExerciseSet = async ({
   completedExerciseId,
   completedExerciseSetId,
   exerciseSetId,
   exerciseId,
}) => {
   let query = ``;
   let values = [];

   if (completedExerciseId) {
      query = `
         DELETE FROM completed_exercise_set
         WHERE completed_exercise_id = ?
      `;

      values = [completedExerciseId];
   } else if (completedExerciseSetId) {
      query = `
         DELETE FROM completed_exercise_set
         WHERE completed_exercise_set_id = ?
      `;

      values = [completedExerciseSetId];
   } else if (exerciseSetId) {
      query = `
         DELETE FROM completed_exercise_set
         WHERE exercise_set_id = ?
      `;

      values = [exerciseSetId];
   } else if (exerciseId) {
      debugConsoleLog(exerciseId);
      query = `
         DELETE ces
         FROM completed_exercise_set AS ces
         INNER JOIN completed_exercise AS ce ON ce.completed_exercise_id = ces.completed_exercise_id
         WHERE ce.exercise_id = ?;
      `;

      values = [exerciseId];
   } else {
      return;
   }

   const [deleteCompletedExerciseSetResults] = await pool.execute(
      query,
      values
   );

   if (!deleteCompletedExerciseSetResults.affectedRows) {
      throw new Error("Unable to delete completed exercise set.");
   }

   return;
};

module.exports = {
   selectCompletedExerciseSetIds,
   selectCompletedExerciseSets,
   insertCompletedExerciseSet,
   updateCompletedExerciseSet,
   deleteCompletedExerciseSet,
};
