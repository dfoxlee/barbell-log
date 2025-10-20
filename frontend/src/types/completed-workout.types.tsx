import type { CompletedExerciseType } from "./completed-exercise.types";

export interface CompletedWorkoutType {
   completedWorkoutId?: number;
   workoutId?: number;
   completedWorkoutName: string;
   completedWorkoutType: number;
   completedDate?: Date | string;
   completedExercises: CompletedExerciseType[];
}
