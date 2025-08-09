const {
   insertUser,
   validateUser,
   updateWeightUnitPreference,
   updateDistanceUnitPreference,
} = require("../services/users.services");
const { createToken } = require("../utils/authUtils");
const { debugConsoleLog } = require("../utils/debuggingUtils");
const { htmlContent, transporter } = require("../utils/emailUtils");

const signUpUser = async ({ email, password }) => {
   const verificationToken = createToken(email);

   const mailOptions = {
      from: "barbelllog@gmail.com",
      to: email,
      html: htmlContent(verificationToken),
   };

   await insertUser({ email, password, verificationToken });

   transporter.sendMail(mailOptions);

   return;
};

const loginUser = async ({ email, password }) => {
   await validateUser({ email, password });

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
