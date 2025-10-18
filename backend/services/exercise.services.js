const pool = require("../db/dbConfig");

exports.createExercise = async ({ workoutId, exerciseName, exerciseOrder }) => {
   const query = `
      insert into exercise (workout_id, exercise_name, exercise_order)
      values (?, ?, ?   );
   `;

   const values = [workoutId, exerciseName, exerciseOrder];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to create exercise.");
   }

   return results.insertId;
};

exports.getExercises = async ({ exerciseId, workoutId }) => {
   let query = ``;
   let values = [];

   if (exerciseId) {
      query = `
         select exercise_id as exerciseId,
            exercise_name as exerciseName,
            exercise_order as exerciseOrder
         from exercise
         where exercise_id = ?;
      `;

      values = [exerciseId];
   } else if (workoutId) {
      query = `
         select exercise_id as exerciseId,
            exercise_name as exerciseName,
            exercise_order as exerciseOrder
         from exercise
         where workout_id = ?;
      `;

      values = [workoutId];
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results;
};

exports.updateExercise = async ({ exercise }) => {
   const query = `
      update exercise
      set exercise_name = ?,
         exercise_order = ?
      where exercise_id = ?;
   `;

   const values = [
      exercise.exerciseName,
      exercise.exerciseOrder,
      exercise.exerciseId,
   ];

   await pool.execute(query, values);

   return;
};

exports.deleteExercise = async ({ exerciseId }) => {
   const query = `
      delete from exercise
      where exercise_id = ?;
   `;

   const values = [exerciseId];


   await pool.execute(query, values);

   return;
};
