import type { UnitType } from "../types/common.types";
import type { CompletedExerciseSetType } from "../types/completed-exercise-set.types";
import type { ExerciseSetType } from "../types/exercise-set.types";

export const dateFormat = (date: Date) => {
   const newDate = new Date(date);
   const year = newDate.getFullYear();
   const month = newDate.getMonth();
   const day = newDate.getDate();

   return `${month}/${day}/${year}`;
};

const formatNumberForDisplay = (num: number) => {
   if (num % 1 === 0) {
      return parseInt(num.toString());
   }

   return num.toString();
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

   if (exerciseSet.hasReps && exerciseSet.weight > 0) {
      text += " X ";
   }

   if (exerciseSet.weight > 0) {
      const formattedWeight = formatNumberForDisplay(exerciseSet.weight);
      const weightAbbreviation = weightUnits.find(
         (unit) => unit.unitId === exerciseSet.weightUnit
      )?.unitAbbreviation;

      text = text + `${formattedWeight} ${weightAbbreviation}`;
   }

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
               ? ` 0${exerciseSet.sec} sec`
               : ` ${exerciseSet.sec} sec`;
      }
   }

   if (exerciseSet.isDistance) {
      const formattedDistance = formatNumberForDisplay(exerciseSet.distance);
      const distanceAbbreviation = distanceUnits.find(
         (unit) => unit.unitId === exerciseSet.distanceUnit
      )?.unitAbbreviation;

      text += ` ${formattedDistance} ${distanceAbbreviation}`;
   }

   return text;
};

export const completedExerciseSetFormat = ({
   completedExerciseSet,
   weightUnits,
   distanceUnits,
}: {
   completedExerciseSet: CompletedExerciseSetType;
   weightUnits: UnitType[];
   distanceUnits: UnitType[];
}) => {
   let text = ``;

   if (completedExerciseSet.hadReps) {
      text = text + completedExerciseSet.completedReps;
   }

   if (
      completedExerciseSet.hadReps &&
      completedExerciseSet.completedWeight > 0
   ) {
      text += " X ";
   }

   if (completedExerciseSet.completedWeight > 0) {
      const formattedWeight = formatNumberForDisplay(
         completedExerciseSet.completedWeight
      );
      const weightAbbreviation = weightUnits.find(
         (unit) => unit.unitId === completedExerciseSet.completedWeightUnit
      )?.unitAbbreviation;

      text = text + `${formattedWeight} ${weightAbbreviation}`;
   }

   if (completedExerciseSet.wasTimed) {
      if (completedExerciseSet.completedHr > 0) {
         text += ` ${completedExerciseSet.completedHr}:`;
         text +=
            completedExerciseSet.completedMin < 10
               ? `0${completedExerciseSet.completedMin}:`
               : `${completedExerciseSet.completedMin}:`;
         text +=
            completedExerciseSet.completedSec < 10
               ? `0${completedExerciseSet.completedSec}`
               : `${completedExerciseSet.completedSec}`;
      } else if (completedExerciseSet.completedMin > 0) {
         text += ` ${completedExerciseSet.completedMin}:`;
         text +=
            completedExerciseSet.completedSec < 10
               ? `0${completedExerciseSet.completedSec}`
               : `${completedExerciseSet.completedSec}`;
      } else {
         text +=
            completedExerciseSet.completedSec < 10
               ? ` 0${completedExerciseSet.completedSec} sec`
               : ` ${completedExerciseSet.completedSec} sec`;
      }
   }

   if (completedExerciseSet.wasDistance) {
      text += ` ${completedExerciseSet.completedDistance} ${
         distanceUnits.find(
            (unit) => unit.unitId === completedExerciseSet.completedDistanceUnit
         )?.unitAbbreviation
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

   const ss = String(seconds).padStart(2, "0");
   const mm = String(minutes).padStart(2, "0");

   if (hours > 0) {
      const hh = String(hours).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
   }

   return `${mm}:${ss}`;
};
