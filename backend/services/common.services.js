const pool = require("../db/dbConfig");

exports.getWeightUnits = async () => {
   const query = `
      select ref_code_id as unitId,
         ref_code_name as unitName,
         ref_code_abbreviation as unitAbbreviation
      from ref_code
      where ref_code_domain_id = 1;
   `;

   const values = [];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getDistanceUnits = async () => {
   const query = `
      select ref_code_id as unitId,
         ref_code_name as unitName,
         ref_code_abbreviation as unitAbbreviation
      from ref_code
      where ref_code_domain_id = 2;
   `;

   const values = [];

   const [results] = await pool.execute(query, values);

   return results;
};

exports.getWorkoutTypes = async () => {
   const query = `
      select ref_code_id as workoutTypeId,
         ref_code_name as workoutType
      from ref_code
      where ref_code_domain_id = 3;
   `;

   const values = [];

   const [results] = await pool.execute(query, values);

   return results;
};
