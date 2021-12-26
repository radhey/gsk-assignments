const ProjectModel = require("../model/project.model");

// get all project list
exports.getProjectList = (req, res) => {
  ProjectModel.getAllProject((err, project) => {
    if (err) res.send(err);
    console.log("project", project);
    res.send(project);
  });
};

// create new project
exports.createNewProject = (req, res) => {
  const projectReqData = new ProjectModel(req.body);
  console.log("projectReqData", projectReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    ProjectModel.createProject(projectReqData, (err, projects) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Project Created Successfully",
        data: projects.insertId,
      });
    });
  }
};

// get project by ID  for Update
exports.getProjectByID = (req, res) => {
  //console.log('get project by id');
  ProjectModel.getProjectByID(req.params.id, (err, projects) => {
    if (err) res.send(err);
    console.log("single project data", projects);
    res.send(JSON.stringify({ status: 200, error: null, response: projects }));
  });
};

// update project
exports.updateProject = (req, res) => {
  const projectReqData = new ProjectModel(req.body);
  console.log("projectReqData update", projectReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    ProjectModel.updateProject(
      req.params.id,
      projectReqData,
      (err, employee) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Project updated Successfully" });
      }
    );
  }
};
