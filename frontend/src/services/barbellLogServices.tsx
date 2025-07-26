const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchGetBarbellLog = async ({
   token,
   workoutId,
   completedWorkoutId,
}: {
   token: string;
   workoutId: string;
   completedWorkoutId?: string;
}) => {
   const params = completedWorkoutId
      ? `${workoutId}/${completedWorkoutId}`
      : `${workoutId}`;
      
   const req = await fetch(`${baseUrl}/barbell-log/${params}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!req.ok) {
      throw new Error("Something went wrong getting barbell log.");
   }

   const res = await req.json();

   return res;
};
