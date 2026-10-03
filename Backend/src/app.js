const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//require routes
const authRouter = require("./Routes/auth.routes");
const postRouter = require("./Routes/post.routes");
const userRouter = require("./Routes/user.routes");

//middlewares
app.use(express.json());
app.use(cookieParser());

// prefixes,using routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
