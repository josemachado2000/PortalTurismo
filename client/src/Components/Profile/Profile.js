// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";
// import { useAxiosGet } from "../../Hooks/HttpRequests";

import "./Profile.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// TODO PROFILE -------------------------------------------------------------------------------- //
export default function Profile({ token }) {
  // const [file, setFile] = useState();
  const [name, setName] = useState();
  // const [nameApp, setNameApp] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [nacionality, setNacionality] = useState();
  const [birthdayDate, setBirthdayDate] = useState();
  const [biography, setBiography] = useState();

  const [users, setUsers] = useState();
  console.log(token);
  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:5000/users/${token.data.user.idUser}`
    );
    const user = await result.json();
    setUsers(user);
    console.log(user);

    setName(user.nome);
    // setNameApp(token.data.user.nomeApp);
    setAddress(user.morada);
    setEmail(user.email);
    setContact(user.contacto);
    setUsername(user.username);
    setPassword(user.password);
    setNacionality(user.nacionalidade);
    setBirthdayDate(user.dataNascimento);
    setBiography(user.biografia);

    // if (token.data.userType === "admin") {
    //   console.log("admin");
    //   const result = await fetch(
    //     `http://localhost:5000/admins/image/${token.data.user.idUser}`
    //   );
    //   const admin = await result.json();
    //   console.log(admin);
    //   setFile(admin.imagem);
    // }
    // if (token.data.userType === "client") {
    //   console.log("client");
    //   const result = await fetch(
    //     `http://localhost:5000/clients/image/${token.data.user.idUser}`
    //   );
    //   const client = await result.json();
    //   console.log(client);
    //   setFile(client.imagem);
    // }
    // if (token.data.userType === "supplier") {
    //   console.log("supplier");
    //   const result = await fetch(
    //     `http://localhost:5000/suppliers/image/${token.data.user.idUser}`
    //   );
    //   const supplier = await result.json();
    //   console.log(supplier);
    //   setFile(supplier.imagem);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const changeProfileImage = (e) => {
  //   setFile(e[0].name);
  // };

  const updateProfile = (idUser) => {
    fetch(`http://localhost:5000/users/${idUser}`, {
      method: "PUT",
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
        // nameApp,
        nacionality,
        birthdayDate,
        biography,
      }),
    }).then(() => fetchData());
    // if (token.data.userType === "admin") {
    //   console.log("admin");
    // }
    // if (token.data.userType === "client") {
    //   console.log("client");
    // }
    // if (token.data.userType === "supplier") {
    //   console.log("supplier");
    // }
  };

  var content = null;
  console.log(users);
  if (users) {
    content = (
      <Container className="cardProfile">
        <Row>
          <Col>
            <h3>User Profile</h3>
            {/* <img
              src={require(`../../assets/profileImages/${file}`).default}
              style={{
                width: "350px",
                height: "350px",
                borderRadius: "10px",
              }}
              alt=""
            /> */}
            {/* <Form.Group>
                  <Form.Label>Alterar imagem</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    onChange={(e) => setFile(e.target.files)}
                  />
                </Form.Group> */}
            <div
              style={{
                width: "350px",
                marginTop: "20px",
              }}
            >
              {/* <Form.Group>
                <Form.Label>Nome de Perfil</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={token.data.user.nomeApp}
                  onChange={(e) => setNameApp(e.target.value)}
                />
              </Form.Group> */}
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group style={{ marginTop: "101px" }}>
                <Form.Label>Biografia</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  defaultValue={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  style={{
                    height: "210px",
                  }}
                />
              </Form.Group>
            </div>
          </Col>
          <Col style={{ marginTop: "53px" }}>
            <Form className="form">
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Morada</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contacto</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nacionalidade</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={nacionality}
                  onChange={(e) => setNacionality(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={birthdayDate}
                  onChange={(e) => setBirthdayDate(e.target.value)}
                />
              </Form.Group>
              <Button
                style={{
                  position: "relative",
                  float: "right",
                  marginTop: "20px",
                }}
                variant="dark"
                onClick={(e) => updateProfile(users.idUser)}
              >
                Atualizar Perfil
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  return <div className="profilePage">{content}</div>;
}
