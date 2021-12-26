const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");

// get all employees
router.get("/", projectController.getProjectList);

// get employee by ID
router.get("/:id", projectController.getProjectByID);

// create new employee
router.post("/", projectController.createNewProject);

// update employee
router.put("/:id", projectController.updateProject);

module.exports = router;
