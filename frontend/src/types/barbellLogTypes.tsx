export interface CompletedExerciseType {
   completedExerciseId?: string;
   exerciseId: string;
   exerciseName: string;
   completedExerciseOrder: number;
   completedExerciseSets: CompletedExerciseSetType[];
}

export interface CompletedExerciseSetType {
   completedExerciseSetId?: string;
   exerciseSetId: string;
   completedExerciseSetOrder: number;
   completedReps: number;
   completedWeight: number;
   completedWeightUnit: string;
   completedHr: number;
   completedMin: number;
   completedSec: number;
   completedDistance: number;
   completedDistanceUnit: string;
   notes: string;
   isComplete: boolean;
}

export interface BarbellLogType {
   completedWorkoutId?: string;
   workoutId: string;
   workoutName: string;
   completedDate?: Date | string | null;
   completedExercises: CompletedExerciseType[];
   currentExerciseOrder: number;
   currentExerciseSetOrder: number;
}
