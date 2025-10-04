const WorkoutServices = require("../services/workout.services");
const ExerciseServices = require("../services/exercise.services");
const ExerciseSetServices = require("../services/exercise-set.services");
const { formatDateForDatabase } = require("../utils/formatting.utils");

exports.getWorkouts = async (req, res, next) => {
   try {
      const { userId } = req;

      const workouts = await WorkoutServices.getUserWorkouts({ userId });

      return res.status(200).json({ workouts });
   } catch (error) {
      next(error);
   }
};

exports.createWorkout = async (req, res, next) => {
   try {
      const { userId } = req;
      const { workout } = req.body;
      const createdAt = formatDateForDatabase(new Date());

      const newWorkoutId = await WorkoutServices.createWorkout({
         userId,
         createdAt,
         ...workout,
      });
      
      for (var exercise of workout.exercises) {
         const newExerciseId = await ExerciseServices.createExercise({
            workoutId: newWorkoutId,
            ...exercise,
         });

         for (var exerciseSet of exercise.exerciseSets) {
            await ExerciseSetServices.createExerciseSet({
               exerciseId: newExerciseId,
               ...exerciseSet,
            });
         }
      }

      return res.status(200).json("Workout created successfully.");
   } catch (error) {
      next(error);
   }
};
