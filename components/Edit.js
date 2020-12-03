import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./details.css";
function Edit() {
  const [postId, setPostId] = useState("");
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [logout, setLogout] = useState(false);
  const [code, setCode] = useState("");
  const [close, setClose] = useState(false);
  var keyArr = [];
  var valArr = [];
  const data = {
    name: "Tenali Ramakrishna",
    gender: "Male",
    email: "tenali.ramakrishna@5ce.com",
    status: "Active"
  };
  const TOKEN =
    "780c321a459f5f09c107c35764efc8d61f7ebb0029e1297bd7e9911c70d3ee4c";
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
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
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  function handleLogout() {
    setLogout(true);
    fetch("https://gorest.co.in/public-api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 780c321a459f5f09c107c35764efc8d61f7ebb0029e1297bd7e9911c70d3ee4c"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCode(`${data.code}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function handleClose() {
    setClose(true);
  }
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

      <h1>Edit My Details</h1>
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
              <div key={item}>
                <input type="text" placeholder={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Logout
      </button>
      {/* <div>{logout && code ? alert("Response code: " + code) : null}</div> */}
      {/**modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Post Response
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="text-success"> Code : {code}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>{close ? <Redirect to="/" /> : null}</div>
    </>
  );
}
export default Edit;
