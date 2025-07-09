// libraries and frameworks
const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");

// middleware
const errorMiddleware = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

//routes
const usersRouter = require("./routes/usersRoutes");
const testRouter = require("./routes/testsRoutes");
const workoutsRouter = require("./routes/workoutsRoutes");
const completedWorkoutRouter = require("./routes/completedWorkoutsRoutes");

// utils, db, services
// const { winstonStream, logger } = require("./logger/logger");

require("dotenv").config();


const app = express();

const corsOptions =
process.env.ENVIRONMENT === "PRODUCTION"
? {
   origin: "https://barbell-log.com",
}
: null;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("combined", { stream: winstonStream }));

app.use("/api/v1/test", testRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/workouts", authMiddleware, workoutsRouter);
app.use("/api/v1/completed-workouts", authMiddleware, completedWorkoutRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 4004;
app.listen(port, () => {
   // logger.info(`Server listening on port ${port}`);
   console.log(`App listening on port ${port}`);
});
