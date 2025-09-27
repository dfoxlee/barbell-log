const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchGetWeightUnits = async ({ token }: { token: string }) => {
   const request = await fetch(`${baseUrl}/common/weight-units`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("Something went wrong getting weight units.");
   }

   const data = await request.json();

   return data;
};

export const fetchGetDistanceUnits = async ({ token }: { token: string }) => {
   const request = await fetch(`${baseUrl}/common/distance-units`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("Something went wrong getting weight units.");
   }

   const data = await request.json();

   return data;
};

export const fetchGetWorkoutTypes = async ({ token }: { token: string }) => {
   const request = await fetch(`${baseUrl}/common/workout-types`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("Something went wrong getting weight units.");
   }

   const data = await request.json();

   return data;
};
