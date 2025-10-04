const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchGetNewCompletedWorkout = async ({ token, workoutId }) => {
   const request = await fetch(`${baseUrl}/completed-workouts/${workoutId}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("An error occurred getting new completed workout");
   }

   const data = await request.json();

   return data;
};
