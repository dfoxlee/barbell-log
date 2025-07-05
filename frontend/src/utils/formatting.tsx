import { distanceUnits, weightUnits } from "../enums/constants";

const rwtdCellFormat = (set) => {
   const reps = set.reps;
   const isReps = set.isReps;
   const weight = set.weight;
   const weightUnit = weightUnits.find(
      (unit) => unit.id === parseInt(set.weightUnit)
   )
      ? weightUnits.find((unit) => unit.id === parseInt(set.weightUnit))?.label
      : "";
   const isBodyweight = set.isBodyweight;
   const distance = set.distance;
   const distanceUnit = distanceUnits.find(
      (unit) => unit.id === parseInt(set.distanceUnit)
   )
      ? distanceUnits.find((unit) => unit.id === parseInt(set.distanceUnit))
           ?.label
      : "";
   const isDistance = set.isDistance;
   const isBar = set.isBar;
   const isDumbbell = set.isDumbbell;
   const hr = set.hr;
   const min = set.min;
   const sec = set.sec;
   const isTimed = set.isTimed;

   let rwtdText = "";

   if (isReps) {
      if (isDumbbell) {
         rwtdText += `${reps} x ${weight} ${weightUnit}/DB`;
      } else if (isBodyweight) {
         rwtdText += `${reps} x BW`;
      } else if (isBar) {
         rwtdText += `${reps} x bar`;
      } else {
         rwtdText += `${reps} x ${weight} ${weightUnit}`;
      }
   } else {
      if (isDumbbell) {
         rwtdText += `${weight} ${weightUnit}/DB`;
      } else if (isBodyweight) {
         rwtdText += `BW`;
      } else if (isBar) {
         rwtdText += `bar`;
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
