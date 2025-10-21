import { create } from "zustand";
import type { UnitType } from "../types/common.types";

interface UnitStoreType {
   weightUnits: UnitType[] | null;
   distanceUnits: UnitType[] | null;
   setWeightUnits: (weightUnits: UnitType[]) => void;
   setDistanceUnits: (distanceUnits: UnitType[]) => void;
}

export const useUnitStore = create<UnitStoreType>((set) => ({
   weightUnits: null,
   distanceUnits: null,

   setWeightUnits: (weightUnits) => set({ weightUnits }),

   setDistanceUnits: (distanceUnits) => set({ distanceUnits }),
}));
