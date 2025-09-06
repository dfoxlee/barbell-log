const pool = require("../db/dbConfig");

const selectNutritionData = async ({
   userId,
   description,
   searchValue,
   skip,
   take,
}) => {
   let query = "";
   let values = [];
   if (userId && description) {
      query = `
      SELECT nutrition_id as nutritionId,
      description,
      energy,
      protein,
      total_fat as totalFat,
      sodium,
      added_sugar as addedSugar,
      cholesterol,
      total_sugar as totalSugar,
      carbohydrates,
      fiber
      FROM nutrition
      WHERE user_id = ? AND description = ?
      LIMIT 1;
      `;

      values = [userId, description];
   } else if (searchValue && userId) {
      if (searchValue) {
         query = `
         SELECT nutrition_id as nutritionId,
            description,
            energy,
            protein,
            total_fat as totalFat,
            sodium,
            added_sugar as addedSugar,
            cholesterol,
            total_sugar as totalSugar,
            carbohydrates,
            fiber
         FROM nutrition
         WHERE user_id = ? AND description LIKE ? 
            OR user_id IS NULL AND description LIKE ?
         ORDER BY description
         LIMIT 50;
         `;

         values = [userId, `%${searchValue}%`, `%${searchValue}%`];
      } else {
         query = `
         SELECT nutrition_id as nutritionId,
            description,
            energy,
            protein,
            total_fat as totalFat,
            sodium,
            added_sugar as addedSugar,
            cholesterol,
            total_sugar as totalSugar,
            carbohydrates,
            fiber
         FROM nutrition
         WHERE user_id = ? 
            OR user_id IS NULL
         ORDER BY description
         LIMIT 50;
         `;

         values = [userId];
      }
   } else {
      return;
   }

   const [results] = await pool.execute(query, values);

   return results;
};

const insertNutrition = async ({ userId, nutritionData }) => {
   const query = `
      INSERT INTO nutrition (
         user_id, 
         description, 
         energy, 
         protein, 
         total_fat, 
         sodium, 
         added_sugar, 
         cholesterol, 
         total_sugar, 
         carbohydrates, 
         fiber
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
   `;

   const values = [
      userId,
      nutritionData.description,
      nutritionData.energy,
      nutritionData.protein,
      nutritionData.total_fat,
      nutritionData.sodium,
      nutritionData.added_sugar,
      nutritionData.cholesterol,
      nutritionData.total_sugar,
      nutritionData.carbohydrates,
      nutritionData.fiber,
   ];

   const [results] = await pool.execute(query, values);

   if (results.affectedRows === 0) {
      throw new Error("Failed to add nutrition data");
   }

   return;
};

module.exports = {
   selectNutritionData,
   insertNutrition,
};
