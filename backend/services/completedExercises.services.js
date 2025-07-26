const pool = require("../db/dbConfig");

const getCompletedExercises = async ({ compeletedWorkoutId }) => {
   const [selectCompletedExercisesResults] = await pool.execute(
      `
         SELECT ce.completed_exercise_id AS completedExerciseId, 
            ce.exercise_id AS exerciseId, 
            ce.completed_exercise_order AS completedExerciseOrder,
            e.exercise_name AS exerciseName
         FROM completed_exercise ce
         INNER JOIN exercise e ON e.exercise_id = ce.exercise_id
         WHERE completed_workout_id = ?
      `,
      [compeletedWorkoutId]
   );

   return selectCompletedExercisesResults;
};

module.exports = { getCompletedExercises };
