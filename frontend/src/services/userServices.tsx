export const fetchSignUp = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const signUpRequest = await fetch(
      "http://localhost:8008/api/v1/users/sign-up",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password,
         }),
      }
   );

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
   const loginRequest = await fetch(
      "http://localhost:8008/api/v1/users/login",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      }
   );

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
   return await fetch(
      "http://localhost:8008/api/v1/users/update-weight-preference",
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
};
