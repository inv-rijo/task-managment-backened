const {
  addUsers,
  addUser,
  getUserById,
  deleteUserById,
  changePasswordService,
  getAllUsers,
} = require("../service/UserService");

//add admin through controller
const addAdmin = async (req, res) => {
  try {
    await addUsers(req, res);
  } catch (error) {
    console.log(error.message);
  }
};
//add new users by the admin
const addUserController = async (req, res) => {
  try {
    await addUser(req, res);
  } catch (error) {
    console.log(error.message);
  }
};
//get user by id
const getUserByIdController = async (req, res) => {
  try {
    console.log(req.params.id + "params");
    let user = await getUserById(req, res);
    res.send(user).status(200);
  } catch (error) {
    console.log(error.message);
  }
};
//delete user by their id
const deleteUserByIdController = async (req, res) => {
  try {
    await deleteUserById(req, res);
  } catch (error) {
    res.send("error" + error).status(400);
  }
};
//change password of their own
const changePassword = async (req, res) => {
  console.log(req.user.id);
  try {
    await changePasswordService(req, res);
  } catch (error) {
    console.log(error);
  }
};

//get All users through pager
const getAllUsersController = async (req, res) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addAdmin,
  addUserController,
  getUserByIdController,
  deleteUserByIdController,
  changePassword,
  getAllUsersController,
};
