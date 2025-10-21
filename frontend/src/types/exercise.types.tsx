import type { ExerciseSetType } from "./exercise-set.types";

export interface ExerciseType {
   exerciseId?: number;
   exerciseName: string;
   exerciseOrder: number;
   exerciseSets: ExerciseSetType[];
}
