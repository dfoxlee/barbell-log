const usersRouter = require("express").Router();
const {
   signUpUser,
   loginUser,
   updateUserWeightPreference,
} = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const { debugConsoleLog } = require("../utils/debuggingUtils");

usersRouter.post("/sign-up", async (req, res, next) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res
         .status(404)
         .json({ error: true, message: "Required fields missing." });
   }

   try {
      const signUpRequest = await signUpUser({ email, password });

      return res.status(200).json({ user: signUpRequest });
   } catch (error) {
      return next(error);
   }
});

usersRouter.post("/login", async (req, res, next) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res
         .status(404)
         .json({ error: true, message: "Required fields missing." });
   }

   try {
      const loginRequest = await loginUser({ email, password });

      return res.status(200).json({ user: loginRequest });
   } catch (error) {
      next(error);
   }
});

usersRouter.post(
   "/update-weight-preference",
   authMiddleware,
   async (req, res, next) => {
      const userId = req.user.user_id;
      const { weightUnitPreference } = req.body;

      try {
         await updateUserWeightPreference({
            userId,
            preference: weightUnitPreference,
         });

         res.status(200).json("Weight unit updated.");
      } catch (error) {
         next(error);
      }
   }
);

module.exports = usersRouter;
