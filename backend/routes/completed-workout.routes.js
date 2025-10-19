const completedWorkoutRouter = require("express").Router();
const CompletedWorkoutController = require("../controller/completed-workout.controller");

completedWorkoutRouter.get(
   "/create/:workoutId",
   CompletedWorkoutController.getNewCompleteWorkout
);
completedWorkoutRouter.get(
   "/",
   CompletedWorkoutController.getCompletedWorkouts
);
completedWorkoutRouter.get(
   "/:completedWorkoutId",
   CompletedWorkoutController.getCompeltedWorkoutById
);
completedWorkoutRouter.patch(
   "/",
   CompletedWorkoutController.updateCompletedWorkout
);
completedWorkoutRouter.delete(
   "/:workoutId",
   CompletedWorkoutController.deleteCompletedWorkout
);
completedWorkoutRouter.post(
   "/",
   CompletedWorkoutController.addCompletedWorkout
);

module.exports = completedWorkoutRouter;
