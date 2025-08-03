export interface CompletedWorkoutType {
   completedWorkoutId?: string;
   workoutId: string;
   workoutName?: string;
   completedDate?: Date | string;
   completedExercises: CompletedExerciseType[];
}

export interface CompletedExerciseType {
   completedExerciseId?: string;
   exerciseId: string;
   exerciseName?: string;
   completedExerciseOrder: number;
   completedExerciseSets: CompletedExerciseSetType[];
}

export interface CompletedExerciseSetType {
   completedExerciseSetId: string;
   hasReps: boolean;
   isWarmup: boolean;
   isTimed: boolean;
   isDistance: boolean;
   isBodyweight: boolean;
   exerciseSetId: string;
   completedExerciseSetOrder: number;
   completedReps: number;
   completedWeight: number;
   completedHr: number;
   completedMin: number;
   completedSec: number;
   completedDistance: number;
   notes: string;
   isComplete: boolean;
}
