// import { distanceUnits, weightUnits } from "../enums/constants";
import type { CompletedExerciseType } from "../types/barbellLogTypes";
import type { ExerciseSetType } from "../types/workoutTypes";

const rwtdCellFormat = (set: ExerciseSetType | CompletedExerciseType) => {
   // Use nullish coalescing so 0 is not treated as falsy
   const reps =
      "reps" in set
         ? set.reps ?? ""
         : "completedReps" in set
         ? set.completedReps ?? ""
         : "";
   const hasReps = "hasReps" in set ? set.hasReps ?? false : false;
   const weight =
      "weight" in set
         ? set.weight ?? ""
         : "completedWeight" in set
         ? set.completedWeight ?? ""
         : "";
   const weightUnit =
      "weightUnit" in set
         ? set.weightUnit ?? ""
         : "completedWeightUnit" in set
         ? set.completedWeightUnit ?? ""
         : "";
   const isBodyweight =
      "isBodyweight" in set ? set.isBodyweight ?? false : false;
   const distance =
      "distance" in set
         ? set.distance ?? ""
         : "completedDistance" in set
         ? set.completedDistance ?? ""
         : "";
   const distanceUnit =
      "distanceUnit" in set
         ? set.distanceUnit ?? ""
         : "completedDistanceUnit" in set
         ? set.completedDistanceUnit ?? ""
         : "";
   const isDistance = "isDistance" in set ? set.isDistance ?? false : false;
   const hr =
      "hr" in set
         ? set.hr ?? 0
         : "completedHr" in set
         ? set.completedHr ?? 0
         : 0;
   const min =
      "min" in set
         ? set.min ?? 0
         : "completedMin" in set
         ? set.completedMin ?? 0
         : 0;
   const sec =
      "sec" in set
         ? set.sec ?? 0
         : "completedSec" in set
         ? set.completedSec ?? 0
         : 0;
   const isTimed = "isTimed" in set ? set.isTimed ?? false : false;

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
