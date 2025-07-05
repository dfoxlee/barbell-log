export interface UserType {
   token: string;
   createdDate: Date;
   weightUnitPreference: string;
}

export interface WorkoutCompositionStateType {
   workoutOrder: string | null;
   workoutName: string;
   workoutId: string | null;
   exercises: ExerciseType[];
}

export interface ExerciseType {
   exerciseId: string | null;
   exerciseOrder: number | null;
   exerciseName: string;
   sets: SetType[];
}

export interface SetType {
   setId: string | null;
   setOrder: number | null;
   reps: number;
   weight: number;
   weightUnit: number;
   hr: number;
   min: number;
   sec: number;
   distance: number;
   distanceUnit: number;
}
