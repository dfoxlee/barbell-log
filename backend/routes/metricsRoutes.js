const {
   addBodyweight,
   getBodyweightMetrics,
   getNutritionMetrics,
   addNutritionMetric,
   getSearchNutrition,
} = require("../controllers/metrics.controller");

const metricsRouter = require("express").Router();

metricsRouter.get("/bodyweight", async (req, res, next) => {
   try {
      const userId = req.user.user_id;

      const metrics = await getBodyweightMetrics({ userId });

      res.status(200).json({ metrics });
   } catch (error) {
      next(error);
   }
});

metricsRouter.get("/nutrition", async (req, res, next) => {
   try {
      const userId = req.user.user_id;

      const metrics = await getNutritionMetrics({ userId });

      res.status(200).json({ metrics });
   } catch (error) {
      next(error);
   }
});

metricsRouter.get("/nutrition/search", async (req, res, next) => {
   try {
      const userId = req.user.user_id;
      const { searchValue } = req.query;

      const nutritionData = await getSearchNutrition({
         userId,
         searchValue,
      });

      res.status(200).json({ nutritionData });
   } catch (error) {
      next(error);
   }
});

metricsRouter.post("/bodyweight", async (req, res, next) => {
   try {
      const userId = req.user.user_id;

      await addBodyweight({ userId, bodyweight: req.body.bodyweight });

      res.status(201).json({ message: "Bodyweight metric added successfully" });
   } catch (error) {
      next(error);
   }
});

metricsRouter.post("/nutrition", async (req, res, next) => {
   try {
      const userId = req.user.user_id;
      const nutritionMetric = req.body;

      await addNutritionMetric({ userId, nutritionMetric });

      res.status(201).json({ message: "Nutrition metric added successfully" });
   } catch (error) {
      next(error);
   }
});

module.exports = metricsRouter;
