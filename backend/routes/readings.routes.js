const ReadingsController = require("../controller/reading.controller");

const readingsRouter = require("express").Router();

readingsRouter.get(
   "/bodyweight",
   ReadingsController.getUsersBodyweightReadings
);
readingsRouter.post("/bodyweight", ReadingsController.addBodyweightReadings);
readingsRouter.patch("/bodyweight", ReadingsController.updateBodyweightReading);
readingsRouter.delete(
   "/bodyweight",
   ReadingsController.deleteBodyweightReading
);
readingsRouter.delete(
   "/bodyweight/all",
   ReadingsController.deleteAllBodyweightReadings
);

module.exports = readingsRouter;
