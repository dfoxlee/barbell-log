const {
   insertUser,
   validateUser,
   updateWeightUnitPreference,
   updateDistanceUnitPreference,
   selectUserByEmail,
   updateUserToken,
} = require("../services/users.services");
const { createToken, comparePassword } = require("../utils/authUtils");
const { debugConsoleLog } = require("../utils/debuggingUtils");
const { htmlContent, transporter } = require("../utils/emailUtils");

const signUpUser = async ({ email, password }) => {
   const verificationToken = createToken(email);

   const mailOptions = {
      from: "barbelllog@gmail.com",
      to: email,
      subject: "Welcome to Barbell Log",
      html: htmlContent(verificationToken),
   };

   await insertUser({ email, password, verificationToken });

   transporter.sendMail(mailOptions);

   return;
};

const loginUser = async ({ email, password }) => {
   const users = await selectUserByEmail({ email });

   const user = users[0];

   if (!user) {
      throw new Error("Unable to find user.");
   }

   const doPasswordsMatch = await comparePassword(password, user.hash_password);

   if (!doPasswordsMatch) {
      throw new Error("Password does not match.");
   }

   const token = createToken(user.user_id);

   await updateUserToken({ userId: user.user_id, token });

   const returnUser = {
      token,
      weightUnitPreference: user.weightUnitPreference,
      distanceUnitPreference: user.distanceUnitPreference,
   };

   return returnUser;
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
