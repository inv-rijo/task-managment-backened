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
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
//adminaccess to the auth
const adminAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == 0) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};
//managerAccess to the auth
const managerAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == 1) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};

//employeeAccess to the auth
const employeeAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == 2) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};

//clientAccess to the auth
const clientAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == 3) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};


module.exports = { verifyToken, adminAccess,managerAccess,employeeAccess,clientAccess  };
