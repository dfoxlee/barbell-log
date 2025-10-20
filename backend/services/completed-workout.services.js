const pool = require("../db/dbConfig");

exports.insertCompletedWorkout = async ({
   completedWorkout,
   userId,
   completedDate,
}) => {
   const query = `
      insert into completed_workout (user_id, completed_workout_name, completed_date, completed_workout_type)
      values (?, ?, ?, ?);
   `;

   const values = [
      userId,
      completedWorkout.completedWorkoutName,
      completedDate,
      completedWorkout.completedWorkoutType,
   ];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to insert completed workout.");
   }

   return results.insertId;
};

exports.getCompletedWorkout = async ({ completedWorkoutId }) => {
   const query = `
      select completed_workout_id as completedWorkoutId,
         completed_workout_name as completedWorkoutName,
         completed_workout_type as completedWorkoutType
      from completed_workout
      where completed_workout_id = ?;
   `;

   const values = [completedWorkoutId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getCompletedWorkouts = async ({ userId }) => {
   const query = `
      select completed_workout_id as completedWorkoutId,
         completed_workout_name as completedWorkoutName,
         completed_workout_type as completedWorkoutType,
         completed_date as completedDate
      from completed_workout
      where user_id = ?
      order by completed_date desc
      limit 90;
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.updateCompletedWorkout = async ({ completedWorkout }) => {
   const query = `
      update completed_workout
      set completed_workout_name = ?,
         completed_workout_type = ?
      where completed_workout_id = ?;
   `;

   const values = [
      completedWorkout.completedWorkoutName,
      completedWorkout.completedWorkoutType,
      completedWorkout.completedWorkoutId,
   ];

   const [results] = await pool.execute(query, values);

   return;
};

exports.deleteCompletedWorkout = async ({ completedWorkoutId, userId }) => {
   let query = ``;
   let values = [];
   if (completedWorkoutId) {
      query = `
      delete from completed_workout
      where completed_workout_id = ?;
      `;

      values = [completedWorkoutId];
   } else if (userId) {
      query = `
      delete from completed_workout
      where user_id = ?;
      `;

      values = [userId];
   } else {
      return;
   }

   await pool.execute(query, values);

   return;
};
