const WorkoutServices = require("../services/workout.services");
const ExerciseServices = require("../services/exercise.services");
const ExerciseSetServices = require("../services/exercise-set.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.getNewCompleteWorkout = async (req, res, next) => {
   try {
      const workoutId = req.params["workoutId"];

      const workoutResults = await WorkoutServices.getWorkout({ workoutId });
      const workout = workoutResults[0];
      const exerciseResults = await ExerciseServices.getExercises({
         workoutId,
      });

      const completedExercises = [];

      for (const exercise of exerciseResults) {
         const exerciseSets = await ExerciseSetServices.getExerciseSets({
            exerciseId: exercise.exerciseId,
         });

         const completedExerciseSets = exerciseSets.map((exerciseSet) => ({
            completedExerciseSetOrder: exerciseSet.exerciseSetOrder,
            hadReps: exerciseSet.hasReps,
            wasTimed: exerciseSet.isTimed,
            wasDistance: exerciseSet.isDistance,
            completedReps: exerciseSet.reps,
            completedWeight: exerciseSet.weight,
            completedWeightUnit: exerciseSet.weightUnit,
            completedHr: exerciseSet.hr,
            completedMin: exerciseSet.min,
            completedSec: exerciseSet.sec,
            completedDistance: exerciseSet.distance,
            completedDistanceUnit: exerciseSet.distanceUnit,
         }));

         const completedExercise = {
            completedExerciseOrder: exercise.exerciseOrder,
            completedExerciseName: exercise.exerciseName,
            completedExerciseSets,
         };

         completedExercises.push(completedExercise);
      }

      const completedWorkout = {
         completedWorkoutName: workout.workoutName,
         completedWorkoutType: workout.workoutType,
         completedExercises,
      };

      return res.status(200).json({ completedWorkout });
   } catch (error) {
      next(error);
   }
};
