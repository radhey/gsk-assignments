var dbConn = require("../../config/db.config");

var Project = function (employee) {
  this.id = employee.id;
  this.name = employee.name;
  this.projectdesc = employee.projectdesc;
  this.startdate = employee.startdate;
  this.employeeid = employee.employeeid;
};

// get all projects
Project.getAllProject = (result) => {
  dbConn.query("SELECT * FROM projects", (err, res) => {
    if (err) {
      console.log("Error while fetching projects", err);
      result(null, err);
    } else {
      console.log("Projects fetched successfully");
      result(null, res);
    }
  });
};

// create new project
Project.createProject = (employeeReqData, result) => {
  dbConn.query("INSERT INTO projects SET ?", employeeReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data", err);
      result(null, err);
    } else {
      console.log("Project created successfully");
      result(null, res);
    }
  });
};

// get employee by ID for update
Project.getProjectByID = (id, result) => {
  dbConn.query("SELECT * FROM projects WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching project by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// update employee
Project.updateProject = (id, employeeReqData, result) => {
  dbConn.query(
    "UPDATE projects SET name=?,projectdesc=?,startdate=?,employeeid=? WHERE id = ?",
    [
      employeeReqData.name,
      employeeReqData.projectdesc,
      employeeReqData.startdate,
      employeeReqData.employeeid,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the project", err);
        result(null, err);
      } else {
        console.log("Project updated successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Project;
