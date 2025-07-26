const pool = require("../db/dbConfig");

const getCompletedWorkout = async ({ completedWorkoutId }) => {
   const [selectCompletedWorkoutResults] = await pool.execute(
      `
         SELECT cw.completed_workout_id as completedWorkoutId, 
            cw.workout_id as workoutId, 
            w.workout_name as workoutName, 
            cw.completed_date as completedDate
         FROM completed_workout cw
         INNER JOIN workout w ON w.workout_id = cw.workout_id
         WHERE cw.completedWorkoutId = ?;
      `,
      [completedWorkoutId]
   );

   return selectCompletedWorkoutResults;
};

module.exports = { getCompletedWorkout };
