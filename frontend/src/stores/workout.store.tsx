import { create } from "zustand";
import type { WorkoutType } from "../types/workout.types";
import type { WorkoutTypeType } from "../types/common.types";

interface WorkoutStoreType {
   workouts: WorkoutType[] | null;
   workoutComposition: WorkoutType | null;
   currentExerciseOrder: number;
   workoutTypes: WorkoutTypeType[] | null;
   showExercisesOverview: boolean;
   toggleShowExercisesOverview: () => void;
   setWorkouts: (workouts: WorkoutType[]) => void;
   setWorkoutComposition: (workout: WorkoutType) => void;
   addExercise: (
      weightUnitPreference?: number | null,
      distanceUnitPreference?: number | null
   ) => void;
   setWorkoutTypes: (workoutTypes: WorkoutTypeType[]) => void;
   incrementCurrentExerciseOrder: () => void;
   decrementCurrentExerciseOrder: () => void;
   setCurrentExerciseOrder: (order: number) => void;
   resetWorkoutComposition: () => void;
}

export const useWorkoutStore = create<WorkoutStoreType>((set, get) => ({
   workouts: null,
   workoutComposition: {
      workoutName: "",
      workoutType: 12,
      exercises: [
         {
            exerciseOrder: 1,
            exerciseName: "",
            exerciseSets: [
               {
                  exerciseSetOrder: 1,
                  hasReps: true,
                  isTimed: false,
                  isDistance: false,
                  reps: 0,
                  weight: 0,
                  weightUnit: 1,
                  hr: 0,
                  min: 0,
                  sec: 0,
                  distance: 0,
                  distanceUnit: 7,
               },
            ],
         },
      ],
   },
   currentExerciseOrder: 1,
   workoutTypes: null,
   showExercisesOverview: false,
   toggleShowExercisesOverview: () =>
      set(({ showExercisesOverview }) => ({
         showExercisesOverview: !showExercisesOverview,
      })),

   setWorkouts: (workouts) => set({ workouts }),

   setWorkoutComposition: (workout) => set({ workoutComposition: workout }),

   addExercise: (weightUnitPreference, distanceUnitPreference) => {
      const workoutComposition = get().workoutComposition;

      const maxExerciseOrder = workoutComposition?.exercises.reduce(
         (max, exercise) =>
            exercise.exerciseOrder > max ? exercise.exerciseOrder : max,
         0
      );

      if (!workoutComposition || maxExerciseOrder === undefined) return;

      const newExercise = {
         exerciseOrder: maxExerciseOrder + 1,
         exerciseName: "",
         exerciseSets: [
            {
               exerciseSetOrder: 1,
               hasReps: true,
               isTimed: false,
               isDistance: false,
               reps: 0,
               weight: 0,
               weightUnit: weightUnitPreference ?? 1,
               hr: 0,
               min: 0,
               sec: 0,
               distance: 0,
               distanceUnit: distanceUnitPreference ?? 7,
            },
         ],
      };

      const newWorkoutComposition = {
         ...workoutComposition,
         exercises: [...workoutComposition.exercises, newExercise],
      };

      set({
         workoutComposition: newWorkoutComposition,
         currentExerciseOrder: newExercise.exerciseOrder,
      });
   },

   setWorkoutTypes: (workoutTypes) => set({ workoutTypes }),

   incrementCurrentExerciseOrder: () =>
      set(({ currentExerciseOrder }) => ({
         currentExerciseOrder: currentExerciseOrder + 1,
      })),

   decrementCurrentExerciseOrder: () =>
      set(({ currentExerciseOrder }) => ({
         currentExerciseOrder:
            currentExerciseOrder > 1 ? currentExerciseOrder - 1 : 1,
      })),

   setCurrentExerciseOrder: (order: number) =>
      set({ currentExerciseOrder: order }),

   resetWorkoutComposition: () =>
      set({
         workoutComposition: {
            workoutName: "",
            workoutType: 12,
            exercises: [
               {
                  exerciseOrder: 1,
                  exerciseName: "",
                  exerciseSets: [
                     {
                        exerciseSetOrder: 1,
                        hasReps: true,
                        isTimed: false,
                        isDistance: false,
                        reps: 0,
                        weight: 0,
                        weightUnit: 1,
                        hr: 0,
                        min: 0,
                        sec: 0,
                        distance: 0,
                        distanceUnit: 7,
                     },
                  ],
               },
            ],
         },
         currentExerciseOrder: 1,
      }),
}));
