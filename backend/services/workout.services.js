const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.getUserWorkouts = async ({ userId }) => {
   let query = ``;
   let values = [];

   if (userId) {
      query = `
         select workout_id as workoutId,
            workout_name as workoutName,
            workout_type as workoutType,
            case 
               when user_id is null then false 
               else true
            end as isUserWorkout
         from workout
         where user_id = ?
            OR user_id IS null
         order by
            user_id desc;
      `;

      values = [userId];
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getWorkout = async ({ workoutId }) => {
   let query = ``;
   let values = [];

   if (workoutId) {
      query = `
         select workout_id as workoutId,
            workout_name as workoutName,
            workout_type as workoutType,
            case 
               when user_id is null then false 
               else true
            end as isUserWorkout
         from workout
         where workout_id = ?
            OR user_id IS null
         order by
            user_id desc;
      `;

      values = [workoutId];
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results;
};

exports.createWorkout = async ({
   userId,
   createdAt,
   workoutName,
   workoutType,
}) => {
   const query = `
      insert into workout (user_id, workout_name, workout_type, created_at)
      values (?, ?, ?, ?);
   `;

   const values = [userId, workoutName, workoutType, createdAt];

   const [results] = await pool.execute(query, values);
   if (!results.affectedRows) {
      throw new Error("Unable to create workout.");
   }

   return results.insertId;
};

exports.updateWorkout = async ({ workout }) => {
   const query = `
      update workout
      set workout_name = ?,
         workout_type = ?
      where workout_id = ?;
   `;

   const values = [workout.workoutName, workout.workoutType, workout.workoutId];

   await pool.execute(query, values);

   return;
};

exports.deleteWorkout = async ({ workoutId }) => {
   const query = `
      delete from workout
      where workout_id = ?;
   `;

   const values = [workoutId];

   await pool.execute(query, values);

   return;
};
