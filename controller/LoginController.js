const express = require("express");
require("dotenv").config();
const {login} = require("../service/UserService");

// Login

const userLogin = async (req, res) => {
  try {
      let loginService = await login(req,res);
      res.send(loginService)
  } catch (err) {
    res.json(err);
  }
}

module.exports = userLogin;
