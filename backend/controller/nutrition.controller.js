const { debugConsoleLog } = require("../utils/debuggingUtils");
const NutritionServices = require("../services/nutrition.services");
const { formatDateForDatabase } = require("../utils/formatting.utils");

exports.getFoodDataSearch = async (req, res, next) => {
   try {
      const { query } = req.query;

      const usdaApiKey = process.env.USDA_API_KEY;
      const usdaApiUrl = process.env.USDA_API_URL;

      const foodDataSearch = await fetch(
         // `${usdaApiUrl}?api_key=${usdaApiKey}&pageSize=100&query=${query}`,
         `${usdaApiUrl}?api_key=${usdaApiKey}&pageSize=100&query=${query}&dataType=Branded,Foundation`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      if (!foodDataSearch.ok) {
         throw new Error("Failed to fetch food data from USDA API");
      }

      const foodData = await foodDataSearch.json();

      return res.status(200).json({
         success: true,
         data: foodData,
      });
   } catch (error) {
      next(error);
   }
};

exports.createNutritionReading = async (req, res, next) => {
   try {
      const { userId } = req;
      const { nutritionReading } = req.body;

      const dateRecorded = formatDateForDatabase(new Date());

      nutritionReading.dateRecorded = dateRecorded;

      await NutritionServices.insertNutritionReading({
         userId,
         nutritionReading,
      });

      return res.status(201).json("Nutrition reading inserted");
   } catch (error) {
      next(error);
   }
};

exports.getNutritionReading = async (req, res, next) => {
   try {
      const { nutritionReadingId } = req.body;

      const nutritionReading = await NutritionServices.getNutritionReading({
         nutritionReadingId,
      });

      return res.status(200).json({ nutritionReading });
   } catch (error) {
      next(error);
   }
};

exports.getNutritionReadings = async (req, res, next) => {
   try {
      const { userId } = req;

      const nutritionReadings = await NutritionServices.getNutritionReadings({
         userId,
      });

      return res.status(200).json({ nutritionReadings });
   } catch (error) {
      next(error);
   }
};

exports.getGroupedNutritionReadings = async (req, res, next) => {
   try {
      const { userId } = req;

      const nutritionReadings =
         await NutritionServices.getGroupedNutritionReadings({
            userId,
         });

      return res.status(200).json({ nutritionReadings });
   } catch (error) {
      next(error);
   }
};
