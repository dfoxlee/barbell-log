const pool = require("../db/dbConfig");
const {
   selectCompletedExercises,
   deleteCompletedExercise,
   insertCompletedExercise,
   updateCompletedExercise,
} = require("../services/completedExercises.services");
const {
   selectCompletedExerciseSets,
   deleteCompletedExerciseSet,
   insertCompletedExerciseSet,
   updateCompletedExerciseSet,
} = require("../services/completedExerciseSets.services");
const {
   selectCompletedWorkout,
   insertCompletedWorkout,
   updateCompletedWorkout,
} = require("../services/completedWorkouts.services");
const {
   deleteCompletedWorkouts,
} = require("../services/completedWorkouts.services");
const { selectExercises } = require("../services/exercises.services");
const {
   selectExerciseSets,
   updateExerciseSet,
} = require("../services/exerciseSets.services");
const { selectWorkouts } = require("../services/workouts.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const getCompletedWorkout = async ({ completedWorkoutId }) => {
   const completedWorkout = await selectCompletedWorkout({
      completedWorkoutId,
   });

   let completedExercises = await selectCompletedExercises({
      completedWorkoutId,
   });

   completedExercises = await Promise.all(
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
      completedExercises,
   };
};

const getCompletedWorkouts = async ({ userId, page = 0, take = 10 } = {}) => {
   const completedWorkouts = await selectCompletedWorkout({
      userId,
      page,
      take,
   });

   return completedWorkouts;
};

const getNewCompletedWorkout = async ({ workoutId }) => {
   const workouts = await selectWorkouts({ workoutId });
   const exercises = await selectExercises({ workoutId });
   const exercisesWithSets = await Promise.all(
      exercises.map(async (exercise) => {
         const exerciseSets = await selectExerciseSets({
            exerciseId: exercise.exerciseId,
         });

         return {
            ...exercise,
            exerciseSets,
         };
      })
   );

   const completedExercises = exercisesWithSets.map((exercise) => {
      const completedExerciseSets = exercise.exerciseSets.map(
         (exerciseSet) => ({
            completedReps: exerciseSet.reps,
            completedWeight: exerciseSet.weight,
            notes: "",
            isComplete: false,
            completedDistance: exerciseSet.distance,
            completedHr: exerciseSet.hr,
            completedMin: exerciseSet.min,
            completedSec: exerciseSet.sec,
            completedExerciseSetOrder: exerciseSet.exerciseSetOrder,
            completedWeightUnit: exerciseSet.weightUnit,
            completedDistanceUnit: exerciseSet.distanceUnit,
            hadReps: exerciseSet.hasReps,
            wasBodyweight: exerciseSet.isBodyweight,
            wasTimed: exerciseSet.isTimed,
            wasDistance: exerciseSet.isDistance,
            wasWarmup: exerciseSet.isWarmup,
            updateExerciseSetId: exerciseSet.exerciseSetId,
         })
      );

      return {
         completedExerciseOrder: exercise.exerciseOrder,
         completedExerciseName: exercise.exerciseName,
         completedExerciseSets,
      };
   });

   return {
      completedWorkoutName: workouts[0].workoutName,
      completedExercises,
   };
};

const createCompletedWorkout = async ({ userId, completedWorkout }) => {
   const completedDate = new Date();

   if (!completedWorkout) {
      throw new Error("No workout provided.");
   }

   await insertCompletedWorkout({
      completedWorkout,
      completedDate,
      userId,
   });

   const newCompletedWorkoutSearch = await selectCompletedWorkout({
      completedDate,
      userId,
   });

   const newCompletedWorkoutId =
      newCompletedWorkoutSearch[0].completedWorkoutId;

   for (var completedExercise of completedWorkout.completedExercises) {
      await insertCompletedExercise({
         ...completedExercise,
         completedWorkoutId: newCompletedWorkoutId,
      });

      const newCompletedExerciseSearch = await selectCompletedExercises({
         completedExerciseOrder: completedExercise.completedExerciseOrder,
         completedWorkoutId: newCompletedWorkoutId,
      });

      const newCompletedExerciseId =
         newCompletedExerciseSearch[0].completedExerciseId;

      for (var completedExerciseSet of completedExercise.completedExerciseSets) {
         await insertCompletedExerciseSet({
            ...completedExerciseSet,
            completedExerciseId: newCompletedExerciseId,
         });
      }

      const latestCompletedSet = completedExercise.completedExerciseSets
         .sort(
            (a, b) => b.completedExerciseSetOrder - a.completedExerciseSetOrder
         )
         .find((completedExerciseSet) => completedExerciseSet.isComplete);
      if (latestCompletedSet) {
         const updateExerciseSets = await selectExerciseSets({
            exerciseSetId: latestCompletedSet.updateExerciseSetId,
         });

         if (updateExerciseSets.length) {
            await updateExerciseSet({
               ...updateExerciseSets[0],
               reps: completedExerciseSet.completedReps,
               weight: completedExerciseSet.completedWeight,
               weightUnit: completedExerciseSet.completedWeightUnit,
               hr: completedExerciseSet.completedHr,
               min: completedExerciseSet.completedMin,
               sec: completedExerciseSet.completedSec,
               distance: completedExerciseSet.completedDistance,
               distanceUnit: completedExerciseSet.completedDistanceUnit,
            });
         }
      }
   }

   return;
};

const fetchUpdateCompletedWorkout = async ({ completedWorkout }) => {
   await updateCompletedWorkout(completedWorkout);

   const currentCompletedExercises = await selectCompletedExercises({
      completedWorkoutId: completedWorkout.completedWorkoutId,
   });

   for (var completedExercise of completedWorkout.completedExercises) {
      const currentCompletedExerciseIndex = currentCompletedExercises.findIndex(
         (currentCompletedExercise) =>
            currentCompletedExercise.completedExerciseId ===
            completedExercise.completedExerciseId
      );

      if (currentCompletedExerciseIndex < 0) {
         await insertCompletedExercise(completedExercise);

         const newCompletedExercises = await selectCompletedExercises({
            completedWorkoutId: completedWorkout.completedWorkoutId,
         });

         const newCompletedExerciseId =
            newCompletedExercises[0].completedExerciseId;

         for (var completedExerciseSet of completedExercise.completedExerciseSet) {
            await insertCompletedExerciseSet({
               ...completedExerciseSet,
               completedExerciseId: newCompletedExerciseId,
            });
         }
      } else {
         await updateCompletedExercise(completedExercise);

         const currentCompletedExerciseSets = await selectCompletedExerciseSets(
            { completedExerciseId: completedExercise.completedExerciseId }
         );

         for (var completedExerciseSet of completedExercise.completedExerciseSets) {
            const currentCompletedExerciseSetIndex =
               currentCompletedExerciseSets.findIndex(
                  (currentCompletedExerciseSet) =>
                     currentCompletedExerciseSet.completedExerciseSetId ===
                     completedExerciseSet.completedExerciseSetId
               );

            if (currentCompletedExerciseSetIndex < 0) {
               await insertCompletedExerciseSet({
                  ...completedExerciseSet,
                  completedExercise: completedExercise.completedExerciseId,
               });
            } else {
               await updateCompletedExerciseSet(completedExerciseSet);

               currentCompletedExerciseSets.splice(
                  currentCompletedExerciseSetIndex,
                  1
               );
            }
         }

         for (var deleteCompletedExerciseSet of currentCompletedExerciseSets) {
            await deleteCompletedExerciseSet(
               deleteCompletedExerciseSet.completedExerciseSet
            );
         }

         currentCompletedExercises.splice(currentCompletedExerciseIndex, 1);
      }
   }

   for (var deleteCompletedExercise of currentCompletedExercises) {
      await deleteCompletedExercise(
         deleteCompletedExercise.completedExerciseId
      );
   }
};

const deleteCompletedWorkout = async ({ completedWorkoutId }) => {
   const completedExercises = await selectCompletedExercises({
      completedWorkoutId,
   });

   await Promise.all(
      completedExercises.map(async (exercise) => {
         await deleteCompletedExerciseSet(exercise.completedExerciseId);

         await deleteCompletedExercise(exercise.completedExerciseId);
      })
   );

   await deleteCompletedWorkouts(completedWorkoutId);
};

module.exports = {
   getCompletedWorkout,
   getCompletedWorkouts,
   getNewCompletedWorkout,
   createCompletedWorkout,
   fetchUpdateCompletedWorkout,
   deleteCompletedWorkout,
};
