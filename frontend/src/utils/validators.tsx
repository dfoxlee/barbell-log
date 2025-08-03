import type { WorkoutType } from "../types/workoutTypes";

export const workoutCompositionValidator = ({
   workoutComposition,
}: {
   workoutComposition: WorkoutType;
}) => {
   if (workoutComposition.workoutName === "") {
      return { valid: false, message: "Workout name must have a value." };
   }

   for (const exercise of workoutComposition.exercises) {
      if (exercise.exerciseName === "") {
         return {
            valid: false,
            message: `Exercise #${exercise.exerciseOrder} must have a value.`,
         };
      }
   }

   return { valid: true };
};
