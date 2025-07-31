const {
   insertUser,
   validateUser,
   updateWeightUnitPreference,
   updateDistanceUnitPreference,
} = require("../services/users.services");

const signUpUser = async ({ email, password }) => {
   const user = await insertUser({ email, password });

   return user;
};

const loginUser = async ({ email, password }) => {
   const user = await validateUser({ email, password });

   return user;
};

const updateUnitPreferences = async ({
   userId,
   weightUnitPreference,
   distanceUnitPreference,
}) => {
   if (weightUnitPreference) {
      await updateWeightUnitPreference({ userId, weightUnitPreference });
   }
   if (distanceUnitPreference) {
      await updateDistanceUnitPreference({ userId, distanceUnitPreference });
   }

   return;
};

module.exports = { signUpUser, loginUser, updateUnitPreferences };
