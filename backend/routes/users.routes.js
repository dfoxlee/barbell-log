const authMiddleware = require("../middleware/authMiddleware");
const UsersController = require("../controller/user.controller");
const { debugConsoleLog } = require("../utils/debuggingUtils");

const usersRouter = require("express").Router();

usersRouter.post("/sign-up", UsersController.signup);

usersRouter.post("/login", UsersController.login);

usersRouter.post(
   "/update-unit-preferences",
   authMiddleware,
   UsersController.updateUnitPreference
);

usersRouter.post(
   "/update-password",
   authMiddleware,
   UsersController.updatePassword
);

usersRouter.get("/logout", authMiddleware, UsersController.logout);

usersRouter.get("/:confirmationToken", UsersController.confirmEmail);

usersRouter.delete("/", authMiddleware, UsersController.deleteUser);

usersRouter.delete("/data", authMiddleware, UsersController.deleteAllUserData);

module.exports = usersRouter;
