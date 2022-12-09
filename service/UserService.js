require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validate,
  validateUser,
  validateChangePassword,
} = require("../model/User");
const { LoginView, UserView, UserListView } = require("../views/UserView");
const time = require("../utils/Time");
const ROLES = require("../model/Role");
const STATUS = {
  ACTIVE: "1",
  NOTACTIVE: "0",
};
const { pager } = require("../Middleware/Paginated");
// User login
const login = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password)) {
      res.status(400).json({ error: "fill all details", status: 400 });
    } else {
      console.log("!!");
      const userWithEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (!userWithEmail) {
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
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "2h" }
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
      res.send(user.user_name + "user created").status(200);
    }
  } catch (err) {
    res.send("errror" + err).status(400);
  }
};
//add user
const addUser = async (req, res) => {
  const body = req.body;
  try {
    const { error } = validateUser(body);
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
      res.send("user created").status(200);
    }
  } catch (err) {
    res.send("errror" + err).status(400);
  }
};
//get user by the primary key
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user == null) {
      res.status(404).send("Not Found");
    } else if (user.status == 0) {
      res.status(404).send("Not Found");
    } else {
      return new UserView(user);
    }
  } catch (err) {
    res.send("error" + err);
  }
};
//delete the user by change status to not alive and add del to orginal mail so that make unquie mail feature for stable
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user == null) {
      res.status(404).send("Not Found");
    } else if (user.status == 0) {
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
//change password by find by token and went through validation and change encypt the passwrd
const changePasswordService = async (req, res) => {
  let user = await User.findByPk(req.user.id);
  if (user == null) {
    res.status(404).send("Not Found");
  } else if (user.status == 0) {
    console.log("huu");
    res.status(404).send("Not Found");
  } else {
    const { error } = validateChangePassword(req.body);
    if (error) res.send(error.details[0].message);
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.new_password, salt);
      let oldPassword = await bcrypt.compare(
        req.body.old_password,
        user.password
      );
      if (!oldPassword) {
        res.send("password doesnt match with old password").status(400);
      } else {
        user.update({ password: hashedPassword });
        res.send("password is updated").status(200);
      }
    }
  }
};
//get all users through the pager class which has sorting,pagination and search are included

const getAllUsers = async (req, res) => {
  try {
    const result = await pager(
      User,
      req.query.page || 1,
      req.query.limit || 3,
      req.query.searchCol || "user_name",
      req.query.searchKey,
      req.query.sortCol || "user_id",
      req.query.sortMeth
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};
//get accessToken using refresh token
const getAccessTokenService = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(403).send("refresh token is required");
    }
    const decodedRefreshToken = jwt.decode(refreshToken, process.env.TOKEN_KEY);
    console.log(decodedRefreshToken);
    if (
      decodedRefreshToken.purpose === "REFRESH_TOKEN" &&
      jwt.verify(refreshToken, process.env.TOKEN_KEY)
    ) {
      const user = await User.findByPk(decodedRefreshToken.id);
      const accessToken = jwt.sign(
        {
          user_id: user.user_id,
          role: user.user_type,
          purpose: "ACCESS_TOKEN",
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "8h" }
      );
      return new LoginView(user, accessToken, refreshToken);
    } else {
      res.status(401).send("Invalid token");
    }
  } catch (error) {
    res.send("Error" + error);
  }
};

module.exports = {
  login,
  addUsers,
  addUser,
  getUserById,
  deleteUserById,
  changePasswordService,
  getAllUsers,
  getAccessTokenService,
};
