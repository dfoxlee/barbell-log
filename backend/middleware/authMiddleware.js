const pool = require("../db/dbConfig");
const { logger } = require("../logger/logger");
const { validateToken } = require("../utils/authUtils");

const authMiddleware = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
         return res.status(401).json({
            error: true,
            message: "Unauthorized: Missing or invalid token format.",
         });
      }

      const token = authHeader.split(" ")[1];

      const decoded = validateToken(token);

      if (!decoded) {
         return res
            .status(401)
            .json({ error: true, message: "Unauthorized: Invalid token." });
      }

      const userId = decoded;

      const [selectResults] = await pool.execute(
         `
            SELECT *
            FROM user
            WHERE user_id = ?
         `,
         [userId]
      );

      if (!selectResults.length) {
         logger.info(`authMiddleware > Invalid token: ${token}`);
         return res
            .status(401)
            .json({ error: true, message: "Unauthorized: Invalid user." });
      }

      req.user = selectResults[0];

      next();
   } catch (error) {
      next(error);
   }
};

module.exports = authMiddleware;
