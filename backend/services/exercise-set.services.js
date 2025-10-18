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
      insert into exercise_set (exercise_id, exercise_set_order, has_reps, is_timed, is_distance, reps, weight, weight_unit, hr, min, sec, distance, distance_unit)
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

exports.getExerciseSets = async ({ exerciseId }) => {
   let query = ``;
   let values = [];

   if (exerciseId) {
      query = `
         select exercise_set_id as exerciseSetId,
            exercise_set_order as exerciseSetOrder,
            has_reps as hasReps,
            is_timed as isTimed,
            is_distance as isDistance,
            reps,
            weight,
            weight_unit as weightUnit,
            hr,
            min,
            sec,
            distance,
            distance_unit as distanceUnit
         from exercise_set
         where exercise_id = ?;
      `;

      values = [exerciseId];
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results;
};

exports.updateExerciseSet = async ({ exerciseSet }) => {
   const query = `
      update exercise_set
      set exercise_set_order = ?,
         has_reps = ?,
         is_timed = ?,
         is_distance = ?,
         reps = ?,
         weight = ?,
         weight_unit = ?,
         hr = ?,
         min = ?,
         sec = ?,
         distance = ?,
         distance_unit = ?
      where exercise_set_id = ?;
   `;

   const values = [
      exerciseSet.exerciseSetOrder,
      exerciseSet.hasReps,
      exerciseSet.isTimed,
      exerciseSet.isDistance,
      exerciseSet.reps,
      exerciseSet.weight,
      exerciseSet.weightUnit,
      exerciseSet.hr,
      exerciseSet.min,
      exerciseSet.sec,
      exerciseSet.distance,
      exerciseSet.distanceUnit,
      exerciseSet.exerciseSetId,
   ];

   await pool.execute(query, values);

   return;
};

exports.deleteExerciseSet = async ({ exerciseSetId }) => {
   const query = `
      delete from exercise_set
      where exercise_set_id = ?;
   `;

   const values = [exerciseSetId];

   await pool.execute(query, values);

   return;
};
