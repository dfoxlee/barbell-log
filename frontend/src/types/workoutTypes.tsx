export interface WorkoutType {
   workoutId?: string;
   workoutName: string;
   createdDate?: Date;
   exercises: ExerciseType[];
}

export interface ExerciseType {
   exerciseId?: string;
   workoutId?: string;
   exerciseOrder: number;
   exerciseName: string;
   exerciseSets: ExerciseSetType[];
}

export interface ExerciseSetType {
   exerciseSetId?: string;
   exerciseId?: string;
   exerciseSetOrder: number;
   isTimed: boolean;
   isDistance: boolean;
   isBodyweight: boolean;
   isWarmup: boolean;
   hasReps: boolean;
   reps: number;
   weight: number;
   weightUnit: string;
   hr: number;
   min: number;
   sec: number;
   distance: number;
   distanceUnit: string;
}
