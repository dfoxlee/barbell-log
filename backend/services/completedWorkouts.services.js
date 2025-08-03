const pool = require("../db/dbConfig");

const selectCompletedWorkout = async ({
   completedWorkoutId,
   workoutId,
   completedDate,
   userId,
}) => {
   let query = ``;
   let values = [];

   if (completedWorkoutId) {
      query = `
      SELECT cw.completed_workout_id AS completedWorkoutId,
                cw.workout_id AS workoutId,
                w.workout_name AS workoutName,
                cw.completed_date AS completedDate
             FROM completed_workout cw
             INNER JOIN workout w ON w.workout_id = cw.workout_id
             WHERE cw.completed_workout_id = ?;
      `;

      values.push(completedWorkoutId);
   } else if (workoutId && completedDate) {
      query = `
         SELECT cw.completed_workout_id AS completedWorkoutId,
            cw.workout_id AS workoutId,
            w.workout_name AS workoutName,
            cw.completed_date AS completedDate
         FROM completed_workout cw
         INNER JOIN workout w ON w.workout_id = cw.workout_id
         WHERE cw.workout_id = ?
            AND cw.completed_date = ?;
      `;
      values.push(workoutId, completedDate);
   } else if (workoutId) {
      query = `
         SELECT cw.completed_workout_id AS completedWorkoutId,
            cw.workout_id AS workoutId,
            w.workout_name AS workoutName,
            cw.completed_date AS completedDate
         FROM completed_workout cw
         INNER JOIN workout w ON w.workout_id = cw.workout_id
         WHERE cw.workout_id = ?;
      `;
      values.push(workoutId);
   } else if (userId) {
      query = `
         SELECT cw.completed_workout_id AS completedWorkoutId,
                cw.workout_id AS workoutId,
                w.workout_name AS workoutName,
                cw.completed_date AS completedDate
         FROM completed_workout cw
         INNER JOIN workout w ON w.workout_id = cw.workout_id
         WHERE w.user_id = ?
         ORDER BY cw.completed_date DESC
      `;

      values.push(userId);
   } else {
      return;
   }

   const [selectCompletedWorkoutResults] = await pool.execute(query, values);

   return selectCompletedWorkoutResults;
};

const insertCompletedWorkout = async ({ workoutId, completedDate }) => {
   const [insertCompletedWorkoutResults] = await pool.execute(
      `
         INSERT INTO completed_workout (workout_id, completed_date)
         VALUES (?, ?);
      `,
      [workoutId, completedDate]
   );

   if (!insertCompletedWorkoutResults.affectedRows) {
      throw new Error("Unable to create completed workout.");
   }

   return insertCompletedWorkoutResults.insertId;
};

const deleteCompletedWorkouts = async ({ completedWorkoutId, workoutId }) => {
   let query = ``;
   let values = [];

   if (completedWorkoutId) {
      query = `
         DELETE FROM completed_workout
         WHERE completed_workout_id = ?;
      `;

      values.push(completedWorkoutId);
   } else if (workoutId) {
      query = `
         DELETE FROM completed_workout
         WHERE workout_id = ?;
      `;

      values.push(workoutId);
   } else {
      return;
   }

   const [deleteCompletedWorkoutResults] = await pool.execute(query, values);

   if (!deleteCompletedWorkoutResults.affectedRows) {
      throw new Error("Unable to delete completed workout.");
   }

   return;
};

module.exports = {
   selectCompletedWorkout,
   insertCompletedWorkout,
   deleteCompletedWorkouts,
};
