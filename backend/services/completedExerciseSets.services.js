const pool = require("../db/dbConfig");

const getCompletedExerciseSets = async ({ completedExerciseId }) => {
   const [selectCompletedExerciseSetsResults] = await pool.execute(
      `
         SELECT completed_exercise_set_id as completedExerciseSetId, completed_exercise_id as completedExerciseId, exercise_set_id as exerciseSetId, completed_exercise_set_order as completedExerciseSetOrder, completed_reps as completedReps, completed_weight as completedWeight, completed_distance as completedDistance, completed_hr as completedHr, completed_min as completedMin, completed_sec as completedSec, notes, is_complete as isComplete
         FROM completed_exercise_set
         WHERE completed_exercise_id = ?
      `,
      [completedExerciseId]
   );

   return selectCompletedExerciseSetsResults;
};

module.exports = { getCompletedExerciseSets };
