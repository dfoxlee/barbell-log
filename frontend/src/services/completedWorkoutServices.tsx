const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

const fetchCreateCompletedWorkout = async ({ workout, token }) => {
   const req = await fetch(`${baseUrl}/completed-workouts/create`, {
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

const fetchGetCompletedWorkout = async ({ token, completedWorkoutId }) => {
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

const fetchGetCompletedWorkouts = async ({ token }) => {
   const req = await fetch(`${baseUrl}/completed-workouts`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const res = await req.json();

   return res;
};

const fetchGetWeeklyCompletedWorkouts = async ({ token }) => {
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

const fetchUpdateCompletedWorkout = async ({ token, completedWorkout }) => {
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

const fetchDeleteCompeletedWorkout = async ({ token, completedWorkoutId }) => {
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

export {
   fetchCreateCompletedWorkout,
   fetchGetCompletedWorkouts,
   fetchGetCompletedWorkout,
   fetchGetWeeklyCompletedWorkouts,
   fetchUpdateCompletedWorkout,
   fetchDeleteCompeletedWorkout,
};
