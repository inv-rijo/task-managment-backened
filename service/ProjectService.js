const { Project, validateProject } = require("../model/Project");
const time = require("../utils/Time");

const STATUS = {
  ACTIVE: "1",
  NOTACTIVE: "0",
};
const addProjectService = async (req, res) => {
  try {
    const { error } = validateProject(req.body);
    if (error) res.send(error.details[0].message);
    else {
      await Project.create({
        project_code: req.body.projectCode,
        project_name: req.body.projectName,
        project_description: req.body.projectDescription,
        status: STATUS.ACTIVE,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        user_id: req.body.manager,
        created_date: time,
        updated_date: time,
      });
      res.send("project added" + req.body.projectName);
    }
  } catch (error) {
    res.send(error).status(400);
  }
};
module.exports = { addProjectService };
