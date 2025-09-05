export interface CompletedWorkoutType {
   completedWorkoutId?: string;
   completedDate?: Date | string;
   completedWorkoutName: string;
   completedExercises: CompletedExerciseType[];
   currentExerciseOrder: number;
}

export interface CompletedExerciseType {
   completedExerciseId?: string;
   completedExerciseOrder: number;
   completedExerciseName: string;
   completedExerciseSets: CompletedExerciseSetType[];
}

export interface CompletedExerciseSetType {
   completedExerciseSetId?: string;
   completedReps: number;
   completedWeight: number;
   notes: string;
   isComplete: boolean;
   completedDistance: number;
   completedHr: number;
   completedMin: number;
   completedSec: number;
   completedExerciseSetOrder: number;
   completedWeightUnit: string;
   completedDistanceUnit: string;
   hadReps: boolean;
   wasBodyweight: boolean;
   wasTimed: boolean;
   wasDistance: boolean;
   wasWarmup: boolean;
   updateExerciseSetId: string;
}
