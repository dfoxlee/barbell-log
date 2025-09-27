const ReadingsServices = require("../services/reading.services");
const { debugConsoleLog } = require("../utils/debuggingUtils");
const { formatDateForDatabase } = require("../utils/formatting.utils");

exports.getUsersBodyweightReadings = async (req, res, next) => {
   try {
      const { userId } = req;

      const bodyweightReadings =
         await ReadingsServices.fetchBodyweightReadingsByUserId({
            userId,
         });

      return res.status(200).json({ bodyweightReadings });
   } catch (error) {
      next(error);
   }
};

exports.addBodyweightReadings = async (req, res, next) => {
   try {
      const { userId } = req;
      const { bodyweightReading, unitId } = req.body;
      const dateRecorded = formatDateForDatabase(new Date());

      await ReadingsServices.createBodyweightReading({
         userId,
         bodyweightReading,
         dateRecorded,
         weightUnitId: unitId,
      });

      return res.status(200).json("Bodyweight recorded successfully.");
   } catch (error) {
      next(error);
   }
};

exports.updateBodyweightReading = async (req, res, next) => {
   try {
      const { bodyweightReadingId, bodyweight, weightUnit } = req.body;

      await ReadingsServices.updateBodyweightReading({
         bodyweightReadingId,
         bodyweight,
         weightUnitId: weightUnit,
      });

      return res.status(200).json("Bodyweight reading updated.");
   } catch (error) {
      next(error);
   }
};

exports.deleteBodyweightReading = async (req, res, next) => {
   try {
      const { bodyweightReadingId } = req.body;

      await ReadingsServices.deleteBodyweightReading({ bodyweightReadingId });

      return res.status(200).json("Bodyweight reading deleted.");
   } catch (error) {
      next(error);
   }
};
