const jwt = require("jsonwebtoken");
require("dotenv").config();

//verify the token which user are just login
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const adminAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};
const currentUser = (req, res, next) => {
  verifyToken(req, res, () => {
    req.current_user= req.user.id;
  });
};

module.exports = { verifyToken, adminAccess, currentUser };
