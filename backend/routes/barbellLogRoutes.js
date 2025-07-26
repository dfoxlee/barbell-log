const { getBarbellLog } = require("../controllers/barbellLogController");

const barbellLogRouter = require("express").Router();

barbellLogRouter.get(
   "/:workoutId/:completedWorkoutId",
   async (req, res, next) => {
      console.log(req);
      const { workoutId, completedWorkoutId } = req.params;

      try {
         const barbellLog = await getBarbellLog({
            workoutId,
            completedWorkoutId,
         });

         return res.status(200).json(barbellLog);
      } catch (error) {
         next(error);
      }
   }
);

barbellLogRouter.get("/:workoutId", async (req, res, next) => {
   const { workoutId } = req.params;

   try {
      const barbellLog = await getBarbellLog({
         workoutId,
      });

      return res.status(200).json(barbellLog);
   } catch (error) {
      next(error);
   }
});

module.exports = barbellLogRouter;
