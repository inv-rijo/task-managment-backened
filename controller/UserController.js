const { addUsers,addUser,getUserById ,deleteUserById,changePasswordService} = require("../service/UserService");
const {currentUser}=require('../Middleware/Auth');
const addAdmin = async (req, res) => {
  try {
    await addUsers(req, res);
  } catch (error) {
    console.log(error.message);
  }
};
const addUserController = async (req, res) => {
  try {
    await addUser(req, res);
  } catch (error) {
    console.log(error.message);
  }
};
const getUserByIdController=async(req,res)=>{
    try {console.log(req.params.id+"params");
     let user=   await getUserById(req,res);
     res.send(user).status(200)
    } catch (error) {
        console.log(error.message);
    }
}
const deleteUserByIdController= async(req,res)=>{
    try {
        await deleteUserById(req,res)
    } catch (error) {
        res.send("error"+ error).status(400)
    }
}
const changePassword= async(req,res)=>{
  console.log("hhhhhi");
  console.log(req.user.id);
  try {
    await changePasswordService(req,res)
  } catch (error) {
    console.log(error);
  }
}
module.exports = { addAdmin, addUserController,getUserByIdController,deleteUserByIdController,changePassword };
