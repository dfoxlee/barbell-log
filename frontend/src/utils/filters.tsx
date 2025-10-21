import { exerciseNames } from "../constants/exercises";

export const filterExerciseSuggestions = (inputValue: string): string[] => {
   const trimmedInput = inputValue.toLowerCase().trim();
   if (!trimmedInput) {
      return [];
   }

   const searchTerms = trimmedInput
      .split(/\s+/)
      .filter((term) => term.length > 0);

   if (searchTerms.length === 0) {
      return [];
   }

   return exerciseNames.filter((name) => {
      const lowerCaseName = name.toLowerCase();
      return searchTerms.every((term) => lowerCaseName.includes(term));
   });
};
