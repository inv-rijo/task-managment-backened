const express = require("express");
require("dotenv").config();
const router = express.Router();
const { UserLoginController, getAccessToken } = require("../controller/LoginController");
const notifier = require("node-notifier");
// Login user
router.post("/", UserLoginController);
//get access token using refresh token
router.put("/", getAccessToken);
module.exports = router;
//get notification sample 
router.get("/", async (req, res) => {
  notifier.notify({
    title: 'Greetings',
    message: 'Hello!'
  });
});
