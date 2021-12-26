import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

const EditProject = () => {
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.

  const [user, setUser] = useState({
    name: "",
    projectdesc: "",
    startdate: "",
    employeeid: "",
  });

  const { name, projectdesc, startdate, employeeid } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateProject = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/v1/project/${id}`, user);
    history.push("/");
  };

  const loadUser = () => {
    fetch(`http://localhost:5000/api/v1/project/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUser({
          id: id,
          update: true,
          name: result.response[0].name,
          projectdesc: result.response[0].projectdesc,
          startdate: result.response[0].startdate,
          employeeid: result.response[0].employeeid,
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Update Project</h4>

          <h5 className="text-success">Project ID : {user.id} </h5>
          <form onSubmit={updateProject}>
            <div class="form-group">
              <label style={{ float: "left" }}>Name</label>
              <input
                type="text"
                class="form-control  mb-4"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter full name"
                required="true"
                minlength="10"
                maxlength="80"
                pattern="[a-zA-Z0-9]+"
              />
            </div>
            <div class="form-group">
              <label style={{ float: "left" }}>Description</label>
              <textarea
                type="text"
                class="form-control  mb-4"
                name="projectdesc"
                value={projectdesc}
                onChange={(e) => onInputChange(e)}
                placeholder="Enter description"
                required="true"
                minlength="50"
                maxlength="300"
              />
            </div>
            <div class="form-group">
              <label style={{ float: "left" }}>Select Date</label>
              <Form.Control
                type="date"
                name="startdate"
                value={startdate}
                placeholder="Start Date"
                required="true"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <br />
            <div class="form-group">
              <label style={{ float: "left" }}>Employee</label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="employeeid"
                value={employeeid}
                onChange={(e) => onInputChange(e)}
              >
                <option selected>Please select employee</option>
                <option value="Employee1">Employee1</option>
                <option value="Employee2">Employee2</option>
                <option value="Employee3">Employee3</option>
              </select>
            </div>
            <br />

            <button
              // onClick={updateProject}
              type="submit"
              className="btn btn-secondary btn-block"
            >
              Update Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
