const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const selectExerciseSetIds = async ({ exerciseId }) => {
   const [selectExerciseSetIdsResults] = await pool.execute(
      `
         SELECT exercise_set_id
         FROM exercise_set
         WHERE exercise_id = ?
      `,
      [exerciseId]
   );

   return selectExerciseSetIdsResults.map((set) => set.exercise_set_id);
};

const selectExerciseSets = async ({ exerciseId, exerciseSetId }) => {
   let query = "";
   let values = [];

   if (exerciseId) {
      query = `
      SELECT exercise_set_id AS exerciseSetId,
         exercise_id AS exerciseId,
         reps,
         weight,
         has_reps AS hasReps,
         is_bodyweight AS isBodyweight,
         is_timed AS isTimed,
         is_distance AS isDistance,
         is_warmup AS isWarmup,
         weight_unit AS weightUnit,
         distance,
         distance_unit as distanceUnit,
         hr,
         min,
         sec,
         exercise_set_order AS exerciseSetOrder
      FROM exercise_set
      WHERE exercise_id = ?
      ORDER BY exerciseSetOrder
   `;

      values.push(exerciseId);
   } else if (exerciseSetId) {
      query = `
      SELECT exercise_set_id AS exerciseSetId,
         exercise_id AS exerciseId,
         reps,
         weight,
         has_reps AS hasReps,
         is_bodyweight AS isBodyweight,
         is_timed AS isTimed,
         is_distance AS isDistance,
         is_warmup AS isWarmup,
         weight_unit AS weightUnit,
         distance,
         distance_unit as distanceUnit,
         hr,
         min,
         sec,
         exercise_set_order AS exerciseSetOrder
      FROM exercise_set
      WHERE exercise_set_id = ?
      ORDER BY exerciseSetOrder
      `;

      values.push(exerciseSetId);
   } else {
      return;
   }

   const [selectExerciseSetsResults] = await pool.execute(query, values);

   return selectExerciseSetsResults;
};

const insertExerciseSet = async ({
   exerciseId,
   reps,
   weight,
   hasReps,
   isBodyweight,
   isTimed,
   isDistance,
   isWarmup,
   weightUnit,
   distanceUnit,
   distance,
   hr,
   min,
   sec,
   exerciseSetOrder,
}) => {
   const [insertExerciseSetResults] = await pool.execute(
      `
         INSERT INTO exercise_set (
            exercise_id, 
            reps,
            weight,
            has_reps,
            is_bodyweight,
            is_timed,
            is_distance,
            is_warmup,
            weight_unit,
            distance_unit,
            distance,
            hr,
            min,
            sec,
            exercise_set_order
         )
         VALUES (
            ?, 
            ?, 
            ?, 
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
         )
      `,
      [
         exerciseId,
         reps,
         weight,
         hasReps,
         isBodyweight,
         isTimed,
         isDistance,
         isWarmup,
         weightUnit,
         distanceUnit,
         distance,
         hr,
         min,
         sec,
         exerciseSetOrder,
      ]
   );

   if (!insertExerciseSetResults.affectedRows) {
      throw new Error("Unable to insert set into database.");
   }

   return;
};

const updateExerciseSet = async ({
   exerciseSetId,
   reps,
   weight,
   hasReps,
   isBodyweight,
   isTimed,
   isDistance,
   isWarmup,
   weightUnit,
   distanceUnit,
   distance,
   hr,
   min,
   sec,
   exerciseSetOrder,
}) => {
   const [updateExerciseSetResults] = await pool.execute(
      `
         UPDATE exercise_set
         SET reps = ?,
            weight = ?,
            has_reps = ?,
            is_bodyweight = ?,
            is_timed = ?,
            is_distance = ?,
            is_warmup = ?,
            weight_unit = ?,
            distance_unit = ?,
            distance = ?,
            hr = ?,
            min = ?,
            sec = ?,
            exercise_set_order = ?
         WHERE exercise_set_id = ?
      `,
      [
         reps,
         weight,
         hasReps,
         isBodyweight,
         isTimed,
         isDistance,
         isWarmup,
         weightUnit,
         distanceUnit,
         distance,
         hr,
         min,
         sec,
         exerciseSetOrder,
         exerciseSetId,
      ]
   );

   return;
};

const deleteExerciseSet = async ({ exerciseSetId, exerciseId }) => {
   let query = "";
   let values = [];

   if (exerciseSetId) {
      query = `
      DELETE FROM exercise_set
      WHERE exercise_set_id = ?
      `;

      values.push(exerciseSetId);
   } else if (exerciseId) {
      query = `
      DELETE FROM exercise_set
      WHERE exercise_id = ?
      `;

      values.push(exerciseId);
   }

   const [deleteExerciseSetResults] = await pool.execute(query, values);

   return;
};

module.exports = {
   selectExerciseSetIds,
   selectExerciseSets,
   insertExerciseSet,
   updateExerciseSet,
   deleteExerciseSet,
};
