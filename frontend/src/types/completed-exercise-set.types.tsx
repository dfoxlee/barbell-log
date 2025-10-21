export interface CompletedExerciseSetType {
   completedExerciseSetId?: number;
   exerciseSetId?: number;
   completedExerciseSetOrder: number;
   wasCompleted: boolean;
   hadReps: boolean;
   wasTimed: boolean;
   wasDistance: boolean;
   completedReps: number;
   completedWeight: number;
   completedWeightUnit: number;
   completedHr: number;
   completedMin: number;
   completedSec: number;
   completedDistance: number;
   completedDistanceUnit: number;
   notes: string;
}
