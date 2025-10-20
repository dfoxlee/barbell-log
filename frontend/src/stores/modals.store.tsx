import { create } from "zustand";
import type { MetricType } from "../types/nutrient.types";

interface ModalsStoreType {
   deleteConfirmationWindowInfo: {
      onCancel: () => void;
      onConfirm: () => void;
      message: string;
   } | null;
   filterMacrosModalOpen: boolean;
   selectedMetrics: MetricType[];
   viewWorkoutDetailsId: number | null;
   viewCompletedWorkoutDetailsId: number | null;
   toggleMetric: (metric: MetricType) => void;
   setDeleteConfirmationWindowInfo: (
      deleteConfirmationWindowInfo: {
         onCancel: () => void;
         onConfirm: () => void;
         message: string;
      } | null
   ) => void;
   toggleFilterMacrosModalOpen: () => void;
   setViewWorkoutDetailsId: (workoutId: number | null) => void;
   setViewCompletedWorkoutDetailsId: (
      completedWorkoutId: number | null
   ) => void;
}

export const useModalsStore = create<ModalsStoreType>((set, get) => ({
   deleteConfirmationWindowInfo: null,
   filterMacrosModalOpen: false,
   selectedMetrics: [
      { key: "totalCalories", label: "Calories (kcal)", unit: "kcal" },
      { key: "totalProtein", label: "Protein (g)", unit: "g" },
      { key: "totalCarbohydrates", label: "Carbohydrates (g)", unit: "g" },
   ],
   viewWorkoutDetailsId: null,
   viewCompletedWorkoutDetailsId: null,

   toggleMetric: (metric) => {
      const currentMetrics = get().selectedMetrics;

      if (currentMetrics.find((m) => m.key === metric.key)) {
         return set({
            selectedMetrics: currentMetrics.filter((m) => m.key !== metric.key),
         });
      }

      return set({
         selectedMetrics: [...currentMetrics, metric],
      });
   },

   setDeleteConfirmationWindowInfo: (deleteConfirmationWindowInfo) =>
      set({ deleteConfirmationWindowInfo }),
   toggleFilterMacrosModalOpen: () =>
      set(({ filterMacrosModalOpen }) => ({
         filterMacrosModalOpen: !filterMacrosModalOpen,
      })),
   setViewWorkoutDetailsId: (workoutId) =>
      set({ viewWorkoutDetailsId: workoutId }),
   setViewCompletedWorkoutDetailsId: (completedWorkoutId) =>
      set({ viewCompletedWorkoutDetailsId: completedWorkoutId }),
}));
