const pool = require("../db/dbConfig");

exports.insertCompletedExercise = async ({
   completedExercise,
   completedWorkoutId,
}) => {
   const query = `
      insert into completed_exercise (completed_workout_id, completed_exercise_order, completed_exercise_name)
      values (?, ?, ?);
   `;

   const values = [
      completedWorkoutId,
      completedExercise.completedExerciseOrder,
      completedExercise.completedExerciseName,
   ];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to insert completed exercise.");
   }

   return results.insertId;
};

exports.getCompletedExercise = async ({ completedExerciseId }) => {
   const query = `
      select completed_exercise_id as completedExerciseId,
         completed_exercise_order as completedExerciseOrder,
         completed_exercise_name as completedExerciseName
      from completed_exercise
      where completed_exercise_id = ?;
   `;

   const values = [completedExerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getCompletedExercises = async ({ completedWorkoutId }) => {
   const query = `
      select completed_exercise_id as completedExerciseId,
         completed_exercise_order as completedExerciseOrder,
         completed_exercise_name as completedExerciseName
      from completed_exercise
      where completed_workout_id = ?;
   `;

   const values = [completedWorkoutId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.updateCompletedExercise = async ({ completedExercise }) => {
   const query = `
      update completed_exercise
      set completed_exercise_name = ?,
         completed_exercise_order = ?
      where completed_exercise_id = ?;
   `;

   const values = [
      completedExercise.completedExerciseName,
      completedExercise.completedExerciseOrder,
      completedExercise.completedExerciseId,
   ];

   const [results] = await pool.execute(query, values);

   return;
};

exports.deleteCompletedExercise = async ({ completedExerciseId }) => {
   const query = `
      delete from completed_exercise
      where completed_exercise_id = ?;
   `;

   const values = [completedExerciseId];

   const [results] = await pool.execute(query, values);

   return;
};
