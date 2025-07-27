const pool = require("../db/dbConfig");

const getCompletedExercises = async ({ completedWorkoutId, exerciseId }) => {
   let query = ``;
   let values = [];

   if (completedWorkoutId && exerciseId) {
      query = `
      SELECT ce.completed_exercise_id AS completedExerciseId, 
      ce.exercise_id AS exerciseId, 
      ce.completed_exercise_order AS completedExerciseOrder,
      e.exercise_name AS exerciseName
      FROM completed_exercise ce
      INNER JOIN exercise e ON e.exercise_id = ce.exercise_id
      WHERE completed_workout_id = ? AND e.exercise_id = ?
      `;

      values.push(completedWorkoutId, exerciseId);
   } else if (completedWorkoutId) {
      query = `
      SELECT ce.completed_exercise_id AS completedExerciseId, 
      ce.exercise_id AS exerciseId, 
      ce.completed_exercise_order AS completedExerciseOrder,
      e.exercise_name AS exerciseName
      FROM completed_exercise ce
      INNER JOIN exercise e ON e.exercise_id = ce.exercise_id
      WHERE ce.completed_workout_id = ?
      `;

      values.push(completedWorkoutId);
   } else {
      return [];
   }

   const [selectCompletedExerciseResults] = await pool.execute(query, values);

   return selectCompletedExerciseResults;
};

const createCompletedExercise = async ({
   completedWorkoutId,
   exerciseId,
   completedExerciseOrder,
}) => {
   const [insertCompletedExerciseResults] = await pool.execute(
      `
         INSERT INTO completed_exercise (completed_workout_id, exercise_id, completed_exercise_order)
         VALUES (?, ?, ?)
      `,
      [completedWorkoutId, exerciseId, completedExerciseOrder]
   );

   return insertCompletedExerciseResults.insertId;
};

const updateCompletedExercise = async ({
   completedExerciseId,
   completedExerciseOrder,
}) => {
   const [updateCompletedExerciseResults] = await pool.execute(
      `
         UPDATE completed_exercise
         SET completed_exercise_order = ?
         WHERE completed_exercise_id = ?
      `,
      [completedExerciseOrder, completedExerciseId]
   );

   if (!updateCompletedExerciseResults.affectedRows) {
      throw new Error("Unable to update completed exercise.");
   }

   return;
};

const deleteCompletedExercise = async ({
   completedWorkoutId,
   completedExerciseId,
   exerciseId,
}) => {
   let query = ``;
   let values = [];

   if (completedWorkoutId) {
      query = `
         DELETE FROM completed_exercise
         WHERE completed_workout_id = ? AND completed_exercise_id = ?
      `;

      values = [completedWorkoutId, completedExerciseId];
   } else if (completedExerciseId) {
      query = `
         DELETE FROM completed_exercise
         WHERE completed_exercise_id = ?
      `;

      values = [completedExerciseId];
   } else if (exerciseId) {
      query = `
         DELETE FROM completed_exercise
         WHERE exercise_id = ?
      `;

      values = [exerciseId];
   } else {
      return;
   }

   const [deleteCompletedExerciseResults] = await pool.execute(query, values);

   if (!deleteCompletedExerciseResults.affectedRows) {
      throw new Error("Unable to delete completed exercise.");
   }

   return;
};

module.exports = {
   getCompletedExercises,
   createCompletedExercise,
   updateCompletedExercise,
   deleteCompletedExercise,
};
