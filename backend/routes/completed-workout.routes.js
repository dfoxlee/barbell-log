const completedWorkoutRouter = require("express").Router();
const CompletedWorkoutController = require("../controller/completed-workout.controller");

completedWorkoutRouter.get(
   "/:workoutId",
   CompletedWorkoutController.getNewCompleteWorkout
);

module.exports = completedWorkoutRouter;
