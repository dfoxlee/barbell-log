const pool = require("../db/dbConfig");
const {
   selectCompletedExercises,
} = require("../services/completedExercises.services");
const {
   selectCompletedExerciseSets,
} = require("../services/completedExerciseSets.services");
const {
   selectCompletedWorkout,
} = require("../services/completedWorkouts.services");
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
      ...completedWorkout,
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

const createCompletedWorkout = async ({ userId, workout }) => {
   const createdDate = new Date();
   const workoutId = workout.workoutId;

   const [insertWorkoutResults] = await pool.execute(
      `
            INSERT INTO completed_workout (workout_id, completed_date) 
            VALUES (?, ?)
         `,
      [workoutId, createdDate]
   );

   if (!insertWorkoutResults.affectedRows) {
      throw new Error("Unable to insert workout into database.");
   }

   const [selectNewWorkoutResults] = await pool.execute(
      `
            SELECT *
            FROM completed_workout
            WHERE workout_id = ?
            ORDER BY completed_date DESC
         `,
      [workoutId]
   );

   const newWorkoutId = selectNewWorkoutResults[0].completed_workout_id;

   await Promise.all(
      workout.completedExercises.map(async (exercise) => {
         const [insertExerciseResults] = await pool.execute(
            `
               INSERT INTO completed_exercise (completed_workout_id, exercise_id, completed_exercise_order)
               VALUES (?, ?, ?)
            `,
            [newWorkoutId, exercise.exerciseId, exercise.completedExerciseOrder]
         );

         if (!insertExerciseResults.affectedRows) {
            throw new Error("Unable to insert exercise into database.");
         }

         const [selectNewExerciseResults] = await pool.execute(
            `
               SELECT *
               FROM completed_exercise
               WHERE exercise_id = ?
                  AND completed_workout_id = ?
            `,
            [exercise.exerciseId, newWorkoutId]
         );

         const newExerciseId =
            selectNewExerciseResults[0].completed_exercise_id;

         await Promise.all(
            exercise.completedSets.map(async (set) => {
               const [insertExerciseSetResults] = await pool.execute(
                  `
                  INSERT INTO completed_exercise_set (
                     completed_exercise_id, 
                     exercise_set_id, 
                     completed_reps,
                     completed_weight,
                     notes,
                     is_complete 
                  )
                  VALUES (
                     ?, ?, ?, ?, ?, ?
                  )
               `,
                  [
                     newExerciseId,
                     set.exerciseSetId,
                     set.completedReps,
                     set.completedWeight,
                     set.notes,
                     set.isComplete,
                  ]
               );

               if (!insertExerciseSetResults.affectedRows) {
                  throw new Error("Unable to insert set into database.");
               }
            })
         );
      })
   );
};

const updateCompletedWorkout = async ({ completedWorkout }) => {
   // Update completed_workout date if provided
   if (completedWorkout.completedDate) {
      const completedDate = new Date(completedWorkout.completedDate);
      const [updateWorkoutResults] = await pool.execute(
         `
            UPDATE completed_workout
            SET completed_date = ?
            WHERE completed_workout_id = ?
         `,
         [completedDate, completedWorkout.completedWorkoutId]
      );
      if (!updateWorkoutResults.affectedRows) {
         throw new Error("Unable to update completed workout date.");
      }
   }

   const completedWorkoutId = completedWorkout.completedWorkoutId;

   // Get existing completed_exercise ids for this completed workout
   const [existingExercises] = await pool.execute(
      `
         SELECT completed_exercise_id
         FROM completed_exercise
         WHERE completed_workout_id = ?
      `,
      [completedWorkoutId]
   );
   let existingExerciseIds = existingExercises.map(
      (e) => e.completed_exercise_id
   );

   for (const exercise of completedWorkout.completedExercises) {
      if (exercise.completedExerciseId) {
         // Update completed_exercise order if changed
         const [updateExerciseResults] = await pool.execute(
            `
               UPDATE completed_exercise
               SET completed_exercise_order = ?
               WHERE completed_exercise_id = ?
            `,
            [exercise.completedExerciseOrder, exercise.completedExerciseId]
         );
         if (!updateExerciseResults.affectedRows) {
            throw new Error("Unable to update completed exercise.");
         }

         // Get existing set ids for this completed exercise
         const [existingSets] = await pool.execute(
            `
               SELECT completed_exercise_set_id
               FROM completed_exercise_set
               WHERE completed_exercise_id = ?
            `,
            [exercise.completedExerciseId]
         );
         let existingSetIds = existingSets.map(
            (s) => s.completed_exercise_set_id
         );

         for (const set of exercise.completedSets) {
            if (set.completedExerciseSetId) {
               // Update set
               const [updateSetResults] = await pool.execute(
                  `
                     UPDATE completed_exercise_set
                     SET completed_reps = ?, completed_weight = ?, notes = ?, is_complete = ?
                     WHERE completed_exercise_set_id = ?
                  `,
                  [
                     set.completedReps,
                     set.completedWeight,
                     set.notes,
                     set.isCompleted,
                     set.completedExerciseSetId,
                  ]
               );
               if (!updateSetResults.affectedRows) {
                  throw new Error("Unable to update completed exercise set.");
               }
               // Remove from deletion list
               const idx = existingSetIds.indexOf(set.completedExerciseSetId);
               if (idx > -1) existingSetIds.splice(idx, 1);
            } else {
               // Insert new set
               const [insertSetResults] = await pool.execute(
                  `
                     INSERT INTO completed_exercise_set (
                        completed_exercise_id, 
                        exercise_set_id, 
                        completed_reps,
                        completed_weight,
                        notes,
                        is_complete
                     )
                     VALUES (?, ?, ?, ?, ?, ?)
                  `,
                  [
                     exercise.completedExerciseId,
                     set.exerciseSetId,
                     set.completedReps,
                     set.completedWeight,
                     set.notes,
                     set.isComplete,
                  ]
               );
               if (!insertSetResults.affectedRows) {
                  throw new Error(
                     "Unable to insert new completed exercise set."
                  );
               }
            }
         }

         // Delete removed sets
         for (const setIdToDelete of existingSetIds) {
            const [deleteSetResults] = await pool.execute(
               `
                  DELETE FROM completed_exercise_set
                  WHERE completed_exercise_set_id = ?
               `,
               [setIdToDelete]
            );
            // No need to throw if already deleted
         }

         // Remove from deletion list
         const idx = existingExerciseIds.indexOf(exercise.completedExerciseId);
         if (idx > -1) existingExerciseIds.splice(idx, 1);
      } else {
         // Insert new completed_exercise
         const [insertExerciseResults] = await pool.execute(
            `
               INSERT INTO completed_exercise (completed_workout_id, exercise_id, completed_exercise_order)
               VALUES (?, ?, ?)
            `,
            [
               completedWorkoutId,
               exercise.exerciseId,
               exercise.completedExerciseOrder,
            ]
         );
         if (!insertExerciseResults.affectedRows) {
            throw new Error("Unable to insert new completed exercise.");
         }
         // Get new completed_exercise_id
         const [newExerciseResults] = await pool.execute(
            `
               SELECT completed_exercise_id
               FROM completed_exercise
               WHERE completed_workout_id = ? AND exercise_id = ? AND completed_exercise_order = ?
               ORDER BY completed_exercise_id DESC
               LIMIT 1
            `,
            [
               completedWorkoutId,
               exercise.exerciseId,
               exercise.completedExerciseOrder,
            ]
         );
         const newCompletedExerciseId =
            newExerciseResults[0].completed_exercise_id;

         // Insert sets for new exercise
         for (const set of exercise.sets) {
            const [insertSetResults] = await pool.execute(
               `
                  INSERT INTO completed_exercise_set (
                     completed_exercise_id, 
                     exercise_set_id, 
                     completed_reps,
                     completed_weight,
                     notes,
                     is_complete
                  )
                  VALUES (?, ?, ?, ?, ?, ?)
               `,
               [
                  newCompletedExerciseId,
                  set.exerciseSetId,
                  set.completedReps,
                  set.completedWeight,
                  set.notes,
                  set.isComplete,
               ]
            );
            if (!insertSetResults.affectedRows) {
               throw new Error(
                  "Unable to insert set for new completed exercise."
               );
            }
         }
      }
   }

   // Delete removed completed_exercises and their sets
   for (const exerciseIdToDelete of existingExerciseIds) {
      await pool.execute(
         `
            DELETE FROM completed_exercise_set
            WHERE completed_exercise_id = ?
         `,
         [exerciseIdToDelete]
      );
      await pool.execute(
         `
            DELETE FROM completed_exercise
            WHERE completed_exercise_id = ?
         `,
         [exerciseIdToDelete]
      );
   }
};

const deleteCompletedWorkout = async ({ completedWorkoutId }) => {
   // Delete all sets for all exercises in this workout
   const [selectDeleteExerciseSets] = await pool.execute(
      `
      SELECT *
      FROM completed_exercise_set
      INNER JOIN completed_exercise ON completed_exercise.completed_exercise_id = completed_exercise_set.completed_exercise_id
      WHERE completed_exercise.completed_workout_id = ?
      `,
      [completedWorkoutId]
   );

   const [deleteExerciseSets] = await pool.execute(
      `
         DELETE completed_exercise_set FROM completed_exercise_set
         INNER JOIN completed_exercise ON completed_exercise.completed_exercise_id = completed_exercise_set.completed_exercise_id
         WHERE completed_exercise.completed_workout_id = ?
      `,
      [completedWorkoutId]
   );

   if (!deleteExerciseSets.affectedRows) {
      throw new Error("Unable to delete exercise sets.");
   }

   // Delete all exercises for this workout
   const [deleteCompletedExercise] = await pool.execute(
      `
         DELETE FROM completed_exercise
         WHERE completed_workout_id = ?
      `,
      [completedWorkoutId]
   );

   if (!deleteCompletedExercise.affectedRows) {
      throw new Error("Unable to delete exercises");
   }

   // Delete the completed workout itself
   const [deleteWorkoutResults] = await pool.execute(
      `
         DELETE FROM completed_workout
         WHERE completed_workout_id = ?
      `,
      [completedWorkoutId]
   );

   if (!deleteWorkoutResults.affectedRows) {
      throw new Error("Unable to delete completed workout.");
   }
};

module.exports = {
   createCompletedWorkout,
   getCompletedWorkouts,
   getCompletedWorkout,
   updateCompletedWorkout,
   deleteCompletedWorkout,
};
