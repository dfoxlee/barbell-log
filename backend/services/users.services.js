const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const {
   encryptPassword,
   createToken,
   comparePassword,
} = require("../utils/authUtils");

const findUserByEmail = async (email) => {
   const [results] = await pool.execute("SELECT * FROM user WHERE email = ?", [
      email,
   ]);

   return results;
};

const findUserById = async (userId) => {
   const [results] = await pool.execute(
      "SELECT * FROM user WHERE user_id = ?",
      [userId]
   );

   return results;
};

const createUser = async ({ email, password }) => {
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
      INSERT INTO user (email, hash_password, created_date)
      VALUES (?, ?, ?)
      `,
      [email, hashPassword, createdDate]
   );

   if (insertUserResults.affectedRows < 1) {
      throw new Error("Unable to insert user into database.");
   }

   const [newUserSearchResults] = await pool.execute(
      `
         SELECT *
         FROM user
         WHERE email = ?
      `,
      [email]
   );

   const userId = newUserSearchResults[0]["user_id"];

   const token = createToken({ userId });

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
         SELECT token, created_date as createdDate, weight_unit_preference as weightUnitPreference
         FROM user
         WHERE user_id = ?
      `,
      [userId]
   );

   if (!returnUserSearch.length) {
      throw new Error("Unable to retrieve created user.");
   }

   return returnUserSearch[0];
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

   const hashPassword = user["hash_password"];
   const passwordMatch = await comparePassword(password, hashPassword);

   if (!passwordMatch) {
      throw new Error("Password does not match.");
   }

   const userId = user["user_id"];

   const token = createToken({ userId });

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
         SELECT token, created_date as createdDate, weight_unit_preference as weightUnitPreference
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

const updateWeightUnitPreference = async (userId, preference) => {
   const [updateWeightPreference] = await pool.execute(
      `
         UPDATE user
         SET weight_unit_preference = ?
         WHERE user_id = ?
      `,
      [preference, userId]
   );

   if (!updateWeightPreference.affectedRows) {
      throw new Error("Unable to update user weight preference.");
   }
};

module.exports = {
   createUser,
   validateUser,
   findUserByEmail,
   findUserById,
   updateUserToken,
   deleteUser,
   updateWeightUnitPreference,
};
