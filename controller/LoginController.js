require("dotenv").config();
const { login, getAccessTokenService } = require("../service/UserService");

// Login

const UserLoginController = async (req, res) => {
  try {
    let loginService = await login(req, res);
    res.send(loginService);
  } catch (err) {
    res.json(err);
  }
};
const getAccessToken = async (req, res) => {
  try {
    let newAccessToken = await getAccessTokenService(req, res);
    res.status(200).send(newAccessToken);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { UserLoginController, getAccessToken };
