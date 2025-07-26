const {
   createExercise,
   getExercises,
   getExerciseIds,
   updateExercise,
   deleteExercise,
} = require("../services/exercises.services");
const {
   createExerciseSet,
   getExerciseSets,
   getExerciseSetIds,
   updateExerciseSet,
   deleteExerciseSet,
} = require("../services/exerciseSets.services");
const {
   getWorkouts,
   createWorkout,
   updateWorkout,
   deleteWorkout,
} = require("../services/workouts.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const getAllUserWorkouts = async ({ userId }) => {
   const selectWorkoutResults = await getWorkouts({ userId });

   return selectWorkoutResults;
};

const getUserWorkout = async ({ workoutId }) => {
   const selectWorkoutResults = await getWorkouts({ workoutId });

   if (!selectWorkoutResults.length) {
      throw new Error("No workout found.");
   }

   let workout = selectWorkoutResults[0];

   const selectExercisesResults = await getExercises({ workoutId });

   if (!selectExercisesResults.length) {
      return selectWorkoutResults[0];
   }

   const exercises = await Promise.all(
      selectExercisesResults.map(async (exercise) => {
         const selectExerciseSetsResults = await getExerciseSets({
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

   const selectWorkoutResults = await getWorkouts({ userId, workoutName });

   if (selectWorkoutResults.length > 0) {
      throw new Error("Workout already exists.");
   }

   await createWorkout({ userId, workoutName });

   const selectNewWorkoutResults = await getWorkouts({ userId, workoutName });

   const newWorkoutId = selectNewWorkoutResults[0].workoutId;

   await Promise.all(
      workoutComposition.exercises.map(async (exercise) => {
         await createExercise({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const selectNewExerciseResults = await getExercises({
            workoutId: newWorkoutId,
            exerciseName: exercise.exerciseName,
         });

         const newExerciseId = selectNewExerciseResults[0].exerciseId;

         await Promise.all(
            exercise.exerciseSets.map(async (set) => {
               await createExerciseSet({
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

const updateUserWorkout = async ({ userId, workoutComposition }) => {
   const { workoutId, workoutName, exercises } = workoutComposition;

   await updateWorkout({ workoutId, workoutName });

   const existingExerciseIds = await getExerciseIds({ workoutId });

   if (existingExerciseIds.length === 0) {
      return;
   }

   for (let exercise of exercises) {
      if (exercise.exerciseId) {
         await updateExercise({
            exerciseId: exercise.exerciseId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const exerciseSetIds = await getExerciseSetIds({
            exerciseId: exercise.exerciseId,
         });

         for (let set of exercise.exerciseSets) {
            if (set.exerciseSetId) {
               await updateExerciseSet({
                  exerciseSetId: set.exerciseSetId,
                  reps: set.reps,
                  weight: set.weight,
                  hasReps: set.hasReps,
                  isBodyweight: set.isBodyweight,
                  isTimed: set.isTimed,
                  isDistance: set.isDistance,
                  isWarmup: set.isWarmup,
                  weightUnit: set.weightUnit,
                  distanceUnit: set.distanceUnit,
                  distance: set.distance,
                  hr: set.hr,
                  min: set.min,
                  sec: set.sec,
                  exerciseSetOrder: set.exerciseSetOrder,
               });

               const index = exerciseSetIds.indexOf(set.exerciseSetId);

               if (index > -1) {
                  exerciseSetIds.splice(index, 1);
               }
            } else {
               await createExerciseSet({
                  exerciseId: set.exerciseId,
                  reps: set.reps,
                  weight: set.weight,
                  hasReps: set.hasReps,
                  isBodyweight: set.isBodyweight,
                  isTimed: set.isTimed,
                  isDistance: set.isDistance,
                  isWarmup: set.isWarmup,
                  weightUnit: set.weightUnit,
                  distanceUnit: set.distanceUnit,
                  distance: set.distance,
                  hr: set.hr,
                  min: set.min,
                  sec: set.sec,
                  exerciseSetOrder: set.exerciseSetOrder,
               });
            }
         }

         for (const setIdToDelete of exerciseSetIds) {
            await deleteExerciseSet({ exerciseSetId: setIdToDelete });
         }

         const index = existingExerciseIds.indexOf(exercise.exerciseId);
         if (index > -1) {
            existingExerciseIds.splice(index, 1);
         }
      } else {
         await createExercise({
            workoutId,
            exerciseName: exercise.exerciseName,
            exerciseOrder: exercise.exerciseOrder,
         });

         const newExerciseResults = await getExercises({
            workoutId,
            exerciseOrder: exercise.exerciseOrder,
         });

         const newExercise = newExerciseResults[0];

         for (let set of exercise.exerciseSets) {
            await createExerciseSet({
               exerciseId: newExercise.exerciseId,
               reps: set.reps,
               weight: set.weight,
               hasReps: set.hasReps,
               isBodyweight: set.isBodyweight,
               isTimed: set.isTimed,
               isDistance: set.isDistance,
               isWarmup: set.isWarmup,
               weightUnit: set.weightUnit,
               distanceUnit: set.distanceUnit,
               distance: set.distance,
               hr: set.hr,
               min: set.min,
               sec: set.sec,
               exerciseSetOrder: set.exerciseSetOrder,
            });
         }
      }
   }

   for (const exerciseIdToDelete of existingExerciseIds) {
      await deleteExerciseSet({ exerciseSetId: exerciseIdToDelete });

      await deleteExercise({ exerciseId: exerciseIdToDelete });
   }

   return;
};

const deleteUserWorkout = async ({ workoutId }) => {
   const exerciseSearchResults = await getExercises({ workoutId });

   if (exerciseSearchResults.length) {
      for (const exercise of exerciseSearchResults) {
         await deleteExerciseSet({ exerciseId: exercise.exerciseId });
      }
   }

   await deleteExercise({ workoutId });

   await deleteWorkout({ workoutId });

   return;
};

module.exports = {
   getAllUserWorkouts,
   getUserWorkout,
   addUserWorkout,
   updateUserWorkout,
   deleteUserWorkout,
};
