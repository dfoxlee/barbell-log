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

   await updateWorkout({ workoutId, workoutName });

   let savedExerciseIds = await selectExerciseIds({ workoutId });

   await Promise.all(
      exercises.map(async (updatedExercise) => {
         // update existing exercise
         if (savedExerciseIds.includes(updatedExercise.exerciseId)) {
            await updateExercise({
               exerciseId: updatedExercise.exerciseId,
               exerciseName: updatedExercise.exerciseName,
               exerciseOrder: updatedExercise.exerciseOrder,
            });

            let savedExerciseSetIds = await selectExerciseSetIds({
               exerciseId: updatedExercise.exerciseId,
            });

            await Promise.all(
               updatedExercise.exerciseSets.map(async (updatedExerciseSet) => {
                  if (
                     savedExerciseSetIds.includes(
                        updatedExerciseSet.exerciseSetId
                     )
                  ) {
                     await updateExerciseSet({
                        exerciseSetId: updatedExerciseSet.exerciseSetId,
                        reps: updatedExerciseSet.reps,
                        weight: updatedExerciseSet.weight,
                        hasReps: updatedExerciseSet.hasReps,
                        isBodyweight: updatedExerciseSet.isBodyweight,
                        isTimed: updatedExerciseSet.isTimed,
                        isDistance: updatedExerciseSet.isDistance,
                        isWarmup: updatedExerciseSet.isWarmup,
                        weightUnit: updatedExerciseSet.weightUnit,
                        distanceUnit: updatedExerciseSet.distanceUnit,
                        distance: updatedExerciseSet.distance,
                        hr: updatedExerciseSet.hr,
                        min: updatedExerciseSet.min,
                        sec: updatedExerciseSet.sec,
                        exerciseSetOrder: updatedExerciseSet.exerciseSetOrder,
                     });

                     savedExerciseSetIds = savedExerciseSetIds.filter(
                        (id) => id !== updatedExerciseSet.exerciseSetId
                     );
                  } else {
                     await insertExerciseSet({
                        exerciseId: updatedExercise.exerciseId,
                        reps: updatedExerciseSet.reps,
                        weight: updatedExerciseSet.weight,
                        hasReps: updatedExerciseSet.hasReps,
                        isBodyweight: updatedExerciseSet.isBodyweight,
                        isTimed: updatedExerciseSet.isTimed,
                        isDistance: updatedExerciseSet.isDistance,
                        isWarmup: updatedExerciseSet.isWarmup,
                        weightUnit: updatedExerciseSet.weightUnit,
                        distanceUnit: updatedExerciseSet.distanceUnit,
                        distance: updatedExerciseSet.distance,
                        hr: updatedExerciseSet.hr,
                        min: updatedExerciseSet.min,
                        sec: updatedExerciseSet.sec,
                        exerciseSetOrder: updatedExerciseSet.exerciseSetOrder,
                     });
                  }
               })
            );

            await Promise.all(
               savedExerciseSetIds.map(async (deleteExerciseSetId) => {
                  const completedExerciseSets =
                     await selectCompletedExerciseSets({
                        exerciseSetId: deleteExerciseSetId,
                     });

                  if (completedExerciseSets.length) {
                     await Promise.all(
                        completedExerciseSets.map(
                           async (es) =>
                              await deleteCompletedExerciseSet({
                                 completedExerciseSetId:
                                    es.completedExerciseSetId,
                              })
                        )
                     );
                  }

                  await deleteExerciseSet({
                     exerciseSetId: deleteExerciseSetId,
                  });
               })
            );

            savedExerciseIds = savedExerciseIds.filter(
               (id) => id !== updatedExercise.exerciseId
            );
            // create new exercise
         } else {
            await insertExercise({
               workoutId,
               exerciseName: updatedExercise.exerciseName,
               exerciseOrder: updatedExercise.exerciseOrder,
            });

            const newExercise = await selectExercises({
               workoutId,
               exerciseOrder: updatedExercise.exerciseOrder,
            });

            await Promise.all(
               updatedExercise.exerciseSets.map(async (updatedExerciseSet) => {
                  await insertExerciseSet({
                     exerciseId: newExercise[0].exerciseId,
                     reps: updatedExerciseSet.reps,
                     weight: updatedExerciseSet.weight,
                     hasReps: updatedExerciseSet.hasReps,
                     isBodyweight: updatedExerciseSet.isBodyweight,
                     isTimed: updatedExerciseSet.isTimed,
                     isDistance: updatedExerciseSet.isDistance,
                     isWarmup: updatedExerciseSet.isWarmup,
                     weightUnit: updatedExerciseSet.weightUnit,
                     distanceUnit: updatedExerciseSet.distanceUnit,
                     distance: updatedExerciseSet.distance,
                     hr: updatedExerciseSet.hr,
                     min: updatedExerciseSet.min,
                     sec: updatedExerciseSet.sec,
                     exerciseSetOrder: updatedExerciseSet.exerciseSetOrder,
                  });
               })
            );
         }
      })
   );

   // delete all associated sets
   await Promise.all(
      savedExerciseIds.map(async (deleteExerciseId) => {
         const exerciseSets = await selectExerciseSets({
            exerciseId: deleteExerciseId,
         });

         if (exerciseSets.length) {
            await Promise.all(
               exerciseSets.map(async (ses) => {
                  const completedExerciseSets =
                     await selectCompletedExerciseSets({
                        exerciseId: ses.exerciseId,
                     });

                  if (completedExerciseSets.length) {
                     await Promise.all(
                        completedExerciseSets.map(
                           async (ces) =>
                              await deleteCompletedExerciseSet({
                                 completedExerciseSetId:
                                    ces.completedExerciseSetId,
                              })
                        )
                     );
                  }

                  await deleteExerciseSet({ exerciseSetId: ses.exerciseSetId });
               })
            );
         }

         const completedExercises = await selectCompletedExercises({
            exerciseId: deleteExerciseId,
         });

         if (completedExercises.length) {
            await Promise.all(
               completedExercises.map(async (ce) => {
                  const completedExerciseSets =
                     await selectCompletedExerciseSets({
                        completedExerciseId: ce.completedExerciseId,
                     });

                  if (completedExerciseSets.length) {
                     await Promise.all(
                        completedExerciseSets.map(
                           async (ces) =>
                              await deleteCompletedExerciseSet({
                                 completedExerciseSetId:
                                    ces.completedExerciseSetId,
                              })
                        )
                     );
                  }

                  await deleteCompletedExercise({
                     completedExerciseId: ce.completedExerciseId,
                  });
               })
            );
         }

         await deleteExercise({ exerciseId: deleteExerciseId });
      })
   );

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
