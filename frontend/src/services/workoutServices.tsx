import type { WorkoutType } from "../types/workoutTypes";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchCreateWorkout = async ({
   workoutComposition,
   token,
}: {
   workoutComposition: WorkoutType;
   token: string;
}) => {
   const req = await fetch(`${baseUrl}/workouts/create`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workoutComposition }),
   });

   const res = await req.json();

   return res;
};

export const fetchUpdateWorkout = async ({
   workoutComposition,
   token,
}: {
   workoutComposition: WorkoutType;
   token: string;
}) => {
   const req = await fetch(`${baseUrl}/workouts/update`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workoutComposition }),
   });

   const res = await req.json();

   return res;
};

export const fetchGetWorkouts = async ({ token }: { token: string }) => {
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

export const fetchGetWorkout = async ({
   token,
   workoutId,
}: {
   token: string;
   workoutId: string;
}) => {
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

export const fetchDeleteWorkout = async ({
   token,
   workoutId,
}: {
   token: string;
   workoutId: string;
}) => {
   return await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });
};
