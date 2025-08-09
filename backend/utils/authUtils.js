// authUtils.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

// Function to encrypt a password
async function encryptPassword(password) {
   const salt = await bcrypt.genSalt(saltRounds);
   const hash = await bcrypt.hash(password, salt);
   return hash;
}

// Function to compare a plain password with its hash
async function comparePassword(plainPassword, hashedPassword) {
   const match = await bcrypt.compare(plainPassword, hashedPassword);
   
   return match;
}

// Function to create a JWT token
function createToken(payload) {
   const token = jwt.sign(payload, jwtSecret);
   return token;
}

// Function to validate a JWT token
function validateToken(token) {
   const decoded = jwt.verify(token, jwtSecret);
   return decoded;
}

module.exports = {
   encryptPassword,
   comparePassword,
   createToken,
   validateToken,
};
