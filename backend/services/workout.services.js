const pool = require("../db/dbConfig");

exports.getUserWorkouts = async ({ userId }) => {
   let query = ``;
   let values = [];

   if (userId) {
      query = `
         select workout_id as workoutId,
            workout_name as workoutName,
            workout_type as workoutType
            case user_id 
               when null then false 
               else true
            end as isUserWorkout
         from workout
         where user_id = ?
            or user_id = null
         order by user_id desc;
      `;

      values = [userId];
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results;
};

exports.createWorkout = async ({
   userId,
   workoutName,
   workoutTypeId,
   createdAt,
}) => {
   const query = `
      insert into workout (user_id, workout_name, workout_type_id, created_at)
      values (?, ?, ?, ?);
   `;

   const values = [userId, workoutName, workoutTypeId, createdAt];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRow) {
      throw new Error("Unable to create workout.");
   }

   return results.insertId;
};
