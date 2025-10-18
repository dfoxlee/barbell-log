const workoutsRouter = require("express").Router();
const { debugConsoleLog } = require("../utils/debuggingUtils");
const WorkoutController = require("../controller/workout.controller");

workoutsRouter.get("/", WorkoutController.getWorkouts);
workoutsRouter.get("/:workoutId", WorkoutController.getWorkoutById);
workoutsRouter.patch("/", WorkoutController.updateWorkout);
workoutsRouter.delete("/:workoutId", WorkoutController.deleteWorkout);
workoutsRouter.post("/", WorkoutController.createWorkout);

module.exports = workoutsRouter;
