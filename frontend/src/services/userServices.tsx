const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL;

export const fetchSignUp = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const signUpRequest = await fetch(`${baseUrl}/users/sign-up`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email,
         password,
      }),
   });

   const signUpResponse = await signUpRequest.json();

   return signUpResponse;
};

export const fetchLogin = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const loginRequest = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email: email,
         password: password,
      }),
   });

   const loginResponse = await loginRequest.json();

   return loginResponse.user;
};

export const fetchUpdateWeightUnitPreference = async ({
   token,
   weightUnitPreference,
}: {
   token: string;
   weightUnitPreference: string;
}) => {
   const weightUnitRequest = await fetch(
      `${baseUrl}/users/update-unit-preferences`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            weightUnitPreference,
         }),
      }
   );

   const weightUnitResponse = await weightUnitRequest.json();

   return weightUnitResponse;
};

export const fetchUpdateDistanceUnitPreference = async ({
   token,
   distanceUnitPreference,
}: {
   token: string;
   distanceUnitPreference: string;
}) => {
   const weightUnitRequest = await fetch(
      `${baseUrl}/users/update-unit-preferences`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            distanceUnitPreference,
         }),
      }
   );

   const weightUnitResponse = await weightUnitRequest.json();

   return weightUnitResponse;
};
