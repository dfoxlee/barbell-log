const usersRouter = require("express").Router();
const {
   signUpUser,
   loginUser,
   updateUnitPreferences,
} = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateVerificationToken } = require("../services/users.services");
const { validateToken } = require("../utils/authUtils");
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
   "/update-unit-preferences",
   authMiddleware,
   async (req, res, next) => {
      const userId = req.user.user_id;

      const { weightUnitPreference, distanceUnitPreference } = req.body;

      try {
         await updateUnitPreferences({
            userId,
            weightUnitPreference,
            distanceUnitPreference,
         });

         res.status(200).json("Weight unit updated.");
      } catch (error) {
         next(error);
      }
   }
);

usersRouter.get("/:verificationToken", async (req, res, next) => {
   const verificationToken = req.params["verificationToken"];
   
   if (!verificationToken) {
      return res
      .status(400)
      .json({ error: true, message: "Verification token not provided." });
   }
   
   try {
      await validateVerificationToken({ verificationToken });

      return res
         .status(200)
         .json({ error: false, message: "Verification token validated." });
   } catch (error) {
      return res.status(500).json({
         error: true,
         message: "Something went wrong validating token.",
      });
   }
});

module.exports = usersRouter;
