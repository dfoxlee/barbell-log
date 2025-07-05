const {logger} = require("../logger/logger");

const errorMiddleware = (err, req, res, next) => {
   console.error("Global Error Handler:", err);

   // logger.error(err.message)

   let statusCode = 500;
   let message = "Internal Server Error";

   if (err.statusCode) {
      statusCode = err.statusCode;
   }

   if (err.message) {
      message = err.message;
   }

   res.status(statusCode).json({
      error: true,
      message: message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
   });
};

module.exports = errorMiddleware;
