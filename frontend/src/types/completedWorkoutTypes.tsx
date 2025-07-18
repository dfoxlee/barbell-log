import type {
   ExerciseSetType,
   ExerciseType,
   WorkoutType,
} from "./workoutTypes";

export interface CompletedWorkoutType {
   completedWorkoutId?: string;
   workout: WorkoutType;
   createdDate?: Date;
   completedExercises: CompletedExerciseType[];
}

export interface CompletedExerciseType {
   completedExerciseId?: string;
   completedExerciseOrder: number;
   exercise: ExerciseType;
   completedExerciseSets: CompletedExerciseSetType[];
}

export interface CompletedExerciseSetType {
   completedExerciseSetId: string;
   completedSetOrder: number;
   exerciseSet: ExerciseSetType;
   completedReps: number;
   completedWeight: number;
   completedHr: number;
   completedMin: number;
   completedSec: number;
   completedDistance: number;
}
