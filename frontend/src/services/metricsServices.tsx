const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchAddBodyweightReading = async ({
   token,
   bodyweightReading,
}: {
   token: string;
   bodyweightReading: number;
}) => {
   const req = await fetch(`${baseUrl}/metrics/bodyweight`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bodyweight: bodyweightReading }),
   });

   const res = await req.json();

   return res;
};

export const fetchAddNutritionMetric = async ({
   token,
   nutritionMetric,
}: {
   token: string;
   nutritionMetric: {
      nutritionId?: string;
      description: string;
      energy: number;
      protein: number;
      totalFat: number;
      carbohydrates: number;
      fiber: number;
      totalSugar: number;
      addedSugar: number;
      cholesterol: number;
      sodium: number;
   };
}) => {
   const req = await fetch(`${baseUrl}/metrics/nutrition`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nutritionMetric),
   });

   if (!req.ok) {
      throw new Error("Something went wrong adding nutrition metric.");
   }

   const res = await req.json();

   return res;
};

export const fetchGetNutritionMetrics = async ({ token }) => {
   const req = await fetch(`${baseUrl}/metrics/nutrition`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!req.ok) {
      throw new Error("Something went wrong getting nutrition metrics.");
   }

   const res = await req.json();

   return res;
};

export const fetchGetNutritionSearch = async ({ token, searchValue }) => {
   const req = await fetch(
      `${baseUrl}/metrics/nutrition/search?searchValue=${searchValue}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!req.ok) {
      throw new Error("Something went wrong getting nutrition search results.");
   }

   const res = await req.json();

   return res;
};

export const fetchGetBodyweightReadings = async ({ token }) => {
   const req = await fetch(`${baseUrl}/metrics/bodyweight`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!req.ok) {
      throw new Error("Something went wrong getting bodyweight readings.");
   }

   const res = await req.json();

   return res;
};
