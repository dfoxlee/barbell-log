const { add } = require("winston");
const {
   insertBodyweightMetric,
   selectBodyweightMetricsByUserId,
   selectNutritionMetricsByUserId,
   insertNutritionMetric,
} = require("../services/metrics.services");
const {
   insertNutrition,
   selectNutritionData,
} = require("../services/nutrition.services");

const getBodyweightMetrics = async ({ userId }) => {
   const metrics = await selectBodyweightMetricsByUserId(userId);

   return metrics;
};

const getNutritionMetrics = async ({ userId }) => {
   const metrics = await selectNutritionMetricsByUserId(userId);

   return metrics;
};

const getSearchNutrition = async ({ userId, searchValue, skip, take }) => {
   const nutritionData = await selectNutritionData({
      userId,
      searchValue,
   });

   return nutritionData;
};

const addBodyweight = async ({ userId, bodyweight }) => {
   await insertBodyweightMetric({ userId, bodyweight });
};

const addNutritionMetric = async ({ userId, nutritionMetric }) => {
   let nutritionId = nutritionMetric.nutritionId;

   if (!nutritionId) {
      const nutritionSearch = await selectNutritionData({
         description: nutritionMetric.description,
      });

      if (nutritionSearch.length) {
         throw new Error("Nutrition description already exists.");
      }
      
      await insertNutrition({ userId, nutritionData: nutritionMetric });

      const nutritionData = await selectNutritionData({
         userId,
         description: nutritionMetric.description,
      });
   
      nutritionId = nutritionData[0].nutritionId;
   }

   await insertNutritionMetric({ userId, nutritionId });

   return;
};

module.exports = {
   getBodyweightMetrics,
   getSearchNutrition,
   addBodyweight,
   getNutritionMetrics,
   addNutritionMetric,
};
