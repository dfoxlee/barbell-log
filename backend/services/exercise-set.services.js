const pool = require("../db/dbConfig");

exports.createExerciseSet = async ({
   exerciseId,
   exerciseSetOrder,
   hasReps,
   isTimed,
   isDistance,
   reps,
   weight,
   weightUnit,
   hr,
   min,
   sec,
   distance,
   distanceUnit,
}) => {
   const query = `
      insert into exercise_set (exercise_id, exercise_set_order, has_reps, isTimed, isDistance, reps, weight, weight_unit, hr, min, sec, distance, distanceUnit)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
   `;

   const values = [
      exerciseId,
      exerciseSetOrder,
      hasReps,
      isTimed,
      isDistance,
      reps,
      weight,
      weightUnit,
      hr,
      min,
      sec,
      distance,
      distanceUnit,
   ];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to create exercise set.");
   }

   return results.insertId;
};
