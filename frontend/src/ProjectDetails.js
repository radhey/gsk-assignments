import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

function ProjectDetail() {
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    id: "",
    name: "",
    projectdesc: "",
    startdate: "",
    employeeid: "",
  });

  //  Object Destructuring
  const { id, name, projectdesc, startdate, employeeid } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const loadEmployeeDetail = async () => {
    var response = fetch("http://localhost:5000/api/v1/project")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };
  useEffect(() => {
    loadEmployeeDetail();
  }, []);

  function makeid(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Insert Employee Records
  const submitEmployeeRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    user.id = makeid(3);
    await axios.post("http://localhost:5000/api/v1/project", user);
    alert("Data Inserted");

    loadEmployeeDetail();
  };

  return (
    <section>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link text-white" href="#">
                Home <span class="sr-only"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <div class="row mt-3">
          <div class="col-sm-4">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              <form onSubmit={submitEmployeeRecord}>
                <h5 className="mb-3 ">Create Project</h5>
                <div class="form-group">
                  <label style={{ float: "left" }}>Name</label>
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter name"
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

                <button type="submit" class="btn btn-primary btn-block mt-4">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-8">
            <h5 class="text-center  ml-4 mt-4  mb-5">Project List</h5>
            <table class="table table-hover  table-striped table-bordered ml-4 ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>Employee</th>
                </tr>
              </thead>
              <tbody>
                {record.map((name) => (
                  <tr>
                    <td>{name.id}</td>
                    <td>{name.name}</td>
                    <td>{name.projectdesc}</td>
                    <td>{name.startdate}</td>
                    <td>{name.employeeid}</td>

                    <td>
                      <Link class=" mr-2" to={`/EditProject/editID/${name.id}`}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
