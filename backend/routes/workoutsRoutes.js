const workoutsRouter = require("express").Router();
const {
   getAllUserWorkouts,
   getUserWorkout,
   addUserWorkout,
   updateUserWorkout,
   deleteUserWorkout,
} = require("../controllers/workoutsController");

workoutsRouter.get("/", async (req, res, next) => {
   const userId = req.user.user_id;

   try {
      const getAllWorkoutsRequest = await getAllUserWorkouts({ userId });

      return res.status(200).json(getAllWorkoutsRequest);
   } catch (error) {
      return next(error);
   }
});

workoutsRouter.get("/:workoutId", async (req, res, next) => {
   const { userId } = req.user;
   const { workoutId } = req.params;

   try {
      const getUserWorkoutRequest = await getUserWorkout({ userId, workoutId });

      return res.status(200).json(getUserWorkoutRequest);
   } catch (error) {
      next(error);
   }
});

workoutsRouter.post("/create", async (req, res, next) => {
   try {
      const userId = req.user.user_id;
      const { workout } = req.body;

      await addUserWorkout({ userId, workout });

      return res.status(201).json({ message: "Workout created successfully" });
   } catch (error) {
      return next(error);
   }
});

workoutsRouter.put("/update", async (req, res, next) => {
   const userId = req.user.user_id;
   const { workout } = req.body;

   try {
      await updateUserWorkout({
         userId,
         workout,
      });

      return res.status(200).json({ message: "Workout updated successfully" });
   } catch (error) {
      return next(error);
   }
});

workoutsRouter.delete("/:workoutId", async (req, res, next) => {
   const { user_id } = req.user;
   const { workoutId } = req.params;

   try {
      await deleteUserWorkout({
         user_id,
         workoutId,
      });

      return res.status(200).end();
   } catch (error) {
      return next(error);
   }
});

module.exports = workoutsRouter;
