const { Sequelize } = require("sequelize");
const sequelize = require("../configuration/DbConnection");
const Joi = require('joi');
const { adminAccess } = require("../Middleware/Auth");
let regrex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/);
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department_id: {
      type: Sequelize.INTEGER,
    },
    password_token: {
      type: Sequelize.STRING,
    },
    user_type: {
      type: Sequelize.ENUM,
      values:['admin','manager','client','developer'],
      allowNull: false,
    },
    status: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt:"created_date",
    updatedAt:"updated_date"
  }
);
function validateUser(user) {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(18).pattern(regrex),
    user_type:Joi.required()
  });
  return schema.validate(user);
}
function validate(user) {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(18).pattern(regrex),
  });
  return schema.validate(user);
}
function validateChangePassword(user) {
  const schema = Joi.object({
    old_password: Joi.string().min(8).max(18).pattern(regrex).required(),
    new_password: Joi.string().min(8).max(18).pattern(regrex).required(),
  });
  return schema.validate(user);
}

module.exports = {User,validate,validateUser,validateChangePassword};
