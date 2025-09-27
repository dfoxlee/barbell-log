import { create } from "zustand";
import type { BodyweightReadingType } from "../types/reading.types";

interface ReadingsStoreType {
   bodyweightReadings: BodyweightReadingType[] | null;
   setBodyweightReadings: (bodyweightReadings: BodyweightReadingType[]) => void;
}

export const useReadingsStore = create<ReadingsStoreType>((set) => ({
   bodyweightReadings: null,

   setBodyweightReadings: (bodyweightReadings) => set({ bodyweightReadings }),
}));
