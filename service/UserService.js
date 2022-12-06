const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validate, validateUser,validateChangePassword } = require("../model/User");
const { LoginView, UserView } = require("../views/UserView");
const time = require("../utils/Time");
const ROLES = require("../model/Role");
const STATUS = {
  ACTIVE: "1",
  NOTACTIVE: "0",
};
const { NotFound } = require("../Middleware/Error");
// User login
const login = async (req, res) => {
  console.log("outer" + req.body);
  try {
    console.log(req.body);
    console.log("hiii");
    if (!(req.body.email && req.body.password)) {
      console.log("!");
      res.status(400).json({ error: "fill all details", status: 400 });
    } else {
      console.log("!!");
      const userWithEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (!userWithEmail) {
        console.log("!!!");
        res.status(404).json({ error: "User not found", status: 404 });
      } else if (
        await bcrypt.compare(req.body.password, userWithEmail.password)
      ) {
        const accessToken = jwt.sign(
          {
            id: userWithEmail.user_id,
            role: userWithEmail.user_type,
            purpose: "ACCESS_TOKEN",
          },
          process.env.TOKEN_KEY,
          { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign(
          {
            id: userWithEmail.user_id,
            role: userWithEmail.user_type,
            purpose: "REFRESH_TOKEN",
          },
          process.env.TOKEN_KEY,
          { expiresIn: "1d" }
        );

        return new LoginView(userWithEmail, accessToken, refreshToken);
      } else {
        res.status(400).json({ error: "Wrong password", status: 400 });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

//addUsers
const addUsers = async (req, res) => {
  const body = req.body;
  try {
    console.log(body);
    const { error } = validate(body);
    if (error) res.send(error.details[0].message);
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      let user = await User.create({
        user_name: body.user_name,
        email: body.email,
        password: hashedPassword,
        status: STATUS.ACTIVE,
        user_type: ROLES.ADMIN,
        create_date: time,
        update_date: time,
      });
      res.send("user created").status(200);
    }
  } catch (err) {
    res.send("errror" + err).status(400);
  }
};
//add user
const addUser = async (req, res) => {
  const body = req.body;
  try {
    console.log(body);
    const { error } = validateUser(body);
    console.log(body + "hhuhuhuhu");
    if (error) res.send(error.details[0].message);
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        process.env.PASSWORD_PREDEFINED,
        salt
      );
      console.log(hashedPassword);
      let user = await User.create({
        user_name: body.user_name,
        email: body.email,
        password: hashedPassword,
        status: STATUS.ACTIVE,
        user_type: body.user_type,
        create_date: time,
        update_date: time,
      });
      console.log(user);
      res.send("user created").status(200);
    }
  } catch (err) {
    res.send("errror" + err).status(400);
  }
};
const getUserById = async (req, res) => {
  console.log(req.params.id);
  try {
    console.log("keriyo?");
    console.log(req.params.id);
    const user = await User.findByPk(req.params.id);
    console.log(user);
    console.log(user);
    if (user == null) {
      res.status(404).send("Not Found");
    } else if (user.status == 0) {
      console.log("huu");
      res.status(404).send("Not Found");
    } else {
      return new UserView(user);
    }
  } catch (err) {
    res.send("error" + err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user == null) {
      res.status(404).send("Not Found");
    } else if (user.status == 0) {
      console.log("huu");
      res.status(404).send("Not Found");
    } else {
      let username = user.user_name;
      user.update({ status: 0, email: "del" + user.email, update_date: time });
      res.send(username + ": user deleted");
    }
  } catch (err) {
    res.send("error" + err).status(500);
  }
};
const changePasswordService=async(req,res)=>{
  console.log(req.user.id+"service");
  let user = await User.findByPk(req.user.id);
  if (user == null) {
    res.status(404).send("Not Found");
  } else if (user.status == 0) {
    console.log("huu");
    res.status(404).send("Not Found");
  } else {
    const { error } = validate(req.body);
    if (error) res.send(error.details[0].message);
    else{
      req.body.oldPassword
    }

  }
}

module.exports = { login, addUsers, addUser, getUserById, deleteUserById,changePasswordService };
