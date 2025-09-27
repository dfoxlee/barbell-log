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
