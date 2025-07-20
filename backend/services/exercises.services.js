const pool = require("../db/dbConfig");

const getExercises = async ({ workoutId, exerciseName }) => {
   const query = "";
   const values = [];

   if (workoutId && exerciseName) {
      query = `
         SELECT exercise_id AS exerciseId, workout_id AS workoutId, exercise_order AS exerciseOrder, exercise_name AS exerciseName
         FROM exercise
         WHERE exercise_name = ?
            AND workout_id = ?;
      `;

      values.push(exerciseName, workoutId);
   } else if (workoutId) {
      query = `
         SELECT exercise_id AS exerciseId, workout_id AS workoutId, exercise_order AS exerciseOrder, exercise_name AS exerciseName
         FROM exercise
         WHERE workout_id = ?
      `;

      values.push(workoutId);
   }

   const [selectNewExerciseResults] = await pool.execute(query, values);

   return selectNewExerciseResults;
};

const createExercise = async ({
   newWorkoutId,
   exerciseName,
   exerciseOrder,
}) => {
   const [insertExerciseResults] = await pool.execute(
      `
               INSERT INTO exercise (workout_id, exercise_name, exercise_order)
               VALUES (?, ?, ?)
            `,
      [newWorkoutId, exerciseName, exerciseOrder]
   );

   if (!insertExerciseResults.affectedRows) {
      throw new Error("Unable to create exercise.");
   }
};

module.exports = {
   getExercises,
   createExercise,
};
