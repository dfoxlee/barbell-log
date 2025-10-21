import { create } from "zustand";
import type { BodyweightReadingType } from "../types/reading.types";
import type {
   GroupedNutritionInfo,
   NutritionInfo,
} from "../types/nutrient.types";

interface ReadingsStoreType {
   bodyweightReadings: BodyweightReadingType[] | null;
   nutritionReadings: NutritionInfo[] | null;
   groupedNutritionReadings: GroupedNutritionInfo[] | null;
   setBodyweightReadings: (bodyweightReadings: BodyweightReadingType[]) => void;
   setNutritionReadings: (nutritionReadings: NutritionInfo[]) => void;
   setGroupedNutritionReadings: (
      groupedNutritionReadings: GroupedNutritionInfo[]
   ) => void;
}

export const useReadingsStore = create<ReadingsStoreType>((set) => ({
   bodyweightReadings: null,
   nutritionReadings: null,
   groupedNutritionReadings: null,

   setBodyweightReadings: (bodyweightReadings) => set({ bodyweightReadings }),
   setNutritionReadings: (nutritionReadings) => set({ nutritionReadings }),
   setGroupedNutritionReadings: (groupedNutritionReadings) =>
      set({ groupedNutritionReadings }),
}));
