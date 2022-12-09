const express = require("express");
require("dotenv").config();
const router = express.Router();
const {
  addAdmin,
  addUserController,
  getUserByIdController,
  deleteUserByIdController,
  changePassword,
  getAllUsersController,
} = require("../controller/UserController");
const{addProjectController} =require('../controller/ProjectController')
const { adminAccess, currentUser } = require("../Middleware/Auth");
// add admin
router.post("/", addAdmin);
//change password
router.put("/changepassword", [adminAccess], changePassword);
//add users
router.post("/users", adminAccess, addUserController);
//get a user by their id
router.get("/users/:id", adminAccess, getUserByIdController);
//get a user by their id
router.delete("/users/:id", adminAccess, deleteUserByIdController);
//get all users
router.get("/users", adminAccess, getAllUsersController);
//add new project and assign to manager
router.post("/projects", adminAccess, addProjectController);
module.exports = router;
