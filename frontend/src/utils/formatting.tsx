// import { distanceUnits, weightUnits } from "../enums/constants";
import type { ExerciseSetType } from "../types/workoutTypes";

const rwtdCellFormat = (set: ExerciseSetType) => {
   const reps = set.reps;
   const hasReps = set.hasReps;
   const weight = set.weight;
   const weightUnit = set.weightUnit;
   const isBodyweight = set.isBodyweight;
   const distance = set.distance;
   const distanceUnit = set.distanceUnit;
   const isDistance = set.isDistance;
   const hr = set.hr;
   const min = set.min;
   const sec = set.sec;
   const isTimed = set.isTimed;

   let rwtdText = "";

   if (hasReps) {
      if (isBodyweight) {
         rwtdText += `${reps} x BW`;
      } else {
         rwtdText += `${reps} x ${weight} ${weightUnit}`;
      }
   } else {
      if (isBodyweight) {
         rwtdText += `BW`;
      } else {
         rwtdText += `${weight} ${weightUnit}`;
      }
   }

   if (isTimed) {
      rwtdText += ` | ${hr > 9 ? hr : `0${hr}`}:${min > 9 ? min : `0${min}`}:${
         sec > 9 ? sec : `0${sec}`
      }`;
   }

   if (isDistance) {
      rwtdText += ` | ${distance} ${distanceUnit}`;
   }
   return rwtdText;
};

const dateFormat = (date: Date) => {
   const newDate = new Date(date);
   const year = newDate.getFullYear();
   const month = newDate.getMonth();
   const day = newDate.getDate();

   return `${month}/${day}/${year}`;
};

export { rwtdCellFormat, dateFormat };
