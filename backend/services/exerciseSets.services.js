const pool = require("../db/dbConfig");

const getExerciseSets = async ({ exerciseId }) => {
   let query = "";
   let values = [];

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
   `;

   values.push(exerciseId);

   const [selectExerciseSetsResults] = await pool.execute(query, values);

   return selectExerciseSetsResults;
};

const createExerciseSet = async ({
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

module.exports = {
   getExerciseSets,
   createExerciseSet,
};
