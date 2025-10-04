const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchGetBodyweightReadings = async ({
   token,
}: {
   token: string;
}) => {
   const request = await fetch(`${baseUrl}/readings/bodyweight`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("An error occurred getting bodyweight readings");
   }

   const data = await request.json();

   return data;
};

export const fetchAddBodyweightReading = async ({
   token,
   bodyweightReading,
   unitId,
}: {
   token: string;
   bodyweightReading: number;
   unitId: number;
}) => {
   const body = JSON.stringify({
      bodyweightReading,
      unitId,
   });

   const request = await fetch(`${baseUrl}/readings/bodyweight`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body,
   });

   if (!request.ok) {
      throw new Error("An error occurred while adding a bodyweight reading.");
   }

   return;
};

export const fetchUpdateBodyweightReading = async ({
   token,
   bodyweightReadingId,
   bodyweight,
   weightUnit,
}: {
   token: string;
   bodyweightReadingId: number;
   bodyweight: number;
   weightUnit: number;
}) => {
   const body = JSON.stringify({
      bodyweightReadingId,
      bodyweight,
      weightUnit,
   });

   const request = await fetch(`${baseUrl}/readings/bodyweight`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body,
   });

   if (!request.ok) {
      throw new Error("An error occurred while adding a bodyweight reading.");
   }

   return;
};

export const fetchDeleteBodyweightReading = async ({
   token,
   bodyweightReadingId,
}: {
   token: string;
   bodyweightReadingId: number;
}) => {
   const request = await fetch(`${baseUrl}/readings/bodyweight`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bodyweightReadingId }),
   });

   if (!request.ok) {
      throw new Error("An error occurred while adding a bodyweight reading.");
   }

   return;
};

export const fetchDeleteAllBodyweightReadings = async ({ token }) => {
   const request = await fetch(`${baseUrl}/readings/bodyweight/all`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("An error occurred while adding a bodyweight reading.");
   }

   return;
};
