const {
   createUser,
   validateUser,
   updateWeightUnitPreference,
} = require("../services/users.services");

const signUpUser = async ({ email, password }) => {
   const user = await createUser({ email, password });

   return user;
};

const loginUser = async ({ email, password }) => {
   const user = await validateUser({ email, password });

   return user;
};

const updateUserWeightPreference = async ({ userId, preference }) => {
   return await updateWeightUnitPreference(userId, preference);
};

module.exports = { signUpUser, loginUser, updateUserWeightPreference };
