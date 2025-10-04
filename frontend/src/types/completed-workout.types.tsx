import type { CompletedExerciseType } from "./completed-exercise.types";

export interface CompletedWorkoutType {
   compeltedWorkoutId?: number;
   completedWorkoutName: string;
   completedWorkoutType: number;
   completedDate?: Date | string;
   completedExercises: CompletedExerciseType[];
}
