export interface CompletedExerciseSetType {
   completedExerciseSetId?: number;
   completedExerciseSetOrder: number;
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