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

exports.getWorkoutById = async (req, res, next) => {
   try {
      const workoutId = req.params["workoutId"];

      const workoutResults = await WorkoutServices.getWorkout({ workoutId });

      const workout = workoutResults[0];

      if (!workout) {
         throw new Error("Unable to find workout.");
      }

      const exerciseResults = await ExerciseServices.getExercises({
         workoutId,
      });

      const exercises = await Promise.all(
         exerciseResults.map(async (e) => {
            const exerciseSetResults =
               await ExerciseSetServices.getExerciseSets({
                  exerciseId: e.exerciseId,
               });

            return {
               ...e,
               exerciseSets: exerciseSetResults,
            };
         })
      );

      workout.exercises = exercises;

      return res.status(201).json({ workout });
   } catch (error) {
      next(error);
   }
};

exports.updateWorkout = async (req, res, next) => {
   try {
      const { workout } = req.body;

      await WorkoutServices.updateWorkout({ workout });

      const existingExercises = await ExerciseServices.getExercises({
         workoutId: workout.workoutId,
      });

      const existingExerciseIds = existingExercises.map((e) => e.exerciseId);

      for (var exercise of workout.exercises) {
         if (existingExerciseIds.find((id) => exercise.exerciseId === id)) {
            await ExerciseServices.updateExercise({ exercise });

            const idIndex = existingExerciseIds.findIndex(
               (id) => exercise.exerciseId === id
            );

            if (idIndex !== -1) {
               existingExerciseIds.splice(idIndex, 1);
            }

            const existingExerciseSets =
               await ExerciseSetServices.getExerciseSets({
                  exerciseId: exercise.exerciseId,
               });

            const existingExerciseSetIds = existingExerciseSets.map(
               (es) => es.exerciseSetId
            );

            for (var exerciseSet of exercise.exerciseSets) {
               if (
                  existingExerciseSetIds.find(
                     (id) => exerciseSet.exerciseSetId === id
                  )
               ) {
                  await ExerciseSetServices.updateExerciseSet({ exerciseSet });

                  const idIndex = existingExerciseSetIds.findIndex(
                     (id) => exerciseSet.exerciseSetId === id
                  );

                  if (idIndex !== -1) {
                     existingExerciseSetIds.splice(idIndex, 1);
                  }
               } else {
                  await ExerciseSetServices.createExerciseSet({
                     exerciseId: exercise.exerciseId,
                     exerciseSetOrder: exerciseSet.exerciseSetOrder,
                     hasReps: exerciseSet.hasReps,
                     isDistance: exerciseSet.isDistance,
                     isTimed: exerciseSet.isTimed,
                     reps: exerciseSet.reps,
                     weight: exerciseSet.weight,
                     weightUnit: exerciseSet.weightUnit,
                     hr: exerciseSet.hr,
                     min: exerciseSet.min,
                     sec: exerciseSet.sec,
                     distance: exerciseSet.distance,
                     distanceUnit: exerciseSet.distanceUnit,
                     notes: ''
                  });
               }
            }

            for (const existingExerciseSetId of existingExerciseSetIds) {
               await ExerciseSetServices.deleteExerciseSet({
                  exerciseSetId: existingExerciseSetId,
               });
            }
         } else {
            const newExerciseId = await ExerciseServices.createExercise({
               workoutId: workout.workoutId,
               exerciseName: exercise.exerciseName,
               exerciseOrder: exercise.exerciseOrder,
            });

            for (var exerciseSet of exercise.exerciseSets) {
               await ExerciseSetServices.createExerciseSet({
                  exerciseId: newExerciseId,
                  exerciseSetOrder: exerciseSet.exerciseSetOrder,
                  hasReps: exerciseSet.hasReps,
                  isDistance: exerciseSet.isDistance,
                  isTimed: exerciseSet.isTimed,
                  reps: exerciseSet.reps,
                  weight: exerciseSet.weight,
                  weightUnit: exerciseSet.weightUnit,
                  hr: exerciseSet.hr,
                  min: exerciseSet.min,
                  sec: exerciseSet.sec,
                  distance: exerciseSet.distance,
                  distanceUnit: exerciseSet.distanceUnit,
               });
            }
         }
      }

      for (const existingExerciseId of existingExerciseIds) {
         await ExerciseServices.deleteExercise({
            exerciseId: existingExerciseId,
         });
      }

      return res.status(201).json("Workout updated.");
   } catch (error) {
      next(error);
   }
};

exports.deleteWorkout = async (req, res, next) => {
   try {
      const workoutId = req.params["workoutId"];

      await WorkoutServices.deleteWorkout({ workoutId });

      return res.status(201).json("Workout deleted successfully.");
   } catch (error) {
      next(error);
   }
};
