import React, { useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);
  const [login, setLogin] = useState(false);
  const [authentication, setAuthentication] = useState(true);

  const [enable, setEnable] = useState(false);
  const [edit, setEdit] = useState(false);
  function handleName(event) {
    setUsername(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (load) {
      if (!name || !emailid) {
        setAuthentication(false);
        alert("empty value not allowed");
      } else {
        setAuthentication(true);
        setName(name);
        setEmailid(emailid);
      }
    } else {
      if (!username || !email) {
        setAuthentication(false);
        alert("empty value not allowed");
      } else {
        setAuthentication(true);
        setName(username);
        setEmailid(email);
      }
    }
    //     load ? setName(name) : setName(username);
    //     load ? setEmailid(emailid) : setEmailid(email);
    setLogin(true);
    setEnable(true);
    console.log(name + " " + emailid);
    setUsername("");
    setEmail("");
  }

  function handleLoad() {
    setLoad(true);
    setLogin(false);

    /**changed for redirect */

    fetch("https://reqres.in/api/users/2")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(
          data.data.id + " " + data.data.first_name + " " + data.data.email
        );
        setId(data.data.id);
        setName(data.data.first_name);
        setEmailid(data.data.email);
      });
  }

  return (
    <div>
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
            {login ? (
              <li className="nav-item">
                <Link className="nav-link" to="/details">
                  My Details
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link disabled" to="/details">
                  My Details
                </Link>
              </li>
            )}
            {login ? (
              <li className="nav-item">
                <Link className="nav-link" to="/edit">
                  Edit My Details
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link disabled" to="/edit">
                  Edit My Details
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/**form */}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div class="inputs">
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                Username
              </span>
            </div>

            <input
              placeholder="Email"
              name="email"
              value={load ? emailid : email}
              onChange={handleEmail}
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                Password
              </span>
            </div>
            <input
              type="password"
              placeholder="Password"
              name="username"
              value={load ? name : username}
              onChange={handleName}
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
        </div>

        <br />

        <button>Login</button>
      </form>
      <button onClick={handleLoad}>Load</button>
      {/* <h1>{name}</h1>
      <h2>{emailid}</h2> */}
      {login && authentication ? <Redirect to="/details" /> : null}
    </div>
  );
}
export default Login;
