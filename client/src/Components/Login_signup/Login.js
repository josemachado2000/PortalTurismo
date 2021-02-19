// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import "./Login.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

// TODO FUNCTIONS ----------------------------------------------------------------------------- //
async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

// TODO LOGIN --------------------------------------------------------------------------------- //
export default function Login({ setToken }) {
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const submitLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    if (
      token["message"] === "Error 404: User not found!" ||
      token["message"] === "Error 500: User not found!"
    ) {
      localStorage.clear(token);
      window.location.href = "/login";
    }
    if (token.data.user.estado === "Inativo") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "A sua conta parece ter sido desativada por um administrador!",
        footer: "Para mais informações contacte um administrador do site.",
      });
      setInterval(() => {
        localStorage.clear(token);
        window.location.href = "/login";
      }, 2500);
    } else {
      setToken(token);
      history.push("/");
    }
  };

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={submitLogin}>
        <h3>Login</h3>

        <div className="form-group required">
          <label className="requiredLabel">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Introduza o username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group required">
          <label className="requiredLabel">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Introduza a password"
            required
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          style={{ position: "relative" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
