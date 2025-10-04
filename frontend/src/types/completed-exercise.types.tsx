import type { CompletedExerciseSetType } from "./completed-exercise-set.types";

export interface CompletedExerciseType {
   completedExerciseId?: number;
   completedExerciseOrder: number;
   completedExerciseName: string;
   completedExerciseSets: CompletedExerciseSetType[];
}
