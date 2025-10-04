const workoutsRouter = require("express").Router();
const { debugConsoleLog } = require("../utils/debuggingUtils");
const WorkoutController = require("../controller/workout.controller");

workoutsRouter.get("/", WorkoutController.getWorkouts);
workoutsRouter.post("/", WorkoutController.createWorkout);

module.exports = workoutsRouter;
