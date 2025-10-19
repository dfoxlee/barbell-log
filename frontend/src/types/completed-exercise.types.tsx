import type { CompletedExerciseSetType } from "./completed-exercise-set.types";

export interface CompletedExerciseType {
   completedExerciseId?: number;
   exerciseId?: number;
   completedExerciseOrder: number;
   completedExerciseName: string;
   completedExerciseSets: CompletedExerciseSetType[];
}
