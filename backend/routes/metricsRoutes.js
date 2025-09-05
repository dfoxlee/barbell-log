const metricsRouter = require("express").Router();

const addBodyWeightMetric = async (req, res) => {
   try {
      const userId = req.user.user_id;

      // add the bodyweight metric

      res.status(201).json({ message: "Bodyweight metric added successfully" });
   } catch (error) {
      next(error);
   }
};
