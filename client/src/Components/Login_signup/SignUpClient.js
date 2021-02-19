// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";

import "./SignUp.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

// TODO SIGNUP --------------------------------------------------------------------------------- //
export default function SignUpClient() {
  const [name, setName] = useState();
  const [nameApp, setNameApp] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [users, setUsers] = useState();
  var existe = false;

  const fetchData = async () => {
    const result = await fetch("http://localhost:5000/users");
    const user = await result.json();
    setUsers(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();

    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        existe = true;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "O username inserido já existe!",
        });
      }
    }
    console.log(name);
    if (existe === false) {
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          email,
          contact,
          username,
          password,
        }),
      }).then(async () => {
        fetch("http://localhost:5000/clients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameApp,
            username,
          }),
        }).then((data) => {
          if (data.status === 200) {
            setName("");
            setNameApp("");
            setAddress("");
            setEmail("");
            setContact("");
            setUsername("");
            setPassword("");
            window.location.href = "/login";
          }
        });
      });
    }
  };

  return (
    <div className="signUpPage">
      <Form className="signUpForm" onSubmit={submitLogin}>
        <h3>Cliente</h3>
        <Form.Group controlId="formGridEmail" className="required">
          <Form.Label className="requiredLabel">Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduza o seu nome"
            style={{ width: "660px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGridPassword" className="required">
          <Form.Label className="requiredLabel">Nome Perfil</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduza um nome para o perfil"
            style={{ width: "660px" }}
            value={nameApp}
            onChange={(e) => setNameApp(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress1" className="required">
          <Form.Label className="requiredLabel">Morada</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduza a sua morada"
            style={{ width: "660px" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Row style={{ marginTop: "30px" }}>
          <Form.Group
            as={Col}
            controlId="formGridAddress2"
            className="required"
          >
            <Form.Label className="requiredLabel">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduza o seu email"
              style={{ width: "660px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity" className="required">
            <Form.Label className="requiredLabel">Contacto</Form.Label>
            <Form.Control
              type="number"
              placeholder="Introduza o seu contacto"
              style={{ width: "660px" }}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formGridAddress2"
            className="required"
          >
            <Form.Label className="requiredLabel">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduza o username"
              style={{ width: "660px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity" className="required">
            <Form.Label className="requiredLabel">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introduza a password"
              style={{ width: "660px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Row>

        <Button
          variant="dark"
          type="submit"
          style={{ position: "relative", marginTop: "5px" }}
        >
          Registar
        </Button>
      </Form>
    </div>
  );
}
