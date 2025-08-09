const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const {
   encryptPassword,
   createToken,
   comparePassword,
} = require("../utils/authUtils");

const selectUserByEmail = async (email) => {
   const [results] = await pool.execute("SELECT * FROM user WHERE email = ?", [
      email,
   ]);

   return results;
};

const selectUserById = async (userId) => {
   const [results] = await pool.execute(
      "SELECT * FROM user WHERE user_id = ?",
      [userId]
   );

   return results;
};

const insertUser = async ({ email, password, verificationToken }) => {
   const [userSearchResults] = await pool.execute(
      `
      SELECT *
      FROM user
      WHERE email = ?
      `,
      [email]
   );

   if (userSearchResults.length) {
      throw new Error("User already exists");
   }

   const hashPassword = await encryptPassword(password);
   const createdDate = new Date();

   const [insertUserResults] = await pool.execute(
      `
      INSERT INTO user (email, hash_password, created_date, is_verified, verification_token)
      VALUES (?, ?, ?, ?, ?)
      `,
      [email, hashPassword, createdDate, false, verificationToken]
   );

   if (insertUserResults.affectedRows < 1) {
      throw new Error("Unable to insert user into database.");
   }

   return;
};

const validateUser = async ({ email, password }) => {
   const [userSearchResults] = await pool.execute(
      `
         SELECT *
         FROM user
         WHERE email = ?
      `,
      [email]
   );

   if (!userSearchResults.length) {
      throw new Error("User doesn't exists");
   }
   const user = userSearchResults[0];

   if (!user.isVerified) {
      throw new Error("User is not verified.");
   }

   const hashPassword = user["hash_password"];
   const passwordMatch = await comparePassword(password, hashPassword);

   if (!passwordMatch) {
      throw new Error("Password does not match.");
   }

   const userId = user["user_id"];

   const token = createToken(userId);

   const [insertTokenResults] = await pool.execute(
      `
      UPDATE user
      SET token = ? WHERE user_id = ?
      `,
      [token, userId]
   );

   if (insertTokenResults.affectedRows < 1) {
      throw new Error("Unable to insert token for new user into database.");
   }

   const [returnUserSearch] = await pool.execute(
      `
         SELECT token, created_date as createdDate, weight_unit_preference as weightUnitPreference, distance_unit_preference as distanceUnitPreference
         FROM user
         WHERE user_id = ?
      `,
      [userId]
   );

   if (!returnUserSearch.length) {
      throw new Error("Unable to find a user.");
   }

   return returnUserSearch[0];
};

const updateUserToken = async ({ userId, token }) => {
   const [results] = await pool.execute(
      "UPDATE user SET token = ? WHERE user_id = ?",
      [token, userId]
   );

   if (results.affectedRows === 0) {
      const error = new Error("Failed to update user token");
      error.statusCode = 500;
      throw error;
   }

   return;
};

const deleteUser = async (userId) => {
   const [results] = await pool.execute("DELETE FROM user WHERE user_id = ?", [
      userId,
   ]);

   if (results.affectedRows === 0) {
      const error = new Error("Failed to delete user");
      error.statusCode = 500;
      throw error;
   }

   return;
};

const updateWeightUnitPreference = async ({ userId, weightUnitPreference }) => {
   const [updateWeightPreference] = await pool.execute(
      `
         UPDATE user
         SET weight_unit_preference = ?
         WHERE user_id = ?
      `,
      [weightUnitPreference, userId]
   );

   if (!updateWeightPreference.affectedRows) {
      throw new Error("Unable to update user weight preference.");
   }
};

const updateDistanceUnitPreference = async ({
   userId,
   distanceUnitPreference,
}) => {
   const [updateWeightPreference] = await pool.execute(
      `
         UPDATE user
         SET distance_unit_preference = ?
         WHERE user_id = ?
      `,
      [distanceUnitPreference, userId]
   );

   if (!updateWeightPreference.affectedRows) {
      throw new Error("Unable to update user weight preference.");
   }
};

module.exports = {
   insertUser,
   validateUser,
   selectUserByEmail,
   selectUserById,
   updateUserToken,
   deleteUser,
   updateWeightUnitPreference,
   updateDistanceUnitPreference,
};
