import type { CompletedWorkoutType } from "../types/completedWorkoutTypes";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchCreateCompletedWorkout = async ({
   completedWorkout,
   token,
}: {
   completedWorkout: CompletedWorkoutType;
   token: string;
}) => {
   const req = await fetch(`${baseUrl}/completed-workouts/create`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkout }),
   });

   const res = await req.json();

   return res;
};

export const fetchGetNewCompletedWorkout = async ({
   workoutId,
   token,
}: {
   workoutId: string;
   token: string;
}) => {
   console.log("workoutId, token", workoutId, token);
   const request = await fetch(
      `${baseUrl}/completed-workouts/new/${workoutId}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   console.log(request);
   if (!request.ok) {
      throw new Error("Something went wrong getting new completed workout.");
   }

   const body = await request.json();
   console.log(body);

   return body;
};

export const fetchGetCompletedWorkout = async ({
   token,
   completedWorkoutId,
}: {
   token: string;
   completedWorkoutId: string;
}) => {
   const fetchCompletedworkoutRequest = await fetch(
      `${baseUrl}/completed-workouts/${completedWorkoutId}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   const data = await fetchCompletedworkoutRequest.json();

   return data;
};

export const fetchGetCompletedWorkouts = async ({
   token,
   skip,
   take,
}: {
   token: string;
   skip: number;
   take: number;
}) => {
   const req = await fetch(
      `${baseUrl}/completed-workouts?skip=${skip}&take=${take}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   const res = await req.json();

   return res;
};

export const fetchGetWeeklyCompletedWorkouts = async ({
   token,
}: {
   token: string;
}) => {
   const req = await fetch(`${baseUrl}/completed-workouts/weekly-breakdown`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const res = await req.json();

   return res;
};

export const fetchUpdateCompletedWorkout = async ({
   token,
   completedWorkout,
}: {
   token: string;
   completedWorkout: CompletedWorkoutType;
}) => {
   const req = await fetch(`${baseUrl}/completed-workouts/update`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkout }),
   });

   const res = await req.json();

   return res;
};

export const fetchDeleteCompeletedWorkout = async ({
   token,
   completedWorkoutId,
}: {
   token: string;
   completedWorkoutId: string;
}) => {
   const req = await fetch(`${baseUrl}/completed-workouts`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkoutId }),
   });

   const res = await req.json();

   return res;
};
