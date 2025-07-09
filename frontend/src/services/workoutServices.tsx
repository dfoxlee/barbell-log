import type { WorkoutCompositionStateType } from "../types/types";
const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

const fetchCreateWorkout = async ({
   workout,
   token,
}: {
   workout: WorkoutCompositionStateType;
   token: string;
}) => {
   const req = await fetch(`${baseUrl}/workouts/create`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workout }),
   });

   const res = await req.json();

   return res;
};

const fetchUpdateWorkout = async ({
   workout,
   token,
   workoutId,
}: {
   workout: WorkoutCompositionStateType;
   token: string;
   workoutId: string;
}) => {
   const req = await fetch(`${baseUrl}/workouts/update`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workout }),
   });

   const res = await req.json();

   return res;
};

const fetchGetWorkouts = async ({ token }: { token: string }) => {
   const req = await fetch(`${baseUrl}/workouts`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const res = await req.json();

   return res;
};

const fetchGetWorkout = async ({ token, workoutId }) => {
   const req = await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const res = await req.json();

   return res;
};

const fetchDeleteWorkout = async ({ token, workoutId }) => {
   return await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });
};

export {
   fetchCreateWorkout,
   fetchUpdateWorkout,
   fetchGetWorkouts,
   fetchGetWorkout,
   fetchDeleteWorkout,
};
