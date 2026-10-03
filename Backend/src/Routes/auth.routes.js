const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

// created the register api
authRouter.post("/register", authController.registerController);

//created the login api
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
