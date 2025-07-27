const {
   getCompletedExercises,
   deleteCompletedExercise,
} = require("../services/completedExercises.services");
const {
   getCompletedExerciseSets,
   deleteCompletedExerciseSet,
} = require("../services/completedExerciseSets.services");
const {
   getCompletedWorkout,
   deleteCompletedWorkout,
} = require("../services/completedWorkouts.services");
const {
   createExercise,
   getExercises,
   getExerciseIds,
   updateExercise,
   deleteExercise,
} = require("../services/exercises.services");
const {
   createExerciseSet,
   getExerciseSets,
   getExerciseSetIds,
   updateExerciseSet,
   deleteExerciseSet,
} = require("../services/exerciseSets.services");
const {
   getWorkouts,
   createWorkout,
   updateWorkout,
   deleteWorkout,
} = require("../services/workouts.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");

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

   const newWorkoutId = selectNewWorkoutResults[0].workoutId;

   await Promise.all(
      workoutComposition.exercises.map(async (exercise) => {
         await createExercise({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const selectNewExerciseResults = await getExercises({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
         });

         const newExerciseId = selectNewExerciseResults[0].exerciseId;

         await Promise.all(
            exercise.exerciseSets.map(async (set) => {
               await createExerciseSet({
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

   const existingExerciseIds = await getExerciseIds({ workoutId });

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

         const existingExerciseSetIds = await getExerciseSetIds({
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
               await createExerciseSet({
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
         await createExercise({
            workoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const selectNewExerciseResults = await getExercises({
            workoutId,
            exerciseOrder: exercise.exerciseOrder,
         });

         exercise.exerciseId = selectNewExerciseResults[0].exerciseId;

         for (const set of exercise.exerciseSets) {
            await createExerciseSet({
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
   const completedWorkouts = await getCompletedWorkout({ workoutId });

   if (completedWorkouts) {
      completedWorkouts.forEach(async (completedWorkout) => {
         const completedExercises = await getCompletedExercises({
            completedWorkoutId: completedWorkout.completedWorkoutId,
         });

         if (completedExercises) {
            await Promise.all(
               completedExercises.map(async (completedExercise) => {
                  const completedExerciseSets = await getCompletedExerciseSets({
                     completedExerciseId: completedExercise.completedExerciseId,
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

   const exercises = await getExercises({ workoutId });

   if (exercises) {
      await Promise.all(
         exercises.map(async (exercise) => {
            const exerciseSets = await getExerciseSets({
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
