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
   deleteCompletedWorkouts,
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

   const selectNewWorkoutResults = await selectWorkouts({
      userId,
      workoutName,
   });

   const newWorkoutId = selectNewWorkoutResults[0].workoutId;

   for (var exercise of workoutComposition.exercises) {
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

      for (var exerciseSet of exercise.exerciseSets) {
         await insertExerciseSet({
            exerciseId: newExerciseId,
            reps: exerciseSet.reps || 0,
            weight: exerciseSet.weight || 0,
            hasReps: exerciseSet.hasReps,
            isBodyweight: exerciseSet.isBodyweight,
            isTimed: exerciseSet.isTimed,
            isDistance: exerciseSet.isDistance,
            isWarmup: exerciseSet.isWarmup,
            weightUnit: exerciseSet.weightUnit || "lb",
            distanceUnit: exerciseSet.distanceUnit || "mi",
            distance: exerciseSet.distance || 0,
            hr: exerciseSet.hr || 0,
            min: exerciseSet.min || 0,
            sec: exerciseSet.sec || 0,
            exerciseSetOrder: exerciseSet.exerciseSetOrder,
         });
      }
   }
};

const updateUserWorkout = async ({ workoutComposition }) => {
   const { workoutId, workoutName, exercises } = workoutComposition;

   await updateWorkout({ workoutId, workoutName });

   let savedExerciseIds = await selectExerciseIds({ workoutId });

   for (var exercise of exercises) {
      var exerciseId = exercise.exerciseId;

      if (!exerciseId) {
         // create exercise
         await insertExercise({
            workoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const newExercises = await selectExercises({
            workoutId,
            exerciseOrder: exercise.exerciseOrder,
         });

         exerciseId = newExercises[0].exerciseId;

         for (var exerciseSet of exercise.exerciseSets) {
            // create exercise set
            await insertExerciseSet({
               exerciseId,
               hasReps: exerciseSet.hasReps,
               isBodyweight: exerciseSet.isBodyweight,
               isDistance: exerciseSet.isDistance,
               isTimed: exerciseSet.isTimed,
               isWarmup: exerciseSet.isWarmup,
               reps: exerciseSet.reps,
               weight: exerciseSet.weight,
               weightUnit: exerciseSet.weightUnit,
               distance: exerciseSet.distance,
               distanceUnit: exerciseSet.distanceUnit,
               hr: exerciseSet.hr,
               min: exerciseSet.min,
               sec: exerciseSet.sec,
               exerciseSetOrder: exerciseSet.exerciseSetOrder,
            });
         }
      } else {
         // update exercise
         await updateExercise({
            exerciseId: exercise.exerciseId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         // get index of and remove from current saved exercise ids
         const savedExerciseIdIndex = savedExerciseIds.indexOf(`${exerciseId}`);

         if (savedExerciseIdIndex < 0) {
            throw new Error("Unable to find exercise in database.");
         }

         savedExerciseIds.splice(savedExerciseIdIndex, 1);

         const savedExerciseSetIds = await selectExerciseSetIds({ exerciseId });

         for (var exerciseSet of exercise.exerciseSets) {
            if (!exerciseSet.exerciseSetId) {
               // create exercise set
               await insertExerciseSet({
                  exerciseId,
                  hasReps: exerciseSet.hasReps,
                  isBodyweight: exerciseSet.isBodyweight,
                  isDistance: exerciseSet.isDistance,
                  isTimed: exerciseSet.isTimed,
                  isWarmup: exerciseSet.isWarmup,
                  reps: exerciseSet.reps,
                  weight: exerciseSet.weight,
                  weightUnit: exerciseSet.weightUnit,
                  distance: exerciseSet.distance,
                  distanceUnit: exerciseSet.distanceUnit,
                  hr: exerciseSet.hr,
                  min: exerciseSet.min,
                  sec: exerciseSet.sec,
                  exerciseSetOrder: exerciseSet.exerciseSetOrder,
               });
            } else {
               // update exercise set
               await updateExerciseSet({
                  exerciseSetId: exerciseSet.exerciseSetId,
                  exerciseId,
                  hasReps: exerciseSet.hasReps,
                  isBodyweight: exerciseSet.isBodyweight,
                  isDistance: exerciseSet.isDistance,
                  isTimed: exerciseSet.isTimed,
                  isWarmup: exerciseSet.isWarmup,
                  reps: exerciseSet.reps,
                  weight: exerciseSet.weight,
                  weightUnit: exerciseSet.weightUnit,
                  distance: exerciseSet.distance,
                  distanceUnit: exerciseSet.distanceUnit,
                  hr: exerciseSet.hr,
                  min: exerciseSet.min,
                  sec: exerciseSet.sec,
                  exerciseSetOrder: exerciseSet.exerciseSetOrder,
               });

               // find index of and remove from saved exercise set ids
               const exerciseSetIndex = savedExerciseSetIds.indexOf(
                  `${exerciseSet.exerciseSetId}`
               );

               if (exerciseSetIndex < 0) {
                  throw new Error(
                     "Exercise set not found in current database."
                  );
               }

               savedExerciseSetIds.splice(exerciseSetIndex, 1);
            }
         }

         if (savedExerciseSetIds.length) {
            for (var savedExerciseSetId of savedExerciseSetIds) {
               await deleteCompletedExerciseSet({
                  exerciseSetId: savedExerciseSetId,
               });

               await deleteExerciseSet({ exerciseSetId: savedExerciseSetId });
            }
         }
      }

      if (savedExerciseIds.length) {
         for (var deleteExerciseId of savedExerciseIds) {
            const completedExercises = await selectCompletedExercises({
               exerciseId: deleteExerciseId,
            });

            for (var completedExercise of completedExercises) {
               await deleteCompletedExerciseSet({
                  completedExerciseId: completedExercise.completedExerciseId,
               });
            }

            await deleteCompletedExercise({ exerciseId: deleteExerciseId });

            await deleteExerciseSet({
               exerciseId: deleteExerciseId,
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

         await deleteCompletedWorkouts({
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
