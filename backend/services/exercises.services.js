const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const selectExerciseIds = async ({ workoutId }) => {
   const [selectExerciseIdsResults] = await pool.execute(
      `
         SELECT exercise_id
         FROM exercise
         WHERE workout_id = ?
      `,
      [workoutId]
   );

   return selectExerciseIdsResults.map((set) => set.exercise_id);
};

const selectExercises = async ({ workoutId, exerciseName, exerciseOrder }) => {
   let query = "";
   let values = [];

   if (workoutId && exerciseName) {
      query = `
         SELECT exercise_id AS exerciseId, workout_id AS workoutId, exercise_order AS exerciseOrder, exercise_name AS exerciseName
         FROM exercise
         WHERE exercise_name = ?
            AND workout_id = ?;
      `;

      values.push(exerciseName, workoutId);
   } else if (workoutId && exerciseOrder) {
      query = `
         SELECT exercise_id AS exerciseId, workout_id AS workoutId, exercise_order AS exerciseOrder, exercise_name AS exerciseName
         FROM exercise
         WHERE workout_id = ?
            AND exercise_order = ?;
      `;

      values.push(workoutId, exerciseOrder);
   } else if (workoutId) {
      query = `
         SELECT exercise_id AS exerciseId, workout_id AS workoutId, exercise_order AS exerciseOrder, exercise_name AS exerciseName
         FROM exercise
         WHERE workout_id = ?
         ORDER BY exerciseOrder;
      `;

      values.push(workoutId);
   }

   const [selectNewExerciseResults] = await pool.execute(query, values);

   return selectNewExerciseResults;
};

const insertExercise = async ({ workoutId, exerciseName, exerciseOrder }) => {
   const [insertExerciseResults] = await pool.execute(
      `
               INSERT INTO exercise (workout_id, exercise_name, exercise_order)
               VALUES (?, ?, ?)
            `,
      [workoutId, exerciseName, exerciseOrder]
   );

   if (!insertExerciseResults.affectedRows) {
      throw new Error("Unable to create exercise.");
   }
};

const updateExercise = async ({ exerciseId, exerciseName, exerciseOrder }) => {
   const [updateExerciseResults] = await pool.execute(
      `
         UPDATE exercise
         SET exercise_name = ?, exercise_order = ?
         WHERE exercise_id = ?
      `,
      [exerciseName, exerciseOrder, exerciseId]
   );

   return;
};

const deleteExercise = async ({ exerciseId, workoutId }) => {
   let query = "";
   let values = [];

   if (exerciseId) {
      query = `
         DELETE FROM exercise
         WHERE exercise_id = ?
      `;

      values.push(exerciseId);
   } else if (workoutId) {
      query = `
         DELETE FROM exercise
         WHERE workout_id = ?
      `;

      values.push(workoutId);
   }

   const [deleteExerciseResults] = await pool.execute(query, values);

   return;
};

module.exports = {
   selectExerciseIds,
   selectExercises,
   insertExercise,
   updateExercise,
   deleteExercise,
};
