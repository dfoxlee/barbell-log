const fetchCreateCompletedWorkout = async ({ workout, token }) => {
   const req = await fetch(
      "http://localhost:8008/api/v1/completed-workouts/create",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ workout }),
      }
   );

   const res = await req.json();

   return res;
};

const fetchGetCompletedWorkout = async ({ token, completedWorkoutId }) => {
   const fetchCompletedworkoutRequest = await fetch(
      `http://localhost:8008/api/v1/completed-workouts/${completedWorkoutId}`,
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
   const req = await fetch("http://localhost:8008/api/v1/completed-workouts/", {
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
   const req = await fetch(
      "http://localhost:8008/api/v1/completed-workouts/weekly-breakdown",
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

const fetchUpdateCompletedWorkout = async ({ token, completedWorkout }) => {
   const req = await fetch(
      "http://localhost:8008/api/v1/completed-workouts/update",
      {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ completedWorkout }),
      }
   );

   const res = await req.json();

   return res;
};

const fetchDeleteCompeletedWorkout = async ({ token, completedWorkoutId }) => {
   console.log(token, completedWorkoutId);
   const req = await fetch(`http://localhost:8008/api/v1/completed-workouts/`, {
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
