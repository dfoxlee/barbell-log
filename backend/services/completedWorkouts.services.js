const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const selectCompletedWorkout = async ({
   completedWorkoutId,
   completedDate,
   userId,
}) => {
   let query = ``;
   let values = [];

   if (completedWorkoutId) {
      query = `
      SELECT completed_workout_id AS completedWorkoutId,
      completed_workout_name AS completedWorkoutName,
      completed_date AS completedDate
      FROM completed_workout
      WHERE completed_workout_id = ?
      ORDER BY completed_date DESC;
      `;

      values.push(completedWorkoutId);
   } else if (userId && completedDate) {
      const formattedDate = completedDate
         .toISOString()
         .slice(0, 19)
         .replace("T", " ");

      query = `
         SELECT completed_workout_id AS completedWorkoutId,
            completed_workout_name AS completedWorkoutName,
            completed_date AS completedDate
         FROM completed_workout
         WHERE user_id = ?
            AND completed_date = ?
         ORDER BY completed_date DESC;
      `;

      values.push(userId, formattedDate);
   } else if (userId) {
      query = `
         SELECT completed_workout_id AS completedWorkoutId,
         completed_workout_name AS completedWorkoutName,
         completed_date AS completedDate
         FROM completed_workout
         WHERE user_id = ?
         ORDER BY completed_date DESC;
      `;

      values.push(userId);
   } else {
      return;
   }

   const [selectCompletedWorkoutResults] = await pool.execute(query, values);

   return selectCompletedWorkoutResults;
};

const insertCompletedWorkout = async ({
   userId,
   completedDate,
   completedWorkout,
}) => {
   const formattedDate = completedDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

   const [insertCompletedWorkoutResults] = await pool.execute(
      `
         INSERT INTO completed_workout (user_id, completed_date, completed_workout_name)
         VALUES (?, ?, ?);
      `,
      [userId, formattedDate, completedWorkout.completedWorkoutName]
   );

   if (!insertCompletedWorkoutResults.affectedRows) {
      throw new Error("Unable to create completed workout.");
   }

   return insertCompletedWorkoutResults.insertId;
};

const updateCompletedWorkout = async (completedWorkout) => {
   await query.execute(
      `
         UPDATE completed_workout
         SET completed_workout_name = ?
      `,
      [completedWorkout.completedWorkoutName]
   );

   return;
};

const deleteCompletedWorkouts = async (completedWorkoutId) => {
   await pool.execute(
      `
         DELETE FROM completed_workout
         WHERE completed_workout_id = ?
      `,
      [completedWorkoutId]
   );

   return;
};

module.exports = {
   selectCompletedWorkout,
   insertCompletedWorkout,
   updateCompletedWorkout,
   deleteCompletedWorkouts,
};
