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

   if (!signUpRequest.ok) {
      if (signUpResponse.error) {
         throw new Error(signUpResponse.message);
      }

      throw new Error("Internal server error.");
   }

   return signUpResponse.user;
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

   if (!loginRequest.ok) {
      if (loginResponse.error) {
         throw new Error(loginResponse.message);
      }

      throw new Error("Internal server error.");
   }

   return loginResponse.user;
};

export const fetchUpdateWeightPreference = async ({
   token,
   weightUnitPreference,
}) => {
   return await fetch(`${baseUrl}/users/update-weight-preference`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
         weightUnitPreference,
      }),
   });
};
