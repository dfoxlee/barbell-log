const pool = require("../db/dbConfig");
const { debugConsoleLog } = require("../utils/debuggingUtils");

exports.fetchBodyweightReadingsByUserId = async ({ userId }) => {
   const query = `
      select bodyweight_reading_id as bodyweightReadingId, 
         date_recorded as dateRecorded,
         bodyweight,
         weight_unit as weightUnit
      from bodyweight_reading
      where user_id = ?
      order by date_recorded desc
      limit 150;
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.createBodyweightReading = async ({
   userId,
   bodyweightReading,
   dateRecorded,
   weightUnitId,
}) => {
   const query = `
      insert into bodyweight_reading (user_id, bodyweight, date_recorded, weight_unit)
      values(?, ?, ?, ?);
   `;

   const values = [userId, bodyweightReading, dateRecorded, weightUnitId];

   const [request] = await pool.execute(query, values);

   if (!request.affectedRows) {
      throw new Error("An error occurred entering bodyweight reading.");
   }

   return;
};

exports.updateBodyweightReading = async ({
   bodyweightReadingId,
   bodyweight,
   weightUnitId,
}) => {
   const query = `
      update bodyweight_reading
      set bodyweight = ?, weight_unit = ?
      where bodyweight_reading_id = ?;
   `;

   const values = [bodyweight, weightUnitId, bodyweightReadingId];

   await pool.execute(query, values);

   return;
};

exports.deleteBodyweightReading = async ({ bodyweightReadingId }) => {
   const query = `
      delete from bodyweight_reading
      where bodyweight_reading_id = ?;
   `;

   const values = [bodyweightReadingId];

   await pool.execute(query, values);

   return;
};
