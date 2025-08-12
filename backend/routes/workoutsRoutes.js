const workoutsRouter = require("express").Router();
const {
   getAllUserWorkouts,
   getUserWorkout,
   addUserWorkout,
   updateUserWorkout,
   deleteUserWorkout,
} = require("../controllers/workoutsController");
const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

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
   const connection = await pool.getConnection();

   try {
      await connection.beginTransaction();

      const userId = req.user.user_id;
      const { workoutComposition } = req.body;

      await addUserWorkout({ userId, workoutComposition });

      await connection.commit();

      return res.status(201).json({ message: "Workout created successfully" });
   } catch (error) {
      await connection.rollback();
      debugConsoleLog("rollback");

      return next(error);
   } finally {
      if (connection) {
         connection.release();
      }
   }
});

workoutsRouter.put("/update", async (req, res, next) => {
   const userId = req.user.user_id;
   const { workoutComposition } = req.body;

   const connection = await pool.getConnection();

   try {
      await connection.beginTransaction();

      await updateUserWorkout({
         userId,
         workoutComposition,
      });

      await connection.commit();

      return res.status(200).json({ message: "Workout updated successfully" });
   } catch (error) {
      await connection.rollback();

      return next(error);
   } finally {
      if (connection) {
         connection.rollback();
      }
   }
});

workoutsRouter.delete("/:workoutId", async (req, res, next) => {
   const { workoutId } = req.params;

   try {
      await deleteUserWorkout({
         workoutId,
      });

      return res.status(200).end();
   } catch (error) {
      return next(error);
   }
});

module.exports = workoutsRouter;
