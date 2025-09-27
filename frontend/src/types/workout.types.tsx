import type { ExerciseType } from "./exercise.types";

export interface WorkoutType {
   workoutId?: number;
   workoutName: string;
   workoutType: number;
   exercises: ExerciseType[];
}
