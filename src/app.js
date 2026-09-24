const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./Routes/auth.routes");
const postRouter = require("./Routes/post.routes");

app.use(express.json());
app.use(cookieParser());
// prefixes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
module.exports = app;
