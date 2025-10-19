import type { CompletedWorkoutType } from "../types/completed-workout.types";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchGetNewCompletedWorkout = async ({
   token,
   workoutId,
}: {
   token: string;
   workoutId: string;
}) => {
   const request = await fetch(
      `${baseUrl}/completed-workouts/create/${workoutId}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!request.ok) {
      throw new Error("An error occurred getting new completed workout");
   }

   const data = await request.json();

   return data;
};

export const fetchGetCompletedWorkouts = async ({
   token,
}: {
   token: string;
}) => {
   const request = await fetch(`${baseUrl}/completed-workouts`, {
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

export const fetchGetCompletedWorkoutById = async ({
   token,
   completedWorkoutId,
}: {
   token: string;
   completedWorkoutId: string;
}) => {
   const request = await fetch(
      `${baseUrl}/completed-workouts/${completedWorkoutId}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!request.ok) {
      throw new Error("An error occurred getting new completed workout");
   }

   const data = await request.json();

   return data;
};

export const fetchAddCompletedWorkout = async ({
   token,
   completedWorkout,
}: {
   token: string;
   completedWorkout: CompletedWorkoutType;
}) => {
   const request = await fetch(`${baseUrl}/completed-workouts`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkout }),
   });

   if (!request.ok) {
      throw new Error("An error occurred getting new completed workout");
   }

   return;
};

export const fetchUpdateCompletedWorkout = async ({
   token,
   completedWorkout,
}: {
   token: string;
   completedWorkout: CompletedWorkoutType;
}) => {
   const request = await fetch(`${baseUrl}/completed-workouts`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkout }),
   });

   if (!request.ok) {
      throw new Error("An error occurred getting new completed workout");
   }

   return;
};

export const fetchDeleteCompletedWorkout = async ({
   token,
   completedWorkoutId,
}: {
   token: string;
   completedWorkoutId: string;
}) => {
   const request = await fetch(
      `${baseUrl}/completed-workouts/${completedWorkoutId}`,
      {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!request.ok) {
      throw new Error("An error occurred getting new completed workout");
   }

   return;
};
