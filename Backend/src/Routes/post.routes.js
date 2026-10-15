const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
//middlewares
const identifyUser = require("../middlewares/auth.middleware");

// This is the post route
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);
// GET/api/posts/[protected]
postRouter.get(
  "/",
  identifyUser,
  identifyUser,
  postController.getPostController,
);

// GET/api/posts/details/:postId
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/**
 * @route POST/api/posts/like/:postid
 * @description like a post if postid is given.
 */
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

/**
 * @route GET/api/posts/feed
 * @description get all the posts created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController);

module.exports = postRouter;
