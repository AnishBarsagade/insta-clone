const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
//image kit
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  //   console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access.",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "user not authorized.",
    });
  }
  console.log(decoded);

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created successfully.",
    post,
  });
}

async function getPostController(req, res) {
  //figure out the user
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }
  //to get user

  //scope
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token.",
    });
  }
  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });

  return res.status(200).json({
    message: "Post fetched successfully.",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  //figure out the user
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }
  //now verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  //now get the user id
  const userId = decoded.id;
  const postId = req.params.postId;
  //now find the post
  const post = await postModel.findById(postId);

  //If post not found
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully.",
    post,
  });
}
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
