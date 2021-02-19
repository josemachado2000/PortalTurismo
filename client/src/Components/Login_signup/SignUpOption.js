// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import SignUpClient from "./SignUpClient";
import SignUpSupplier from "./SignUpSupplier";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import "./SignUp.css";

// TODO SIGNUP --------------------------------------------------------------------------------- //
export default function SignUpOption() {
  return (
    <div className="signUpOptionPage">
      <Card className="col">
        <Card.Body>
          <Card.Title>Cliente</Card.Title>
          <Card.Text>
            Registe-se como cliente para poder comprar os nossos produtos.
          </Card.Text>
          <Link to={"/signup/client"}>
            <Button variant="primary">Registar</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card className="col">
        <Card.Body>
          <Card.Title>Fornecedor ou Lojista</Card.Title>
          <Card.Text>
            Registe-se como fornecedor ou lojista para poder criar a sua própria
            loja online e vender os seus produtos através do nosso site.
          </Card.Text>
          <Link to={"/signup/supplier"}>
            <Button variant="primary">Registar</Button>
          </Link>
        </Card.Body>
      </Card>
      <Switch>
        <Route path="/signup/client">
          <SignUpClient />
        </Route>
        <Route path="/signup/supplier">
          <SignUpSupplier />
        </Route>
      </Switch>
    </div>
  );
}
