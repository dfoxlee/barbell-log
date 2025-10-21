const commonRouter = require("express").Router();
const CommonController = require("../controller/common.controller");

commonRouter.get("/weight-units", CommonController.getWeightUnits);
commonRouter.get("/distance-units", CommonController.getDistanceUnits);
commonRouter.get("/workout-types", CommonController.getWorkoutTypes);

module.exports = commonRouter;
