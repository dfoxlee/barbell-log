const {
   getCompletedExercises,
   updateCompletedExercise,
   createCompletedExercise,
} = require("../services/completedExercises.services");
const {
   getCompletedExerciseSets,
   updateCompletedExerciseSet,
   createCompletedExerciseSet,
} = require("../services/completedExerciseSets.services");
const {
   getCompletedWorkout,
   createCompletedWorkout,
} = require("../services/completedWorkouts.services");
const { getExercises } = require("../services/exercises.services");
const { getExerciseSets } = require("../services/exerciseSets.services");
const { getWorkouts } = require("../services/workouts.services");

const getBarbellLog = async ({ workoutId, completedWorkoutId }) => {
   if (completedWorkoutId) {
      const completedWorkout = await getCompletedWorkout({
         completedWorkoutId,
      });

      if (!completedWorkout) {
         throw new Error("Unable to find the completed workout.");
      }

      const completedExercises = await getCompletedExercises({
         completedWorkoutId,
      });

      const completedExercisesWithSets = await Promise.all(
         completedExercises.map(async (completedExercise) => {
            const completedExerciseSets = await getCompletedExerciseSets({
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
      const workout = await getWorkouts({ workoutId });

      if (!workout) {
         throw new Error("Unable to find workout.");
      }

      const completedWorkout = {
         workoutId: workout[0].workoutId,
         workoutName: workout[0].workoutName,
      };

      const exercises = await getExercises({ workoutId });

      if (!exercises) {
         return {
            ...completedWorkout,
            completedExercises: [],
         };
      }

      const completedExercises = await Promise.all(
         exercises.map(async (exercise) => {
            const exerciseSets = await getExerciseSets({
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
         barbellLog.completedExercises.foreach(async (completedExercise) => {
            await updateCompletedExercise({
               completedExerciseId: completedExercise.completedExerciseId,
               completedExerciseOrder: completedExercise.completedExerciseOrder,
            });

            completedExercise.completedExerciseSets.forEach(
               async (completedExerciseSet) => {
                  await updateCompletedExerciseSet({
                     completedExerciseSetId:
                        completedExerciseSet.completedExerciseSetId,
                     completedExerciseSetOrder:
                        completedExerciseSet.completedExerciseSetOrder,
                     completedReps: completedExerciseSet.completedReps,
                     completedWeight: completedExerciseSet.completedWeight,
                     completedDistance: completedExerciseSet.completedDistance,
                     completedHr: completedExerciseSet.completedHr,
                     completedMin: completedExerciseSet.completedMin,
                     completedSec: completedExerciseSet.completedSec,
                     notes: completedExerciseSet.notes,
                     isComplete: completedExerciseSet.isComplete,
                  });
               }
            );
         })
      );
   } else {
      await createCompletedWorkout({
         workoutId: barbellLog.workoutId,
      });

      const newCompletedWorkout = await getCompletedWorkout({
         workoutId: barbellLog.workoutId,
      });

      barbellLog.completedExercises.forEach(async (completedExercise) => {
         await createCompletedExercise({
            completedWorkoutId: newCompletedWorkout[0].completedWorkoutId,
            exerciseId: completedExercise.exerciseId,
            completedExerciseOrder: completedExercise.completedExerciseOrder,
         });

         const newCompletedExercise = await getCompletedExercises({
            completedWorkoutId: newCompletedWorkout[0].completedWorkoutId,
            exerciseId: completedExercise.exerciseId,
         });

         completedExercise.completedExerciseSets.forEach(
            async (completedExerciseSet) => {
               await createCompletedExerciseSet({
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
            }
         );
      });
   }
};

module.exports = {
   getBarbellLog,
   barbellLogComposition,
};
