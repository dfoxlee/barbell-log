const {
   getCompletedExercises,
} = require("../services/completedExercises.services");
const {
   getCompletedExerciseSets,
} = require("../services/completedExerciseSets.services");
const {
   getCompletedWorkout,
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

      completedExercises.completedExerciseSets = await Promise.all(
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

      completedWorkout.completedExercises = completedExercises;

      return completedWorkout;
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

module.exports = {
   getBarbellLog,
};
