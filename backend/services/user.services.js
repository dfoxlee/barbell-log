const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.fetchOneUser = async ({ userId, email }) => {
   let query = ``;
   let values = [];

   if (userId) {
      query = `
         select user_id as userId,
            email,
            hash_password as hashPassword,
            confirmation_token as confirmationToken,
            is_email_confirmed as isEmailConfirmed,
            token,
            refresh_token as refreshToken,
            created_date as createdDate,
            weight_unit_preference as weightUnitPreference,
            distance_unit_preference as distanceUnitPreference
         from user
         where user_id = ?
         limit 1;
      `;

      values = [userId];
   } else if (email) {
      query = `
         select user_id as userId,
            email,
            hash_password as hashPassword,
            confirmation_token as confirmationToken,
            is_email_confirmed as isEmailConfirmed,
            token,
            refresh_token as refreshToken,
            created_date as createdDate,
            weight_unit_preference as weightUnitPreference,
            distance_unit_preference as distanceUnitPreference
         from user
         where email = ?
         limit 1;
      `;

      values = [email];
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results[0];
};

exports.createUser = async ({ newUser }) => {
   const query = `
      insert into user (email, hash_password, confirmation_token, is_email_confirmed, token, refresh_token, created_date, weight_unit_preference, distance_unit_preference)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?);
   `;

   const values = [
      newUser.email,
      newUser.hashPassword,
      newUser.confirmationToken,
      newUser.isEmailConfirmed,
      newUser.token,
      newUser.refreshToken,
      newUser.createdDate,
      newUser.weightUnitPreference,
      newUser.distanceUnitPreference,
   ];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to insert new user.");
   }

   return results.insertId;
};

exports.updateUser = async ({ updatedUser }) => {
   const query = `
      update user set
         email = ?,
         hash_password = ?,
         confirmation_token = ?,
         is_email_confirmed = ?,
         token = ?,
         refresh_token = ?,
         created_date = ?,
         weight_unit_preference = ?,
         distance_unit_preference = ?,
         last_password_change = ?
      where
         user_id = ?;
   `;

   const values = [
      updatedUser.email,
      updatedUser.hashPassword,
      updatedUser.confirmationToken,
      updatedUser.isEmailConfirmed,
      updatedUser.token,
      updatedUser.refreshToken,
      updatedUser.createdDate,
      updatedUser.weightUnitPreference,
      updatedUser.distanceUnitPreference,
      updatedUser.lastPasswordChange,
      updatedUser.userId,
   ];

   const [results] = await pool.execute(query, values);

   if (results.affectedRows === 0) {
      throw new Error("Unable to update user. User not found.");
   }

   return results.affectedRows;
};

exports.addLoginRecord = async ({ userId, loginDate }) => {
   const query = `
      insert into user_login_record
      values(?, ?);
   `;

   const values = [userId, loginDate];

   await pool.execute(query, values);

   return;
};
