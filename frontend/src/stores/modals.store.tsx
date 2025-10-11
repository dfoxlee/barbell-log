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
   toggleMetric: (metric: MetricType) => void;
   setDeleteConfirmationWindowInfo: (
      deleteConfirmationWindowInfo: {
         onCancel: () => void;
         onConfirm: () => void;
         message: string;
      } | null
   ) => void;
   toggleFilterMacrosModalOpen: () => void;
}

export const useModalsStore = create<ModalsStoreType>((set, get) => ({
   deleteConfirmationWindowInfo: null,
   filterMacrosModalOpen: false,
   selectedMetrics: [
      { key: "totalCalories", label: "Calories (kcal)", unit: "kcal" },
      { key: "totalProtein", label: "Protein (g)", unit: "g" },
      { key: "totalCarbohydrates", label: "Carbohydrates (g)", unit: "g" },
   ],

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
}));
