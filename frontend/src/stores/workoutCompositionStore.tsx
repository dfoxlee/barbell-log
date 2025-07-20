import { create } from "zustand";
import type { ExerciseType, WorkoutType } from "../types/workoutTypes";

export interface WorkoutCompositionStoreProps {
   workoutComposition: WorkoutType;
   workoutCompositionLoading: boolean;
   workoutCompositionError: string | null;
   currentExerciseViewOrder: number;
   currentExerciseSetViewOrder: number;
   updateWorkoutComposition: (updatedWorkoutComposition: WorkoutType) => void;
   updateExercise: (updatedExercise: ExerciseType) => void;
   incrementExerciseViewOrder: () => void;
   decrementExerciseViewOrder: () => void;
   updateCurrentExerciseSetViewOrder: (
      updatedCurrentExerciseSetViewOrder: number
   ) => void;
   updateCurrentExerciseViewOrder: (
      updatedCurrentExerciseViewOrder: number
   ) => void;
}

export const useWorkoutCompositionStore = create<WorkoutCompositionStoreProps>(
   (set) => ({
      workoutComposition: {
         workoutName: "",
         exercises: [
            {
               exerciseOrder: 1,
               exerciseName: "",
               exerciseSets: [
                  {
                     exerciseSetOrder: 1,
                     isTimed: false,
                     isDistance: false,
                     isWarmup: false,
                     isBodyweight: false,
                     hasReps: true,
                     reps: 0,
                     weight: 0,
                     weightUnit: "lb",
                     hr: 0,
                     min: 0,
                     sec: 0,
                     distance: 0,
                     distanceUnit: "mi",
                  },
               ],
            },
         ],
      },
      workoutCompositionLoading: false,
      workoutCompositionError: null,
      currentExerciseViewOrder: 1,
      currentExerciseSetViewOrder: 1,
      updateWorkoutComposition: (updatedWorkoutComposition: WorkoutType) => {
         return set({ workoutComposition: updatedWorkoutComposition });
      },
      updateExercise: (updatedExercise: ExerciseType) => {
         console.log(updatedExercise);
         set(({ workoutComposition }) => {
            const updatedExercises = [...workoutComposition.exercises];

            const indexOfUpdatedExercise = updatedExercises.findIndex(
               (exercise) =>
                  exercise.exerciseOrder === updatedExercise.exerciseOrder
            );

            if (indexOfUpdatedExercise === -1) {
               return {
                  workoutComposition,
               };
            }

            updatedExercises.splice(indexOfUpdatedExercise, 1, updatedExercise);

            console.log(updatedExercises);

            const updatedWorkoutComposition = {
               ...workoutComposition,
               exercises: updatedExercises,
            };

            return {
               workoutComposition: updatedWorkoutComposition,
            };
         });
      },
      incrementExerciseViewOrder: () => {
         set(({ workoutComposition, currentExerciseViewOrder }) => {
            if (
               workoutComposition.exercises.length === currentExerciseViewOrder
            ) {
               const latestExercise = workoutComposition.exercises.reduce(
                  (prev, current) =>
                     prev.exerciseOrder > current.exerciseOrder ? prev : current
               );

               const newExercise = {
                  exerciseOrder: latestExercise.exerciseOrder + 1,
                  exerciseName: "",
                  exerciseSets: [
                     {
                        exerciseSetOrder: 1,
                        isTimed: false,
                        isDistance: false,
                        isBodyweight: false,
                        isWarmup: false,
                        hasReps: true,
                        reps: 0,
                        weight: 0,
                        weightUnit: "lb",
                        hr: 0,
                        min: 0,
                        sec: 0,
                        distance: 0,
                        distanceUnit: "mi",
                     },
                  ],
               };

               const updatedExercises = [
                  ...workoutComposition.exercises,
                  newExercise,
               ];

               const updatedWorkoutComposition = {
                  ...workoutComposition,
                  exercises: updatedExercises,
               };

               return {
                  workoutComposition: updatedWorkoutComposition,
                  currentExerciseViewOrder: newExercise.exerciseOrder,
                  currentExerciseSetViewOrder: 1,
               };
            }

            return {
               currentExerciseViewOrder: currentExerciseViewOrder + 1,
               currentExerciseSetViewOrder: 1,
            };
         });
      },
      decrementExerciseViewOrder: () => {
         set(({ workoutComposition, currentExerciseViewOrder }) => {
            if (currentExerciseViewOrder === 1) {
               return {
                  currentExerciseViewOrder: 1,
                  workoutComposition,
               };
            }

            return {
               currentExerciseViewOrder: currentExerciseViewOrder - 1,
               workoutComposition,
            };
         });
      },
      updateCurrentExerciseSetViewOrder: (
         updatedCurrentExerciseSetViewOrder: number
      ) => {
         set(() => ({
            currentExerciseSetViewOrder: updatedCurrentExerciseSetViewOrder,
         }));
      },
      updateCurrentExerciseViewOrder: (
         updatedCurrentExerciseViewOrder: number
      ) => {
         set(() => ({
            currentExerciseViewOrder: updatedCurrentExerciseViewOrder,
         }));
      },
   })
);
