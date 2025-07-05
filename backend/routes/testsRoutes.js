const testRouter = require("express").Router(); 

testRouter.get("/", (req, res) => {
   return res.status(200).json({ status: "ok" });
});

testRouter.get("/throw-error", (req, res, next) => {
   try {
      throw new Error("TEST TEST TEST from /throw-error endpoint");
   } catch (error) {
      next(error);
   }
});

module.exports = testRouter;
