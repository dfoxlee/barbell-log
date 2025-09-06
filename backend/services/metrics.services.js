const pool = require("../db/dbConfig");

const selectBodyweightMetricsByUserId = async (userId) => {
   const query = `
      SELECT date_recorded as dateRecorded,
         bodyweight
      FROM metric
      WHERE user_id = ?
      ORDER BY date_recorded DESC
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

const selectNutritionMetricsByUserId = async (userId) => {
   const query = `
      SELECT m.date_recorded as dateRecorded,
         SUM(n.energy) as energy,
         SUM(n.protein) as protein,
         SUM(n.total_fat) as totalFat,
         SUM(n.sodium) as sodium,
         SUM(n.add_sugar) as addedSugar,
         SUM(n.cholesterol) as cholesterol,
         SUM(n.total_sugar) as totalSugar,
         SUM(n.carbohydrates) as carbohydrates,
         SUM(n.fiber) as fiber,
      FROM metric m
      INNER JOIN nutrition n ON m.nutrition_id = n.nutrition_id
      WHERE m.user_id = ?
      GROUP BY m.date_recorded
      ORDER BY m.date_recorded DESC;
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

const insertBodyweightMetric = async ({ userId, bodyweight }) => {
   const query = `
      INSERT INTO metric (user_id, bodyweight)
      VALUES (?, ?)
   `;

   const values = [userId, bodyweight];

   const [results] = await pool.execute(query, values);

   if (results.affectedRows === 0) {
      throw new Error("Failed to add body weight metric");
   }

   return;
};

const insertNutritionMetric = async ({ userId, nutritionId }) => {
   const query = `
      INSERT INTO metric (user_id, nutrition_id)
      VALUES (${userId}, ${nutritionId})
   `;

   const values = [userId, nutritionId];

   const [results] = await pool.execute(query, values);

   if (results.affectedRows === 0) {
      throw new Error("Failed to add nutrition metric");
   }

   return;
};

module.exports = {
   selectBodyweightMetricsByUserId,
   selectNutritionMetricsByUserId,
   insertBodyweightMetric,
   insertNutritionMetric,
};
