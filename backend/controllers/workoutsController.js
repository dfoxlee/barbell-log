const pool = require("../db/dbConfig");

const getAllUserWorkouts = async ({ userId }) => {
   const [selectWorkoutResults] = await pool.execute(
      `
            SELECT workout_id as workoutId, workout_name as workoutName, created_date as createdDate
            FROM workout
            WHERE user_id = ?
         `,
      [userId]
   );

   return selectWorkoutResults;
};

const getUserWorkout = async ({ workoutId }) => {
   const [selectWorkoutResults] = await pool.execute(
      `
         SELECT workout_id, workout_name, created_date
         FROM workout
         WHERE workout_id = ?
         `,
      [workoutId]
   );

   if (!selectWorkoutResults.length) {
      throw new Error("No password found.");
   }

   let workout = {
      workoutId: selectWorkoutResults[0].workout_id,
      workoutName: selectWorkoutResults[0].workout_name,
      createdDate: selectWorkoutResults[0].created_date,
   };

   const [selectExercisesResults] = await pool.execute(
      `
            SELECT exercise_id, exercise_order, exercise_name
            FROM exercise
            WHERE workout_id = ?
         `,
      [workoutId]
   );

   if (!selectExercisesResults.length) {
      return selectWorkoutResults[0];
   }

   const exercisesPromises = selectExercisesResults.map(async (exercise) => {
      const [selectExerciseSetsResults] = await pool.execute(
         `
            SELECT *
            FROM exercise_set
            WHERE exercise_id = ?
            `,
         [exercise.exercise_id]
      );

      if (!selectExerciseSetsResults.length) {
         return {
            exerciseId: exercise.exercise_id,
            exerciesName: exercise.exercise_name,
            exerciseOrder: exercise.exercise_order,
            sets: [],
         };
      }

      const sets = selectExerciseSetsResults.map((set) => {
         return {
            exerciseSetId: set.exercise_set_id,
            setOrder: set.set_order,
            reps: set.reps,
            weight: set.weight,
         };
      });

      return {
         exerciseId: exercise.exercise_id,
         exerciseName: exercise.exercise_name,
         exerciseOrder: exercise.exercise_order,
         sets,
      };
   });

   const exercises = await Promise.all(exercisesPromises);

   return { ...workout, exercises };
};

const addUserWorkout = async ({ userId, workout }) => {
   const createdDate = new Date();
   const workoutName = workout.workoutName;

   const [selectWorkoutResults] = await pool.execute(
      `
            SELECT *
            FROM workout
            WHERE user_id = ?
               AND workout_name = ?
         `,
      [userId, workoutName]
   );

   if (selectWorkoutResults.length > 0) {
      throw new Error("Workout already exists.");
   }

   const [insertWorkoutResults] = await pool.execute(
      `
            INSERT INTO workout (user_id, workout_name, created_date) 
            VALUES (?, ?, ?)
         `,
      [userId, workoutName, createdDate]
   );

   if (!insertWorkoutResults.affectedRows) {
      throw new Error("Unable to insert workout into database.");
   }

   const [selectNewWorkoutResults] = await pool.execute(
      `
            SELECT *
            FROM workout
            WHERE user_id = ?
               AND workout_name = ?
         `,
      [userId, workoutName]
   );

   const newWorkoutId = selectNewWorkoutResults[0].workout_id;

   await Promise.all(
      workout.exercises.map(async (exercise) => {
         const [insertExerciseResults] = await pool.execute(
            `
               INSERT INTO exercise (workout_id, exercise_name, exercise_order)
               VALUES (?, ?, ?)
            `,
            [newWorkoutId, exercise.exerciseName, exercise.exerciseOrder]
         );

         if (!insertExerciseResults.affectedRows) {
            throw new Error("Unable to insert exercise into database.");
         }

         const [selectNewExerciseResults] = await pool.execute(
            `
               SELECT *
               FROM exercise
               WHERE exercise_name = ?
                  AND workout_id = ?            
            `,
            [exercise.exerciseName, newWorkoutId]
         );

         const newExerciseId = selectNewExerciseResults[0].exercise_id;

         await Promise.all(
            exercise.sets.map(async (set) => {
               const [insertExerciseSetResults] = await pool.execute(
                  `
                  INSERT INTO exercise_set (
                     exercise_id, 
                     set_order, 
                     reps,
                     weight 
                  )
                  VALUES (
                     ?, 
                     ?, 
                     ?, 
                     ?
                  )
               `,
                  [newExerciseId, set.setOrder, set.reps, set.weight]
               );

               if (!insertExerciseSetResults.affectedRows) {
                  throw new Error("Unable to insert set into database.");
               }
            })
         );
      })
   );
};

const updateUserWorkout = async ({ userId, workout }) => {
   const { workoutId, workoutName, exercises } = workout;

   const [updateWorkoutResults] = await pool.execute(
      `
            UPDATE workout
            SET workout_name = ?
            WHERE workout_id = ?
            and user_id = ?
         `,
      [workoutName, workoutId, userId]
   );

   if (!updateWorkoutResults.affectedRows) {
      throw new Error("Unable to update workout");
   }

   const [existingExerciseIds] = await pool.execute(
      `
            SELECT exercise_id
            FROM exercise
            WHERE workout_id = ?
         `,
      [workoutId]
   );

   if (existingExerciseIds.length === 0) {
      return;
   }

   for (let exercise of exercises) {
      if (exercise.exerciseId) {
         const [updateExerciseResults] = await pool.execute(
            `
                  UPDATE exercise
                  SET exercise_name = ?, exercise_order = ?
                  WHERE exercise_id = ?
               `,
            [exercise.exerciseName, exercise.exerciseOrder, exercise.exerciseId]
         );

         if (!updateExerciseResults.affectedRows) {
            throw new Error("Unable to update exercise.");
         }

         const [existingSets] = await pool.execute(
            `
                  SELECT exercise_set_id
                  FROM exercise_set
                  WHERE exercise_set_id = ?
               `,
            [exercise.exerciseId]
         );
         const existingSetIds = existingSets.map((set) => set.exerciseSetId);

         for (let set of exercise.sets) {
            if (set.exerciseSetId) {
               const [updateExerciseSetResults] = await pool.execute(
                  `
                        UPDATE exercise_set
                        SET set_order = ?, reps = ?, weight = ?
                        WHERE exercise_set_id = ?
                     `,
                  [set.setOrder, set.reps, set.weight, set.exerciseSetId]
               );

               if (!updateExerciseSetResults.affectedRows) {
                  throw new Error("Unable to update exercise set.");
               }
               const index = existingSetIds.indexOf(set.exerciseSetId);

               if (index > -1) {
                  existingSetIds.splice(index, 1);
               }
            } else {
               const [insertExercieSetResults] = await pool.execute(
                  `
                        INSERT INTO exercise_set (exercise_id, set_order, reps, weight)
                        VALUES (?, ?, ?, ?)
                     `,
                  [exercise.exerciseId, set.setOrder, set.reps, set.weight]
               );

               if (!insertExercieSetResults.affectedRows) {
                  throw new Error("Unable to insert exercise set.");
               }
            }
         }

         for (const setIdToDelete of existingSetIds) {
            const [deleteExerciseSetResults] = await pool.execute(
               `
                     DELETE FROM exercise_set
                     WHERE exercise_set_id = ?
                  `,
               [setIdToDelete]
            );

            if (!deleteExerciseSetResults.affectedRows) {
               throw new Error("Unable to delete exercises.");
            }
         }

         const index = existingExerciseIds.indexOf(exercise.exerciseId);
         if (index > -1) {
            existingExerciseIds.splice(index, 1);
         }
      } else {
         const [insertExerciseResults] = await pool.execute(
            `
                  INSERT INTO exercise (workout_id, exercise_name, exercise_order)
                  VALUES (?, ?, ?)
               `,
            [workoutId, exercise.exerciseName, exercise.exerciseOrder]
         );

         if (!insertExerciseResults.affectedRows) {
            throw new Error("Unable to insert new exercise.");
         }

         const [newExerciseResults] = await pool.execute(
            `
               SELECT *
               FROM exercise
               WHERE workout_id = ?
                  AND exercise_order = ?
            `,
            [workoutId, exercise.exerciseOrder]
         );

         const newExercise = newExerciseResults[0];

         for (let set of exercise.sets) {
            await pool.execute(
               `
                     INSERT INTO exercise_set (exercise_id, set_order, reps, weight)
                     VALUES (?, ?, ?, ?)
                  `,
               [newExercise.exercise_id, set.setOrder, set.reps, set.weight]
            );
         }
      }
   }

   for (const exerciseIdToDelete of existingExerciseIds) {
      await pool.execute(
         `
               DELETE FROM exercise_set
               WHERE exercise_id = ?
            `,
         [exerciseIdToDelete]
      );
      await pool.execute(
         `
               DELETE FROM exercise
               WHERE exercise_id = ?
            `,
         [exerciseIdToDelete]
      );
   }

   return;
};

const deleteUserWorkout = async ({ workoutId }) => {
   const [exerciseSearchResults] = await pool.execute(
      `
         SELECT *
         FROM exercise
         WHERE workout_id = ?
      `,
      [workoutId]
   );

   if (exerciseSearchResults.length) {
      for (const exercise of exerciseSearchResults) {
         const [deleteExerciseSetResults] = await pool.execute(
            `
            DELETE FROM exercise_set
            WHERE exercise_id = ?
            `,
            [exercise.exercise_id]
         );

         if (!deleteExerciseSetResults.affectedRows) {
            throw new Error("Unable to delete exercise set.");
         }
      }
   }

   const [deleteExerciseResults] = await pool.execute(
      `DELETE FROM exercise
       WHERE workout_id = ?
      `,
      [workoutId]
   );

   if (!deleteExerciseResults.affectedRows) {
      throw new Error("Unable to delete exercise.");
   }

   const [deleteWorkoutResult] = await pool.execute(
      `
            DELETE FROM workout
            WHERE workout_id = ?
         `,
      [workoutId]
   );

   if (!deleteWorkoutResult.affectedRows) {
      throw new Error("Unable to delete workout.");
   }
};

module.exports = {
   getAllUserWorkouts,
   getUserWorkout,
   addUserWorkout,
   updateUserWorkout,
   deleteUserWorkout,
};
