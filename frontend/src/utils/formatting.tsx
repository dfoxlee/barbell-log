// import { distanceUnits, weightUnits } from "../enums/constants";
import type { CompletedExerciseType } from "../types/barbellLogTypes";
import type { ExerciseSetType } from "../types/workoutTypes";

const rwtdCellFormat = (set: ExerciseSetType | CompletedExerciseType) => {
   const reps = set.reps || set.completedReps;
   const hasReps = set.hasReps;
   const weight = set.weight || set.completedWeight;
   const weightUnit = set.weightUnit || set.completedWeightUnit;
   const isBodyweight = set.isBodyweight;
   const distance = set.distance || set.completedDistance;
   const distanceUnit = set.distanceUnit || set.completedDistanceUnit;
   const isDistance = set.isDistance;
   const hr = set.hr || set.completedHr;
   const min = set.min || set.completedMin;
   const sec = set.sec || set.completedSec;
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
