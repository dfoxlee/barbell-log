const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
   level: "info",
   format: winston.format.combine(
      winston.format.timestamp({
         format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf(
         ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
      )
   ),
   transports: [
      new winston.transports.Console(),
      // new winston.transports.File({ filename: path.join(__dirname, 'logs', 'combined.log') }), // Log to file
      // new winston.transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }), // Log errors to a separate file
   ],
});

const winstonStream = {
   write: function (message) {
      logger.info(message.trim());
   },
};

module.exports = { winstonStream, logger };
