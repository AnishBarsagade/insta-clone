const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware");
// created the register api
authRouter.post("/register", authController.registerController);

//created the login api
authRouter.post("/login", authController.loginController);

//created the get-me api
authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter;
