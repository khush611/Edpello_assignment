import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./details.css";
function Details() {
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  var keyArr = [];
  var valArr = [];
  useEffect(() => {
    fetch("https://reqres.in/api/unknown")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data[1]);

        for (let key in data.data[1]) {
          keyArr.push(key);
          valArr.push(data.data[1][key]);
        }
        setKeys(keyArr);
        setValues(valArr);
        console.log("keyarr: " + keyArr);
        console.log("valarr: " + valArr);
      });
  }, []);
  return (
    <>
      {/**Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <h3> Edpello</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Login <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/details">
                My Details
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/edit">
                Edit My Details
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <h1>My Details</h1>
      {/**key row pair */}
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
            <h3>Keys:</h3>
            {keys.map((item) => (
              <div key={item} className="keyItem">
                {item} :
              </div>
            ))}
          </div>
          <div className="col col-lg-2">
            <h3>Values</h3>
            {values.map((item) => (
              <div>
                <input type="text" value={item} key={item} disabled />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Details;
