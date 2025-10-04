const nutritionRouter = require("express").Router();
const NutritionController = require("../controller/nutrition.controller");

nutritionRouter.get("/food-search", NutritionController.getFoodDataSearch);
nutritionRouter.get("/reading", NutritionController.getNutritionReading);
nutritionRouter.get("/readings", NutritionController.getNutritionReadings);
nutritionRouter.get(
   "/grouped-readings",
   NutritionController.getGroupedNutritionReadings
);
nutritionRouter.post("/", NutritionController.createNutritionReading);

module.exports = nutritionRouter;
