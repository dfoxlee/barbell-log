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
   deleteCompletedExerciseSet,
} = require("../services/completedExerciseSets.services");
const {
   selectCompletedWorkout,
   insertCompletedWorkout,
} = require("../services/completedWorkouts.services");
const { selectExercises } = require("../services/exercises.services");
const { selectExerciseSets } = require("../services/exerciseSets.services");
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

const createBarbellLog = async ({ barbellLog }) => {
   const { workoutId, completedExercises } = barbellLog;

   const completedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
   await insertCompletedWorkout({ workoutId, completedDate });

   const newCompletedWorkouts = await selectCompletedWorkout({
      workoutId,
      completedDate,
   });

   const newCompletedWorkoutId = newCompletedWorkouts[0].completedWorkoutId;

   for (var completedExercise of completedExercises) {
      await insertCompletedExercise({
         completedWorkoutId: newCompletedWorkoutId,
         completedExerciseOrder: completedExercise.completedExerciseOrder,
         exerciseId: completedExercise.exerciseId,
      });

      const newCompletedExercises = await selectCompletedExercises({
         completedWorkoutId: newCompletedWorkoutId,
         completedExerciseOrder: completedExercise.completedExerciseOrder,
      });

      const newCompletedExerciseId =
         newCompletedExercises[0].completedExerciseId;

      for (var completedExerciseSet of completedExercise.completedExerciseSets) {
         await insertCompletedExerciseSet({
            completedExerciseId: newCompletedExerciseId,
            ...completedExerciseSet,
         });
      }
   }

   return;
};

const updateBarbellLog = async ({ updatedBarbellLog }) => {
   const { completedExercises } = updatedBarbellLog;

   for (var completedExercise of completedExercises) {
      await updateCompletedExercise({
         completedExerciseId: completedExercise.completedExerciseId,
         completedExerciseOrder: completedExercise.completedExerciseOrder,
      });

      const currentExerciseSetIds = await selectCompletedExerciseSetIds({
         completedExerciseId: completedExercise.completedExerciseId,
      });

      for (var completedExerciseSet of completedExercise.completedExerciseSets) {
         const completedExerciseSetId =
            completedExerciseSet.completedExerciseSetId;

         if (!completedExerciseSetId) {
            // create completedExerciseSet
            await insertCompletedExerciseSet({
               ...completedExerciseSet,
            });
         } else {
            // update completed exercise
            await updateCompletedExerciseSet({
               ...completedExerciseSet,
            });

            const existingIndex = currentExerciseSetIds.indexOf(
               completedExerciseSetId
            );

            currentExerciseSetIds.splice(existingIndex, 1);
         }
      }

      if (currentExerciseSetIds.length) {
         for (var completedExerciseSetId of currentExerciseSetIds) {
            await deleteCompletedExerciseSet({ completedExerciseSetId });
         }
      }
   }
};

module.exports = {
   getBarbellLog,
   createBarbellLog,
   updateBarbellLog,
};
