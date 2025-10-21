const CommonServices = require("../services/common.services");

exports.getWeightUnits = async (req, res, next) => {
   try {
      const weightUnits = await CommonServices.getWeightUnits();

      return res.status(200).json({ weightUnits });
   } catch (error) {
      next(error);
   }
};

exports.getDistanceUnits = async (req, res, next) => {
   try {
      const distanceUnits = await CommonServices.getDistanceUnits();

      return res.status(200).json({ distanceUnits });
   } catch (error) {
      next(error);
   }
};

exports.getWorkoutTypes = async (req, res, next) => {
   try {
      const workoutTypes = await CommonServices.getWorkoutTypes();

      return res.status(200).json({ workoutTypes });
   } catch (error) {
      next(error);
   }
};
