export interface UserType {
   token: string;
   weightUnitPreference: string;
   distanceUnitPreference: string;
}

export interface UnitType {
   unitId: number;
   unitName: string;
   unitAbbreviation: string;
}

export interface UnitPreferenceType {
   refCodeId: number;
   refCodeDomainId: number;
   refCodeName: string;
   refCodeAbbreviation: string;
}

export interface WorkoutTypeType {
   workoutTypeId: number;
   workoutType: string;
}
