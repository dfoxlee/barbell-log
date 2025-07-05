const {
   createCompletedWorkout,
   getCompletedWorkouts,
   getCompletedWorkout,
   updateCompletedWorkout,
   deleteCompletedWorkout,
} = require("../controllers/completedWorkoutsController");
const completedWorkoutRouter = require("express").Router();

completedWorkoutRouter.get("/", async (req, res, next) => {
   try {
      const userId = req.user.user_id;

      const completedWorkouts = await getCompletedWorkouts({ userId });

      return res.status(201).json(completedWorkouts);
   } catch (error) {
      next(error);
   }
});

completedWorkoutRouter.get("/weekly-breakdown", async (req, res, next) => {
   try {
      const userId = req.user.user_id;

      const weeklyWorkouts = await getCompletedWorkouts({
         userId,
         page: 0,
         take: 5,
      });

      return res.status(201).json(weeklyWorkouts);
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
      const { workout } = req.body;

      await createCompletedWorkout({ userId, workout });

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

      ``;

      const updatedWorkout = await updateCompletedWorkout({
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
