const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// This is the post route
postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);
// GET/api/posts/[protected]
postRouter.get("/", postController.getPostController);

// GET/api/posts/details/:postId
postRouter.get("/details/:postId",postController.getPostDetailsController);


module.exports = postRouter;
