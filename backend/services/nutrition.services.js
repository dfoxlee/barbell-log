const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.insertNutritionReading = async ({ userId, nutritionReading }) => {
   const query = `
      insert into nutrition_reading (user_id, fdc_id, date_recorded, description, quantity, calories, protein, carbohydrates, added_sugar, total_fiber, total_sugar, sodium, cholesterol, serving_size)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
   `;

   const values = [
      userId,
      nutritionReading.fdcId,
      nutritionReading.dateRecorded,
      nutritionReading.description,
      nutritionReading.quantity,
      nutritionReading.calories,
      nutritionReading.protein,
      nutritionReading.carbohydrates,
      nutritionReading.addedSugar,
      nutritionReading.totalFiber,
      nutritionReading.totalSugar,
      nutritionReading.sodium,
      nutritionReading.cholesterol,
      nutritionReading.servingSize,
   ];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Unable to insert nutrition reading.");
   }

   return results.insertId;
};

exports.getNutritionReading = async ({ nutritionReadingId }) => {
   const query = `
      select nutrition_reading_id as nutritionReadingId,
         date_recorded as dateRecorded,
         quantity,
         calories,
         protein,
         carbohydrates,
         added_sugar as addedSugar,
         total_fiber as totalFiber,
         total_sugar as totalSugar,
         sodium,
         cholesterol,
         serving_size as servingSize,
         description,
         fdc_id as fdcId
      from nutrition_reading
      where nutrition_reading_id = ?;
   `;

   const values = [nutritionReadingId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getNutritionReadings = async ({ userId }) => {
   const query = `
      select nutrition_reading_id as nutritionReadingId,
         date_recorded as dateRecorded,
         quantity,
         calories,
         protein,
         carbohydrates,
         added_sugar as addedSugar,
         total_fiber as totalFiber,
         total_sugar as totalSugar,
         sodium,
         cholesterol,
         serving_size as servingSize,
         description,
         fdc_id as fdcId
      from nutrition_reading
      where user_id = ?
      order by date_recorded desc;
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getGroupedNutritionReadings = async ({ userId }) => {
   const query = `
      SELECT
         DATE(date_recorded) AS dateGroup,
         COALESCE(SUM(quantity), 0) AS totalQuantity,
         COALESCE(SUM(calories), 0) AS totalCalories,
         COALESCE(SUM(protein), 0) AS totalProtein,
         COALESCE(SUM(carbohydrates), 0) AS totalCarbohydrates,
         COALESCE(SUM(added_sugar), 0) AS totalAddedSugar,
         COALESCE(SUM(total_fiber), 0) AS totalFiber,
         COALESCE(SUM(total_sugar), 0) AS totalSugar,
         COALESCE(SUM(sodium), 0) AS totalSodium,
         COALESCE(SUM(cholesterol), 0) AS totalCholesterol
      FROM nutrition_reading
      WHERE user_id = ?
         AND date_recorded >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY DATE(date_recorded)
      ORDER BY dateGroup DESC
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.deleteNutritionReadings = async ({ userId, nutritionReadingId }) => {
   let query = ``;
   let values = [];

   if (userId) {
      query = `
         delete from nutrition_reading
         where user_id = ?;
      `;

      values = [userId];
   } else if (nutritionReadingId) {
      query = `
         delete from nutrition_reading
         where nutrition_reading_id = ?;
      `;

      values = [nutritionReadingId];
   } else {
      return;
   }

   await pool.execute(query, values);

   return;
};
