import React from "react";
import "./styles.css";
import Login from "../components/Login";
import Edit from "../components/Edit";
import Details from "../components/Details";
import { Link, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/details">
          <Details />
        </Route>
        <Route exact path="/edit">
          <Edit />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
