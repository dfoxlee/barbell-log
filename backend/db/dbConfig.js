const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Create the connection pool. The pool-specific settings are the defaults

const connectionConfig =
   process.env.ENVIRONMENT === "PRODUCTION"
      ? {
           host: process.env.PROD_MYSQL_HOST,
           user: process.env.PROD_MYSQL_USER,
           password: process.env.PROD_MYSQL_PASSWORD,
           database: process.env.PROD_MYSQL_DATABASE,
           port: process.env.PROD_MYSQL_PORT || 25060,
           waitForConnections: true,
           connectionLimit: 10,
           maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
           idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
           queueLimit: 0,
           enableKeepAlive: true,
           keepAliveInitialDelay: 0,
           ssl: {
              ca: fs.readFileSync(path.join(__dirname, 'ca-certificate.crt')), // Download this from DigitalOcean
           },
        }
      : {
           host: process.env.MYSQL_HOST,
           user: process.env.MYSQL_USER,
           password: process.env.MYSQL_PASSWORD,
           database: process.env.MYSQL_DATABASE,
           waitForConnections: true,
           connectionLimit: 10,
           maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
           idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
           queueLimit: 0,
           enableKeepAlive: true,
           keepAliveInitialDelay: 0,
        };
const pool = mysql.createPool(connectionConfig);

module.exports = pool;
