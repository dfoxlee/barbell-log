import type { NutritionInfo } from "../types/nutrient.types";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchGetNutritionSearchResults = async ({
   query,
   token,
}: {
   query: string;
   token: string;
}) => {
   const response = await fetch(
      `${baseUrl}/nutrition/food-search/?query=${encodeURIComponent(query)}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!response.ok) {
      throw new Error("Failed to fetch nutrition search results");
   }

   const data = await response.json();

   return data;
};

export const fetchCreateNutritionReading = async ({
   token,
   nutritionReading,
}: {
   token: string;
   nutritionReading: NutritionInfo;
}) => {
   const response = await fetch(`${baseUrl}/nutrition`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nutritionReading }),
   });

   if (!response.ok) {
      throw new Error("An error occurred saving nutrition reading.");
   }

   return;
};

export const fetchGetNutritionReading = async ({
   token,
   nutritionReadingId,
}: {
   token: string;
   nutritionReadingId: number;
}) => {
   const response = await fetch(`${baseUrl}/nutrition/reading`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nutritionReadingId }),
   });

   if (!response.ok) {
      throw new Error("An error occurred saving nutrtion");
   }

   const data = await response.json();

   return data;
};

export const fetchGetNutritionReadings = async ({
   token,
}: {
   token: string;
}) => {
   const response = await fetch(`${baseUrl}/nutrition/readings`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      throw new Error("An error occurred getting readings.");
   }

   const data = await response.json();

   return data;
};

export const fetchGetGroupedNutritionReadings = async ({
   token,
}: {
   token: string;
}) => {
   const response = await fetch(`${baseUrl}/nutrition/grouped-readings`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      throw new Error("An error occurred getting readings.");
   }

   const data = await response.json();

   return data;
};
