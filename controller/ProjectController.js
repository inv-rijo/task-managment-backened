const { addProjectService } = require("../service/ProjectService");

const addProjectController = async (req, res) => {
  await addProjectService(req, res);
};
module.exports = { addProjectController };
