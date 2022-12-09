const { Sequelize } = require("sequelize");
const sequelize = require("../configuration/DbConnection");
const Joi = require("joi");
const Project = sequelize.define(
    "project",
    {
      project_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      project_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_date",
      updatedAt: "updated_date",
    }
  );
  function validateProject(project){
    const schema=Joi.object({
        projectCode:Joi.string().required(),
        projectName:Joi.string().required(),
        projectDescription:Joi.string().required(),
        startDate:Joi.date().required(),
        endDate:Joi.date().required()

    });
    return schema.validate(project);
  }
  module.exports={Project,validateProject}