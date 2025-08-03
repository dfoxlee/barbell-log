const {
   selectCompletedExercises,
   updateCompletedExercise,
   insertCompletedExercise,
} = require("../services/completedExercises.services");
const {
   selectCompletedExerciseSets,
   updateCompletedExerciseSet,
   insertCompletedExerciseSet,
   selectCompletedExerciseSetIds,
} = require("../services/completedExerciseSets.services");
const {
   selectCompletedWorkout,
   insertCompletedWorkout,
} = require("../services/completedWorkouts.services");
const {
   selectExercises,
   selectExerciseIds,
} = require("../services/exercises.services");
const {
   selectExerciseSets,
   updateExerciseSet,
} = require("../services/exerciseSets.services");
const { selectWorkouts } = require("../services/workouts.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const getBarbellLog = async ({ workoutId, completedWorkoutId }) => {
   if (completedWorkoutId) {
      const completedWorkout = await selectCompletedWorkout({
         completedWorkoutId,
      });

      if (!completedWorkout) {
         throw new Error("Unable to find the completed workout.");
      }

      const completedExercises = await selectCompletedExercises({
         completedWorkoutId,
      });

      const completedExercisesWithSets = await Promise.all(
         completedExercises.map(async (completedExercise) => {
            const completedExerciseSets = await selectCompletedExerciseSets({
               completedExerciseId: completedExercise.completedExerciseId,
            });

            return {
               ...completedExercise,
               completedExerciseSets,
            };
         })
      );

      return {
         ...completedWorkout[0],
         completedExercises: completedExercisesWithSets,
      };
   } else {
      const workout = await selectWorkouts({ workoutId });

      if (!workout) {
         throw new Error("Unable to find workout.");
      }

      const completedWorkout = {
         workoutId: workout[0].workoutId,
         workoutName: workout[0].workoutName,
      };

      const exercises = await selectExercises({ workoutId });

      if (!exercises) {
         return {
            ...completedWorkout,
            completedExercises: [],
         };
      }

      const completedExercises = await Promise.all(
         exercises.map(async (exercise) => {
            const exerciseSets = await selectExerciseSets({
               exerciseId: exercise.exerciseId,
            });

            const completedExerciseSets = exerciseSets.map((exerciseSet) => ({
               exerciseSetId: exerciseSet.exerciseSetId,
               completedExerciseSetOrder: exerciseSet.exerciseSetOrder,
               hasReps: exerciseSet.hasReps,
               isBodyweight: exerciseSet.isBodyweight,
               isTimed: exerciseSet.isTimed,
               isDistance: exerciseSet.isDistance,
               isWarmup: exerciseSet.isWarmup,
               completedReps: exerciseSet.reps,
               completedWeight: exerciseSet.weight,
               completedWeightUnit: exerciseSet.weightUnit,
               completedHr: exerciseSet.hr,
               completedMin: exerciseSet.min,
               completedSec: exerciseSet.sec,
               completedDistance: exerciseSet.distance,
               completedDistanceUnit: exerciseSet.distanceUnit,
               notes: "",
               isComplete: false,
            }));

            return {
               exerciseId: exercise.exerciseId,
               exerciseName: exercise.exerciseName,
               completedExerciseOrder: exercise.exerciseOrder,
               completedExerciseSets,
            };
         })
      );

      completedWorkout.completedExercises = completedExercises;

      return completedWorkout;
   }
};

const barbellLogComposition = async ({ barbellLog }) => {
   const completedWorkoutId = barbellLog.completedWorkoutId;

   if (completedWorkoutId) {
      await Promise.all(
         barbellLog.completedExercises.map(async (completedExercise) => {
            await updateCompletedExercise({
               completedExerciseId: completedExercise.completedExerciseId,
               completedExerciseOrder: completedExercise.completedExerciseOrder,
            });

            const currentExerciseSetIds = await selectCompletedExerciseSetIds({
               completedExerciseId: completedExercise.completedExerciseId,
            });

            const currentExerciseSets = await selectExerciseSets({
               exerciseId: completedExercise.exerciseId,
            });

            await Promise.all(
               completedExercise.completedExerciseSets.map(
                  async (completedExerciseSet) => {
                     if (
                        completedExerciseSet.completedExerciseSetId &&
                        currentExerciseSetIds.includes(
                           completedExerciseSet.completedExerciseSetId
                        )
                     ) {
                        await updateCompletedExerciseSet({
                           completedExerciseSetId:
                              completedExerciseSet.completedExerciseSetId,
                           completedExerciseSetOrder:
                              completedExerciseSet.completedExerciseSetOrder,
                           completedReps: completedExerciseSet.completedReps,
                           completedWeight:
                              completedExerciseSet.completedWeight,
                           completedWeightUnit:
                              completedExerciseSet.completedWeightUnit,
                           completedDistance:
                              completedExerciseSet.completedDistance,
                           completedDistanceUnit:
                              completedExerciseSet.completedDistanceUnit,
                           completedHr: completedExerciseSet.completedHr,
                           completedMin: completedExerciseSet.completedMin,
                           completedSec: completedExerciseSet.completedSec,
                           notes: completedExerciseSet.notes,
                           isComplete: completedExerciseSet.isComplete,
                        });

                        const currentExerciseSet = currentExerciseSets.find(
                           (exerciseSet) =>
                              exerciseSet.exerciseSetId ===
                              completedExerciseSet.exerciseSetId
                        );
                        debugConsoleLog(currentExerciseSet);

                        await updateExerciseSet({
                           ...currentExerciseSet,
                           reps: completedExerciseSet.completedReps,
                           weight: completedExerciseSet.completedWeight,
                           distance: completedExerciseSet.completedDistance,
                           hr: completedExerciseSet.completedHr,
                           min: completedExerciseSet.completedMin,
                           sec: completedExerciseSet.completedSec,
                        });
                     } else {
                        await insertCompletedExerciseSet({
                           completedExerciseId:
                              completedExerciseSet.completedExerciseId,
                           exerciseSetId: completedExerciseSet.exerciseSetId,
                           completedExerciseSetOrder:
                              completedExerciseSet.completedExerciseSetOrder,
                           completedReps: completedExerciseSet.completedReps,
                           completedWeight:
                              completedExerciseSet.completedWeight,
                           completedWeightUnit:
                              completedExerciseSet.completedWeightUnit,
                           completedDistance:
                              completedExerciseSet.completedDistance,
                           completedDistanceUnit:
                              completedExerciseSet.completedDistanceUnit,
                           completedHr: completedExerciseSet.completedHr,
                           completedMin: completedExerciseSet.completedMin,
                           completedSec: completedExerciseSet.completedSec,
                           notes: completedExerciseSet.notes,
                           isComplete: completedExerciseSet.isComplete,
                        });

                        const currentExerciseSet = currentExerciseSets.find(
                           (exerciseSet) =>
                              exerciseSet.exerciseSetId ===
                              completedExerciseSet.exerciseSetId
                        );
                        debugConsoleLog(currentExerciseSet);

                        await updateExerciseSet({
                           ...currentExerciseSet,
                           reps: completedExerciseSet.completedReps,
                           weight: completedExerciseSet.completedWeight,
                           distance: completedExerciseSet.completedDistance,
                           hr: completedExerciseSet.completedHr,
                           min: completedExerciseSet.completedMin,
                           sec: completedExerciseSet.completedSec,
                        });
                     }
                  }
               )
            );
         })
      );
   } else {
      const completedDate = new Date()
         .toISOString()
         .slice(0, 19)
         .replace("T", " ");

      await insertCompletedWorkout({
         workoutId: barbellLog.workoutId,
         completedDate,
      });

      const newCompletedWorkout = await selectCompletedWorkout({
         workoutId: barbellLog.workoutId,
         completedDate,
      });

      barbellLog.completedExercises.forEach(async (completedExercise) => {
         await insertCompletedExercise({
            completedWorkoutId: newCompletedWorkout[0].completedWorkoutId,
            exerciseId: completedExercise.exerciseId,
            completedExerciseOrder: completedExercise.completedExerciseOrder,
         });

         const newCompletedExercise = await selectCompletedExercises({
            completedWorkoutId: newCompletedWorkout[0].completedWorkoutId,
            completedExerciseOrder: completedExercise.completedExerciseOrder,
         });

         completedExercise.completedExerciseSets.forEach(
            async (completedExerciseSet) => {
               await insertCompletedExerciseSet({
                  completedExerciseId:
                     newCompletedExercise[0].completedExerciseId,
                  exerciseSetId: completedExerciseSet.exerciseSetId,
                  completedExerciseSetOrder:
                     completedExerciseSet.completedExerciseSetOrder,
                  completedReps: completedExerciseSet.completedReps,
                  completedWeight: completedExerciseSet.completedWeight,
                  completedWeightUnit: completedExerciseSet.completedWeightUnit,
                  completedDistance: completedExerciseSet.completedDistance,
                  completedDistanceUnit:
                     completedExerciseSet.completedDistanceUnit,
                  completedHr: completedExerciseSet.completedHr,
                  completedMin: completedExerciseSet.completedMin,
                  completedSec: completedExerciseSet.completedSec,
                  notes: completedExerciseSet.notes,
                  isComplete: completedExerciseSet.isComplete,
               });

               const currentExerciseSets = await selectExerciseSets({
                  exerciseSetId: completedExerciseSet.exerciseSetId,
               });

               const currentExerciseSet = currentExerciseSets[0];

               await updateExerciseSet({
                  ...currentExerciseSet,
                  reps: completedExerciseSet.completedReps,
                  weight: completedExerciseSet.completedWeight,
                  distance: completedExerciseSet.completedDistance,
                  hr: completedExerciseSet.completedHr,
                  min: completedExerciseSet.completedMin,
                  sec: completedExerciseSet.completedSec,
               });
            }
         );
      });
   }
};

module.exports = {
   getBarbellLog,
   barbellLogComposition,
};
