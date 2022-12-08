const express = require("express");
require("dotenv").config();
const router = express.Router();
const {userLogin,getAccessToken} = require("../controller/LoginController");

// Login user
router.post("/", userLogin);
//get access token using refresh token
router.put("/",getAccessToken)
module.exports = router;
