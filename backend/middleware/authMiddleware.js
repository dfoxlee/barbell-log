const { logger } = require("../logger/logger");
const UserServices = require("../services/user.services");
const { validateToken } = require("../utils/authUtils");
const { debugConsoleLog } = require("../utils/debuggingUtils");

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

      const user = await UserServices.fetchOneUser({ userId });

      if (!user) {
         logger.info(`authMiddleware > Invalid token: ${token}`);
         return res
            .status(401)
            .json({ error: true, message: "Unauthorized: Invalid user." });
      }

      req.userId = user.userId;

      next();
   } catch (error) {
      next(error);
   }
};

module.exports = authMiddleware;
