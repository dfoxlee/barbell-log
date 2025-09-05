const {
   createCompletedWorkout,
   getCompletedWorkout,
   getCompletedWorkouts,
   fetchUpdateCompletedWorkout,
   deleteCompletedWorkout,
   getNewCompletedWorkout,
} = require("../controllers/completedWorkoutsController");
const {
   selectCompletedWorkout,
} = require("../services/completedWorkouts.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");
const completedWorkoutRouter = require("express").Router();

completedWorkoutRouter.get("/", async (req, res, next) => {
   try {
      const userId = req.user.user_id;
      const { skip = 0, take = 10 } = req.query;

      const completedWorkouts = await selectCompletedWorkout({
         userId,
      });

      const totalWorkouts = completedWorkouts ? completedWorkouts.length : 0;

      const paginatedWorkouts = completedWorkouts
         ? completedWorkouts.slice(Number(skip), Number(skip) + Number(take))
         : [];

      return res
         .status(201)
         .json({ workouts: paginatedWorkouts, totalWorkouts });
   } catch (error) {
      next(error);
   }
});

completedWorkoutRouter.get("/new/:workoutId", async (req, res, next) => {
   const { workoutId } = req.params;

   try {
      const completedWorkout = await getNewCompletedWorkout({ workoutId });

      return res.status(200).json({ completedWorkout });
   } catch (error) {
      next(error);
   }
});

completedWorkoutRouter.get("/:completedWorkoutId", async (req, res, next) => {
   const { completedWorkoutId } = req.params;

   try {
      const completedWorkoutRequest = await getCompletedWorkout({
         completedWorkoutId,
      });

      return res.status(201).json(completedWorkoutRequest);
   } catch (error) {
      next(error);
   }
});

completedWorkoutRouter.post("/create", async (req, res, next) => {
   try {
      const userId = req.user.user_id;
      const { completedWorkout } = req.body;

      await createCompletedWorkout({ userId, completedWorkout });

      return res
         .status(201)
         .json({ message: "Completed workout created successfully" });
   } catch (error) {
      return next(error);
   }
});

completedWorkoutRouter.put("/update", async (req, res, next) => {
   try {
      const { completedWorkout } = req.body;

      const updatedWorkout = await fetchUpdateCompletedWorkout({
         completedWorkout,
      });

      return res.status(200).json({
         message: "Completed workout updated successfully",
         updatedWorkout,
      });
   } catch (error) {
      return next(error);
   }
});

completedWorkoutRouter.delete("/", async (req, res, next) => {
   try {
      const completedWorkoutId = req.body.completedWorkoutId;

      await deleteCompletedWorkout({ completedWorkoutId });

      return res.status(200).json({
         message: "Workout deleted",
      });
   } catch (error) {
      return next(error);
   }
});

module.exports = completedWorkoutRouter;
