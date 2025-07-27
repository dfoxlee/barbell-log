const {
   selectCompletedExercises,
   deleteCompletedExercise,
} = require("../services/completedExercises.services");
const {
   selectCompletedExerciseSets,
   deleteCompletedExerciseSet,
} = require("../services/completedExerciseSets.services");
const {
   selectCompletedWorkout,
   deleteCompletedWorkout,
} = require("../services/completedWorkouts.services");
const {
   insertExercise,
   selectExercises,
   selectExerciseIds,
   updateExercise,
   deleteExercise,
} = require("../services/exercises.services");
const {
   insertExerciseSet,
   selectExerciseSets,
   selectExerciseSetIds,
   updateExerciseSet,
   deleteExerciseSet,
} = require("../services/exerciseSets.services");
const {
   selectWorkouts,
   insertWorkout,
   updateWorkout,
   deleteWorkout,
} = require("../services/workouts.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const getAllUserWorkouts = async ({ userId }) => {
   const selectWorkoutResults = await selectWorkouts({ userId });

   return selectWorkoutResults;
};

const getUserWorkout = async ({ workoutId }) => {
   const selectWorkoutResults = await selectWorkouts({ workoutId });

   if (!selectWorkoutResults.length) {
      throw new Error("No workout found.");
   }

   let workout = selectWorkoutResults[0];

   const selectExercisesResults = await selectExercises({ workoutId });

   if (!selectExercisesResults.length) {
      return selectWorkoutResults[0];
   }

   const exercises = await Promise.all(
      selectExercisesResults.map(async (exercise) => {
         const selectExerciseSetsResults = await selectExerciseSets({
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

   const selectWorkoutResults = await selectWorkouts({ userId, workoutName });

   if (selectWorkoutResults.length > 0) {
      throw new Error("Workout already exists.");
   }

   await insertWorkout({ userId, workoutName });

   const selectNewWorkoutResults = await selectWorkouts({ userId, workoutName });

   const newWorkoutId = selectNewWorkoutResults[0].workoutId;

   await Promise.all(
      workoutComposition.exercises.map(async (exercise) => {
         await insertExercise({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const selectNewExerciseResults = await selectExercises({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
         });

         const newExerciseId = selectNewExerciseResults[0].exerciseId;

         await Promise.all(
            exercise.exerciseSets.map(async (set) => {
               await insertExerciseSet({
                  exerciseId: newExerciseId,
                  reps: set.reps || 0,
                  weight: set.weight || 0,
                  hasReps: set.hasReps,
                  isBodyweight: set.isBodyweight,
                  isTimed: set.isTimed,
                  isDistance: set.isDistance,
                  isWarmup: set.isWarmup,
                  weightUnit: set.weightUnit || "lb",
                  distanceUnit: set.distanceUnit || "mi",
                  distance: set.distance || 0,
                  hr: set.hr || 0,
                  min: set.min || 0,
                  sec: set.sec || 0,
                  exerciseSetOrder: set.exerciseSetOrder,
               });
            })
         );
      })
   );
};

const updateUserWorkout = async ({ workoutComposition }) => {
   const { workoutId, workoutName, exercises } = workoutComposition;
   await updateWorkout({
      workoutId,
      workoutName,
   });

   const existingExerciseIds = await selectExerciseIds({ workoutId });

   const newExerciseIds = exercises.map((exercise) => exercise.exerciseId);

   for (const existingExerciseId of existingExerciseIds) {
      if (!newExerciseIds.includes(existingExerciseId)) {
         await deleteExercise({ exerciseId: existingExerciseId });
      }
   }

   for (const exercise of exercises) {
      if (exercise.exerciseId) {
         await updateExercise({
            exerciseId: exercise.exerciseId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const existingExerciseSetIds = await selectExerciseSetIds({
            exerciseId: exercise.exerciseId,
         });

         const newExerciseSetIds = exercise.exerciseSets.map(
            (set) => set.exerciseSetId
         );

         for (const existingExerciseSetId of existingExerciseSetIds) {
            if (!newExerciseSetIds.includes(existingExerciseSetId)) {
               await deleteExerciseSet({
                  exerciseSetId: existingExerciseSetId,
               });
            }
         }

         for (const set of exercise.exerciseSets) {
            if (set.exerciseSetId) {
               await updateExerciseSet({ ...set });
            } else {
               await insertExerciseSet({
                  exerciseId: exercise.exerciseId,
                  reps: set.reps || 0,
                  weight: set.weight || 0,
                  hasReps: set.hasReps,
                  isBodyweight: set.isBodyweight,
                  isTimed: set.isTimed,
                  isDistance: set.isDistance,
                  isWarmup: set.isWarmup,
                  weightUnit: set.weightUnit || "lb",
                  distanceUnit: set.distanceUnit || "mi",
                  distance: set.distance || 0,
                  hr: set.hr || 0,
                  min: set.min || 0,
                  sec: set.sec || 0,
                  exerciseSetOrder: set.exerciseSetOrder,
               });
            }
         }
      } else {
         await insertExercise({
            workoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const selectNewExerciseResults = await selectExercises({
            workoutId,
            exerciseOrder: exercise.exerciseOrder,
         });

         exercise.exerciseId = selectNewExerciseResults[0].exerciseId;

         for (const set of exercise.exerciseSets) {
            await insertExerciseSet({
               exerciseId: exercise.exerciseId,
               reps: set.reps || 0,
               weight: set.weight || 0,
               hasReps: set.hasReps,
               isBodyweight: set.isBodyweight,
               isTimed: set.isTimed,
               isDistance: set.isDistance,
               isWarmup: set.isWarmup,
               weightUnit: set.weightUnit || "lb",
               distanceUnit: set.distanceUnit || "mi",
               distance: set.distance || 0,
               hr: set.hr || 0,
               min: set.min || 0,
               sec: set.sec || 0,
               exerciseSetOrder: set.exerciseSetOrder,
            });
         }
      }
   }

   return;
};

const deleteUserWorkout = async ({ workoutId }) => {
   const completedWorkouts = await selectCompletedWorkout({ workoutId });

   if (completedWorkouts) {
      completedWorkouts.forEach(async (completedWorkout) => {
         const completedExercises = await selectCompletedExercises({
            completedWorkoutId: completedWorkout.completedWorkoutId,
         });

         if (completedExercises) {
            await Promise.all(
               completedExercises.map(async (completedExercise) => {
                  const completedExerciseSets =
                     await selectCompletedExerciseSets({
                        completedExerciseId:
                           completedExercise.completedExerciseId,
                     });

                  if (completedExerciseSets) {
                     completedExerciseSets.forEach(
                        async (completedExerciseSet) => {
                           await deleteCompletedExerciseSet({
                              completedExerciseSetId:
                                 completedExerciseSet.completedExerciseSetId,
                           });
                        }
                     );
                  }

                  await deleteCompletedExercise({
                     completedWorkoutId: completedWorkout.completedWorkoutId,
                  });
               })
            );
         }

         await deleteCompletedWorkout({
            completedWorkoutId: completedWorkout.completedWorkoutId,
         });
      });
   }

   const exercises = await selectExercises({ workoutId });

   if (exercises) {
      await Promise.all(
         exercises.map(async (exercise) => {
            const exerciseSets = await selectExerciseSets({
               exerciseId: exercise.exerciseId,
            });

            if (exerciseSets) {
               await Promise.all(
                  exerciseSets.map(async (exerciseSet) => {
                     await deleteExerciseSet({
                        exerciseSetId: exerciseSet.exerciseSetId,
                     });
                  })
               );
            }

            await deleteExercise({ exerciseId: exercise.exerciseId });
         })
      );
   }

   await deleteWorkout({ workoutId });
};

module.exports = {
   getAllUserWorkouts,
   getUserWorkout,
   addUserWorkout,
   updateUserWorkout,
   deleteUserWorkout,
};
