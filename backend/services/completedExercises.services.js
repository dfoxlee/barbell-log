const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const selectCompletedExercises = async ({
   completedWorkoutId,
   completedExerciseOrder,
}) => {
   let query = ``;
   let values = [];

   if (completedWorkoutId && completedExerciseOrder) {
      query = `
         SELECT completed_exercise_id AS completedExerciseId,
            completed_exercise_order AS completedExerciseOrder,
            completed_exercise_name AS completedExerciseName
         FROM completed_exercise
         WHERE completed_workout_id = ?
            AND completed_exercise_order = ?;
      `;

      values.push(completedWorkoutId, completedExerciseOrder);
   } else if (completedWorkoutId) {
      query = `
         SELECT completed_exercise_id AS completedExerciseId,
            completed_exercise_order AS completedExerciseOrder,
            completed_exercise_name AS completedExerciseName
         FROM completed_exercise
         WHERE completed_workout_id = ?;
      `;

      values.push(completedWorkoutId);
   } else {
      return [];
   }

   const [selectCompletedExerciseResults] = await pool.execute(query, values);

   return selectCompletedExerciseResults;
};

const insertCompletedExercise = async (completedExercise) => {
   const [insertCompletedExerciseResults] = await pool.execute(
      `
         INSERT INTO completed_exercise (
            completed_workout_id,
            completed_exercise_order,
            completed_exercise_name
         )
         VALUES (?, ?, ?)
      `,
      [
         completedExercise.completedWorkoutId,
         completedExercise.completedExerciseOrder,
         completedExercise.completedExerciseName,
      ]
   );

   if (!insertCompletedExerciseResults.affectedRows) {
      throw new Error("Unable to create new completed exercise.");
   }

   return;
};

const updateCompletedExercise = async (completedExercise) => {
   await pool.execute(
      `
         UPDATE completed_exercise
         SET completed_exercise_order = ?,
            completed_exercise_name = ?,
         WHERE completed_exercise_id = ?
      `,
      [
         completedExercise.completedExerciseOrder,
         completedExercise.completedExerciseName,
         completedExercise.completedExerciseId,
      ]
   );

   return;
};

const deleteCompletedExercise = async (completedExerciseId) => {
   await pool.execute(
      `
         DELETE FROM completed_exercise
         WHERE completed_exercise_id = ?
      `,
      [completedExerciseId]
   );
   return;
};

module.exports = {
   selectCompletedExercises,
   insertCompletedExercise,
   updateCompletedExercise,
   deleteCompletedExercise,
};
