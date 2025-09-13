const pool = require("../db/dbConfig");

const selectBodyweightMetricsByUserId = async (userId) => {
   const query = `
      SELECT date_recorded as dateRecorded,
         bodyweight
      FROM metric
      WHERE user_id = ?
         AND date_recorded >= CURDATE() - INTERVAL 90 DAY
      ORDER BY date_recorded DESC
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

const selectNutritionMetricsByUserId = async (userId) => {
   const query = `
      SELECT
         DATE(m.date_recorded) AS dateRecorded,
         SUM(n.energy) AS energy,
         SUM(n.protein) AS protein,
         SUM(n.total_fat) AS totalFat,
         SUM(n.sodium) AS sodium,
         SUM(n.added_sugar) AS addedSugar,
         SUM(n.cholesterol) AS cholesterol,
         SUM(n.total_sugar) AS totalSugar,
         SUM(n.carbohydrates) AS carbohydrates,
         SUM(n.fiber) AS fiber
      FROM metric m
      INNER JOIN nutrition n ON m.nutrition_id = n.nutrition_id
      WHERE m.user_id = ?
      GROUP BY DATE(m.date_recorded)
      ORDER BY DATE(m.date_recorded) DESC;
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
      VALUES (?, ?);
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
