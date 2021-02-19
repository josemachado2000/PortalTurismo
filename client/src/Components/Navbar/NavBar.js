// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Cart from "../Cart/Cart";

import { connect } from "react-redux";
import { getNumbers } from "../../Actions/basketActions";

// TODO NAVBAR ------------------------------------------------------------------------------- //
function NavBar(props) {
  useEffect(() => {
    getNumbers();
  }, []);

  if (!props.token) {
    // console.log("NavBar => Nao tem Token: " + token);
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Portal de Turismo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/products">Produtos</Nav.Link>
            <Nav.Link href="/services">Serviços</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/cart">
              <i
                className="fa fa-shopping-cart"
                style={{ paddingRight: "5px" }}
              />
              Carrinho
              <span className="badge" style={{ boxShadow: "none" }}>
                {props.basketProps.basketNumbers}
              </span>
            </Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
  // console.log(token);
  if (props.token.data.userType === "admin") {
    // console.log("NavBar => Tem Admin Token: " + token);
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Portal de Turismo</Navbar.Brand>
          {/* <Nav className="mr-auto">
            <Nav.Link href="/products">Produtos</Nav.Link>
            <Nav.Link href="/products">Fornecedores</Nav.Link>
          </Nav> */}
          <Nav className="ml-auto">
            <Nav.Link href="/logout">Log Out</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
  if (props.token.data.userType === "client") {
    // console.log("NavBar => Tem Client Token: " + token);
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Portal de Turismo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/client/products">Produtos</Nav.Link>
            <Nav.Link href="/client/services">Serviços</Nav.Link>
            <Nav.Link href="/client/orders">Minhas Encomendas</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/client/cart">
              <i
                className="fa fa-shopping-cart"
                style={{ paddingRight: "5px" }}
              />
              Carrinho
              <span className="badge" style={{ boxShadow: "none" }}>
                {props.basketProps.basketNumbers}
              </span>
            </Nav.Link>
            <Nav.Link href="/client/profile">Perfil</Nav.Link>
            <Nav.Link href="/client/logout">Log Out</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
  if (props.token.data.userType === "supplier") {
    // console.log("NavBar => Tem Supplier Token: " + token);
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/supplier/shops">Portal de Turismo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/supplier/shops">Lojas</Nav.Link>
            <Nav.Link href="/supplier/products">Meus Produtos</Nav.Link>
            <Nav.Link href="/supplier/services">Meus Serviços</Nav.Link>
            <Nav.Link href="/supplier/orders">Encomendas</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/supplier/profile">Perfil</Nav.Link>
            <Nav.Link href="/supplier/logout">Log Out</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  basketProps: state.basketState,
});

export default connect(mapStateToProps, { getNumbers })(NavBar);
