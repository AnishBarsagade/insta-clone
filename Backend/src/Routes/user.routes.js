const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
);

//now for changing the state
userRouter.patch(
  "/follow/:requestId/:status",
  identifyUser,
  userController.updateFollowStatus,
);
module.exports = userRouter;
