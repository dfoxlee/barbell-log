const pool = require("../db/dbConfig");

const selectWorkouts = async ({ userId, workoutName, workoutId }) => {
   let query = "";
   let values = [];

   if (workoutName && userId) {
      query = `
         SELECT workout_id AS workoutId, workout_name AS workoutName, created_date AS createdDate
         FROM workout
         WHERE user_id = ?
            AND workout_name = ?
      `;

      values.push(userId, workoutName);
   } else if (workoutId) {
      query = `
         SELECT workout_id AS workoutId, workout_name AS workoutName, created_date AS createdDate
         FROM workout
         WHERE workout_id = ?
      `;

      values.push(workoutId);
   } else {
      query = `
      SELECT workout_id AS workoutId, workout_name AS workoutName, created_date AS createdDate
      FROM workout
      WHERE user_id = ?
      `;

      values.push(userId);
   }

   const [selectWorkoutsResults] = await pool.execute(query, values);

   return selectWorkoutsResults;
};

const insertWorkout = async ({ userId, workoutName }) => {
   const createdDate = new Date();

   const [insertWorkoutResults] = await pool.execute(
      `
            INSERT INTO workout (user_id, workout_name, created_date) 
            VALUES (?, ?, ?)
         `,
      [userId, workoutName, createdDate]
   );

   if (!insertWorkoutResults.affectedRows) {
      throw new Error("Unable to create workout.");
   }

   return;
};

const updateWorkout = async ({ workoutId, workoutName }) => {
   const [updateWorkoutResults] = await pool.execute(
      `
         UPDATE workout
         SET workout_name = ?
         WHERE workout_id = ?
      `,
      [workoutName, workoutId]
   );

   return;
};

const deleteWorkout = async ({ workoutId }) => {
   const [deleteWorkoutResult] = await pool.execute(
      `
         DELETE FROM workout
         WHERE workout_id = ?
      `,
      [workoutId]
   );

   return;
};

module.exports = {
   selectWorkouts,
   insertWorkout,
   updateWorkout,
   deleteWorkout,
};
