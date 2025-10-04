import type { UnitType } from "../types/common.types";
import type { ExerciseSetType } from "../types/exercise-set.types";

export const dateFormat = (date: Date) => {
   const newDate = new Date(date);
   const year = newDate.getFullYear();
   const month = newDate.getMonth();
   const day = newDate.getDate();

   return `${month}/${day}/${year}`;
};

export const exerciseSetFormat = ({
   exerciseSet,
   weightUnits,
   distanceUnits,
}: {
   exerciseSet: ExerciseSetType;
   weightUnits: UnitType[];
   distanceUnits: UnitType[];
}) => {
   let text = ``;

   if (exerciseSet.hasReps) {
      text = text + exerciseSet.reps;
   }

   text =
      text +
      ` X ${exerciseSet.weight} ${
         weightUnits.find((unit) => unit.unitId === exerciseSet.weightUnit)
            ?.unitAbbreviation
      }`;

   if (exerciseSet.isTimed) {
      if (exerciseSet.hr > 0) {
         text += ` ${exerciseSet.hr}:`;
         text +=
            exerciseSet.min < 10
               ? `0${exerciseSet.min}:`
               : `${exerciseSet.min}:`;
         text +=
            exerciseSet.sec < 10 ? `0${exerciseSet.sec}` : `${exerciseSet.sec}`;
      } else if (exerciseSet.min > 0) {
         text += ` ${exerciseSet.min}:`;
         text +=
            exerciseSet.sec < 10 ? `0${exerciseSet.sec}` : `${exerciseSet.sec}`;
      } else {
         text +=
            exerciseSet.sec < 10
               ? ` 0${exerciseSet.sec}`
               : ` ${exerciseSet.sec}`;
      }
   }

   if (exerciseSet.isDistance) {
      text += ` ${exerciseSet.distance} ${
         distanceUnits.find((unit) => unit.unitId === exerciseSet.distanceUnit)
            ?.unitAbbreviation
      }`;
   }

   return text;
};

export const formatNutritionSearchResult = (result) => {
   let text = "";

   if (result.brandOwner && result.brandName) {
      text += `${result.brandOwner} - ${result.brandName} - ${result.description} (USDA type: ${result.dataType})`;
   } else if (result.brandName) {
      text += `${result.brandName} - ${result.description} (USDA type: ${result.dataType})`;
   } else {
      text += `${result.description} (USDA type: ${result.dataType})`;
   }

   return text;
};

export const formatTime = (totalSeconds: number): string => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return "00:00";
    }

    totalSeconds = Math.floor(totalSeconds);

    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    const ss = String(seconds).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    
    if (hours > 0) {
        const hh = String(hours).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }

    return `${mm}:${ss}`;
};