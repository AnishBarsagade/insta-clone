const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
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
  req.user = decoded;

  next();
}

module.exports = identifyUser;
