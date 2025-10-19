const WorkoutServices = require("../services/workout.services");
const ExerciseServices = require("../services/exercise.services");
const ExerciseSetServices = require("../services/exercise-set.services");
const CompletedWorkoutServices = require("../services/completed-workout.services");
const CompletedExerciseServices = require("../services/completed-exercise.services");
const CompletedExerciseSetServices = require("../services/completed-exercise-set.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");
const { formatDateForDatabase } = require("../utils/formatting.utils");

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
            exerciseSetId: exerciseSet.exerciseSetId,
            wasCompleted: false,
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
            exerciseId: exercise.exerciseId,
            completedExerciseOrder: exercise.exerciseOrder,
            completedExerciseName: exercise.exerciseName,
            completedExerciseSets,
         };

         completedExercises.push(completedExercise);
      }

      const completedWorkout = {
         workoutId: workout.workoutId,
         completedWorkoutName: workout.workoutName,
         completedWorkoutType: workout.workoutType,
         completedExercises,
      };

      return res.status(200).json({ completedWorkout });
   } catch (error) {
      next(error);
   }
};

exports.addCompletedWorkout = async (req, res, next) => {
   try {
      const { completedWorkout } = req.body;
      const { userId } = req;

      const completedDate = formatDateForDatabase(new Date());

      const newCompletedWorkoutId =
         await CompletedWorkoutServices.insertCompletedWorkout({
            userId,
            completedDate,
            completedWorkout,
         });

      for (var completedExercise of completedWorkout.completedExercises) {
         const newCompletedExerciseId =
            await CompletedExerciseServices.insertCompletedExercise({
               completedWorkoutId: newCompletedWorkoutId,
               completedExercise,
            });

         for (var completedExerciseSet of completedExercise.completedExerciseSets) {
            if (completedExerciseSet.wasCompleted) {
               const exerciseSet = await ExerciseSetServices.getExerciseSetById(
                  {
                     exerciseSetId: completedExerciseSet.exerciseSetId,
                  }
               );

               await ExerciseSetServices.updateExerciseSet({
                  exerciseSet: {
                     ...exerciseSet,
                     reps: completedExerciseSet.completedReps,
                     weight: completedExerciseSet.completedWeight,
                     hr: completedExerciseSet.completedHr,
                     min: completedExerciseSet.completedMin,
                     sec: completedExerciseSet.completedSec,
                     distance: completedExerciseSet.completedDistance,
                  },
               });
            }

            await CompletedExerciseSetServices.insertCompletedExerciseSet({
               completedExerciseId: newCompletedExerciseId,
               completedExerciseSet,
            });
         }
      }

      return res.status(200).json("Completed workout created successfully.");
   } catch (error) {
      next(error);
   }
};

exports.getCompletedWorkouts = async (req, res, next) => {
   try {
      const { userId } = req;

      const completedWorkouts =
         await CompletedWorkoutServices.getCompletedWorkouts({ userId });

      return res.status(200).json({ completedWorkouts });
   } catch (error) {
      next(error);
   }
};

exports.getCompeltedWorkoutById = async (req, res, next) => {
   try {
      const completedWorkoutId = req.params["completedWorkoutId"];

      const workoutResults = await CompletedWorkoutServices.getCompletedWorkout(
         { completedWorkoutId }
      );

      const completedWorkout = workoutResults[0];

      if (!completedWorkout) {
         throw new Error("Unable to find completed workout.");
      }

      const exerciseResults =
         await CompletedExerciseServices.getCompletedExercises({
            completedWorkoutId,
         });

      const completedExercises = await Promise.all(
         exerciseResults.map(async (e) => {
            const exerciseSetResults =
               await CompletedExerciseSetServices.getCompletedExerciseSets({
                  completedExerciseId: e.completedExerciseId,
               });

            return {
               ...e,
               completedExerciseSets: exerciseSetResults,
            };
         })
      );

      completedWorkout.completedExercises = completedExercises;

      return res.status(200).json({ completedWorkout });
   } catch (error) {
      next(error);
   }
};

exports.updateCompletedWorkout = async (req, res, next) => {
   try {
      const { completedWorkout } = req.body;

      await CompletedWorkoutServices.updateCompletedWorkout({
         completedWorkout,
      });

      const existingExercises =
         await CompletedExerciseServices.getCompletedExercises({
            completedWorkoutId: completedWorkout.completedWorkoutId,
         });

      const existingExerciseIds = existingExercises.map(
         (e) => e.completedExerciseId
      );

      for (var exercise of completedWorkout.completedExercises) {
         if (
            existingExerciseIds.find(
               (id) => exercise.completedExerciseId === id
            )
         ) {
            await CompletedExerciseServices.updateCompletedExercise({
               exercise,
            });

            const idIndex = existingExerciseIds.findIndex(
               (id) => exercise.completedExerciseId === id
            );
            if (idIndex !== -1) {
               existingExerciseIds.splice(idIndex, 1);
            }

            const existingExerciseSets =
               await CompletedExerciseSetServices.getCompletedExerciseSets({
                  completedExerciseId: exercise.completedExerciseId,
               });

            const existingExerciseSetIds = existingExerciseSets.map(
               (es) => es.completedExerciseSetId
            );

            for (var exerciseSet of exercise.completedExerciseSets) {
               if (
                  existingExerciseSetIds.find(
                     (id) => exerciseSet.completedExerciseSetId === id
                  )
               ) {
                  await CompletedExerciseSetServices.updateCompletedExerciseSet(
                     { exerciseSet }
                  );

                  const idIndex = existingExerciseSetIds.findIndex(
                     (id) => exerciseSet.completedExerciseSetId === id
                  );
                  if (idIndex !== -1) {
                     existingExerciseSetIds.splice(idIndex, 1);
                  }
               } else {
                  await CompletedExerciseSetServices.createCompletedExerciseSet(
                     {
                        completedExerciseId: exercise.completedExerciseId,
                        ...exerciseSet,
                     }
                  );
               }
            }

            for (const existingExerciseSetId of existingExerciseSetIds) {
               await CompletedExerciseSetServices.deleteCompletedExerciseSet({
                  completedExerciseSetId: existingExerciseSetId,
               });
            }
         } else {
            const newCompletedExerciseId =
               await CompletedExerciseServices.createCompletedExercise({
                  completedWorkoutId: completedWorkout.completedWorkoutId,
                  ...exercise,
               });

            for (var exerciseSet of exercise.completedExerciseSets) {
               await CompletedExerciseSetServices.createCompletedExerciseSet({
                  completedExerciseId: newCompletedExerciseId,
                  ...exerciseSet,
               });
            }
         }
      }

      for (const existingExerciseId of existingExerciseIds) {
         await CompletedExerciseServices.deleteCompletedExercise({
            completedExerciseId: existingExerciseId,
         });
      }

      return res.status(201).json("Completed workout updated.");
   } catch (error) {
      next(error);
   }
};

exports.deleteCompletedWorkout = async (req, res, next) => {
   try {
      const completedWorkoutId = req.params["completedWorkoutId"];

      await CompletedWorkoutServices.deleteCompletedWorkout({
         completedWorkoutId,
      });

      return res.status(201).json("Completed workout deleted successfully.");
   } catch (error) {
      next(error);
   }
};
