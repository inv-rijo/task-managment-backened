const express = require("express");
require("dotenv").config();
const router = express.Router();
const userLogin = require("../controller/LoginController");

// Login user
router.post("/", userLogin);

module.exports = router;
