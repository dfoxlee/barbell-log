const pool = require("../db/dbConfig");
const {
   createExercise,
   getExercises,
} = require("../services/exercises.services");
const {
   createExerciseSet,
   getExerciseSets,
} = require("../services/exerciseSets.services");
const { getWorkouts, createWorkout } = require("../services/workouts.services");

const getAllUserWorkouts = async ({ userId }) => {
   const selectWorkoutResults = await getWorkouts({ userId });

   return selectWorkoutResults;
};

const getUserWorkout = async ({ workoutId }) => {
   const selectWorkoutResults = await getWorkouts({ workoutId });

   if (!selectWorkoutResults.length) {
      throw new Error("No workout found.");
   }

   let workout = selectWorkoutResults[0];

   const selectExercisesResults = await getExercises({ workoutId });

   if (!selectExercisesResults.length) {
      return selectWorkoutResults[0];
   }

   const exercises = await Promise.all(
      selectExercisesResults.map(async (exercise) => {
         const selectExerciseSetsResults = await getExerciseSets({
            exerciseId: exercise.exerciseId,
         });

         if (!selectExerciseSetsResults.length) {
            return {
               ...exercise,
               exerciseSets: [],
            };
         }

         const exerciseSets = selectExerciseSetsResults;

         return {
            ...exercise,
            exerciseSets,
         };
      })
   );

   return { ...workout, exercises };
};

const addUserWorkout = async ({ userId, workoutComposition }) => {
   const workoutName = workoutComposition.workoutName;

   const selectWorkoutResults = await getWorkouts({ userId, workoutName });

   if (selectWorkoutResults.length > 0) {
      throw new Error("Workout already exists.");
   }

   await createWorkout({ userId, workoutName });

   const selectNewWorkoutResults = await getWorkouts({ userId, workoutName });

   const newWorkoutId = selectNewWorkoutResults[0].workout_id;

   await Promise.all(
      workoutComposition.exercises.map(async (exercise) => {
         await createExercise({
            newWorkoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const selectNewExerciseResults = await getExercises({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
         });

         const newExerciseId = selectNewExerciseResults[0].exercise_id;

         await Promise.all(
            exercise.exerciseSets.map(async (set) => {
               await createExerciseSet({
                  exerciseId: newExerciseId,
                  reps: set.reps,
                  weight: set.weight,
                  hasReps: set.hasReps,
                  isBodyweight: set.isBodyweight,
                  isTimed: set.isTimed,
                  isDistance: set.isDistance,
                  isWarmup: set.isWarmup,
                  weightUnit: set.weightUnit,
                  distanceUnit: set.distanceUnit,
                  distance: set.distance,
                  hr: set.hr,
                  min: set.min,
                  sec: set.sec,
                  exerciseSetOrder: set.exerciseSetOrder,
               });
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
