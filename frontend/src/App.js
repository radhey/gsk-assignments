import "bootstrap/dist/css/bootstrap.min.css";
import ProjectDetails from "./ProjectDetails";
import EditProject from "./EditProject";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
function App(props) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ProjectDetails} />
          <Route exact path="/EditProject/editID/:id" component={EditProject} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
