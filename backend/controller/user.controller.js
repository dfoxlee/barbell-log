const UserServices = require("../services/user.services");
const {
   comparePassword,
   createToken,
   encryptPassword,
   validateToken,
} = require("../utils/authUtils");
const { formatDateForDatabase } = require("../utils/formatting.utils");
const { htmlContent, transporter } = require("../utils/email.utils");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.signup = async (req, res, next) => {
   try {
      const { email, password, weightUnitPreference, distanceUnitPreference } =
         req.body;

      if (!email || !password) {
         throw new Error("All fields are required.");
      }

      // check for existing user
      const user = await UserServices.fetchOneUser({ email });

      if (user) {
         throw new Error("User already exists");
      }
      // create validation token
      const confirmationToken = createToken(email);
      const hashPassword = await encryptPassword(password);
      const createdDate = formatDateForDatabase(new Date());

      // create user
      const newUser = {
         email,
         hashPassword,
         confirmationToken,
         isEmailConfirmed: false,
         token: "",
         refreshToken: "",
         createdDate,
         weightUnitPreference: weightUnitPreference ? weightUnitPreference : 1,
         distanceUnitPreference: distanceUnitPreference
            ? distanceUnitPreference
            : 3,
      };

      // send email first in case error
      const mailOptions = {
         from: "barbelllog@gmail.com",
         to: email,
         subject: "Welcome to Barbell Log",
         html: htmlContent(confirmationToken),
      };

      transporter.sendMail(mailOptions);

      // add user to database
      await UserServices.createUser({ newUser });

      // send ok response
      res.status(200).json({
         error: false,
         message: "User signed up. Check email for next steps.",
      });
   } catch (error) {
      next(error);
   }
};

exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         throw new Error("All fields required");
      }

      const user = await UserServices.fetchOneUser({ email });

      if (!user) {
         throw new Error("Unable to find user.");
      }

      const hashPassword = user.hashPassword;

      const passwordsMatch = await comparePassword(password, hashPassword);

      if (!passwordsMatch) {
         throw new Error("Invalid email or password.");
      }

      const token = createToken(user.userId);

      const loginDate = formatDateForDatabase(new Date());

      const updatedUser = {
         ...user,
         token,
      };

      await UserServices.updateUser({ updatedUser });

      await UserServices.addLoginRecord({ userId: user.userId, loginDate });

      return res.status(200).json({
         token,
         weightUnitPreference: user.weightUnitPreference,
         distanceUnitPreference: user.distanceUnitPreference,
      });
   } catch (error) {
      next(error);
   }
};

exports.confirmEmail = async (req, res, next) => {
   try {
      const { confirmationToken } = req.params;

      if (!confirmationToken) {
         throw new Error("All fields required");
      }

      const email = validateToken(confirmationToken);

      if (!email) {
         throw new Error("Unable to validate token.");
      }

      const user = await UserServices.fetchOneUser({ email });

      if (!user) {
         throw new Error("Unable to find user.");
      }

      const token = createToken(user.userId);

      const updatedUser = {
         ...user,
         token,
         isEmailConfirmed: true,
      };

      await UserServices.updateUser({ updatedUser });

      return res.status(200).json({
         token,
         weightUnitPreference: user.weightUnitPreference,
         distanceUnitPreference: user.distanceUnitPreference,
      });
   } catch (error) {
      next(error);
   }
};

exports.updateUnitPreference = async (req, res, next) => {
   try {
      const { weightUnitPreference, distanceUnitPreference } = req.body;
      const { userId } = req;

      const user = await UserServices.fetchOneUser({ userId });

      const updatedUser = {
         ...user,
         weightUnitPreference:
            weightUnitPreference ?? user.weightUnitPreference,
         distanceUnitPreference:
            distanceUnitPreference ?? user.distanceUnitPreference,
      };

      await UserServices.updateUser({ updatedUser });

      return res.status(200).json("Units updated.");
   } catch (error) {
      next(error);
   }
};

exports.updatePassword = async (req, res, next) => {
   try {
      const { userId } = req;
      const { newPassword } = req.body;

      const hashPassword = await encryptPassword(newPassword);

      const user = await UserServices.fetchOneUser({ userId });

      if (!user) {
         throw new Error("Unable to find user.");
      }

      const lastPasswordChange = formatDateForDatabase(new Date());

      const updatedUser = {
         ...user,
         hashPassword,
         lastPasswordChange,
      };

      await UserServices.updateUser({ updatedUser });

      return res.status(200).json("Password updated successfully.");
   } catch (error) {
      next(error);
   }
};

exports.logout = async (req, res, next) => {
   try {
      const { userId } = req;

      const user = await UserServices.fetchOneUser({ userId });

      if (!user) {
         throw new Error("User does not exist");
      }

      const updatedUser = {
         ...user,
         token: "",
      };

      await UserServices.updateUser({ updatedUser });

      return res.status(200).json("User logged out.");
   } catch (error) {
      next(error);
   }
};
