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

   if (!signUpRequest.ok) {
      const errorMessage = await signUpRequest.json();
      if (errorMessage && errorMessage.message) {
         throw new Error(errorMessage.message);
      } else {
         throw new Error("Something went wrong signing up user.");
      }
   }

   return;
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

   if (!loginRequest.ok) {
      throw new Error("An error occurred during login.");
   }

   const loginResponse = await loginRequest.json();

   return loginResponse;
};

export const fetchUpdateUnitPreference = async ({
   token,
   weightUnitPreference,
   distanceUnitPreference,
}: {
   token: string;
   weightUnitPreference: number;
   distanceUnitPreference: number;
}) => {
   const unitUpdateRequest = await fetch(
      `${baseUrl}/users/update-unit-preference`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            weightUnitPreference,
            distanceUnitPreference,
         }),
      }
   );

   if (!unitUpdateRequest.ok) {
      throw new Error("An error occurred during login.");
   }

   return;
};

export const fetchUpdatePassword = async ({
   token,
   newPassword,
}: {
   token: string;
   newPassword: string;
}) => {
   const req = await fetch(`${baseUrl}/users/update-password`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
         newPassword,
      }),
   });

   if (!req.ok) {
      throw new Error("An error occurred while updating the password.");
   }

   return;
};

export const fetchValidateEmailToken = async ({
   validationToken,
}: {
   validationToken: string;
}) => {
   const verificationRequest = await fetch(
      `${baseUrl}/users/${validationToken}`
   );

   if (!verificationRequest.ok) {
      throw new Error("Something went wrong.");
   }

   const verificationResponse = await verificationRequest.json();

   return verificationResponse;
};

export const fetchDeleteUserData = async ({ token }: { token: string }) => {
   const verificationRequest = await fetch(`${baseUrl}/users/data`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!verificationRequest.ok) {
      throw new Error("Something went wrong deleting data.");
   }

   const verificationResponse = await verificationRequest.json();

   return verificationResponse;
};

export const fetchDeleteUser = async ({ token }: { token: string }) => {
   const verificationRequest = await fetch(`${baseUrl}/users/`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!verificationRequest.ok) {
      throw new Error("Something went wrong deleting user.");
   }

   const verificationResponse = await verificationRequest.json();

   return verificationResponse;
};
