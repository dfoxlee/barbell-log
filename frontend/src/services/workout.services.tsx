import type { WorkoutType } from "../types/workout.types";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchCreateWorkout = async ({
   token,
   workout,
}: {
   token: string;
   workout: WorkoutType;
}) => {
   const createWorkoutRequest = await fetch(`${baseUrl}/workouts`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workout }),
   });

   if (!createWorkoutRequest.ok) {
      throw new Error("An error occurred creating the workout.");
   }

   return;
};

export const fetchGetWorkouts = async ({ token }: { token: string }) => {
   const request = await fetch(`${baseUrl}/workouts`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("An error occurred creating the workout.");
   }

   const data = await request.json();

   return data;
};

export const fetchGetWorkout = async ({
   token,
   workoutId,
}: {
   token: string;
   workoutId: number;
}) => {
   const request = await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("An error occurred creating the workout.");
   }

   const data = await request.json();

   return data;
};

export const fetchUpdateWorkout = async ({
   token,
   workout,
}: {
   token: string;
   workout: WorkoutType;
}) => {
   const request = await fetch(`${baseUrl}/workouts`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workout }),
   });

   if (!request.ok) {
      throw new Error("An error occurred creating the workout.");
   }

   const data = await request.json();

   return data;
};

export const fetchDeleteWorkout = async ({
   token,
   workoutId,
}: {
   token: string;
   workoutId: number;
}) => {
   const request = await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!request.ok) {
      throw new Error("An error occurred deleting the workout.");
   }

   const data = await request.json();

   return data;
};
