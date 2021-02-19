// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../../Components/Products/Products.css";

import Products from "../../Components/Products/Products";
import ProductDetail from "../../Components/Products/ProductDetail";
import NavBar from "../../Components/Navbar/NavBar";
import LogOut from "../../Components/Login_signup/LogOut";
import Services from "../../Components/Services/Services";
import Profile from "../../Components/Profile/Profile";
import Cart from "../../Components/Cart/Cart";
import Checkout from "../../Components/Cart/Checkout";
import ClientOrders from "../../Components/Cliente/ClientOrders";
import Order from "../../Components/Cliente/Order";
import Reserva from "../../Components/Services/Reserva";

// TODO CLIENT HOME ---------------------------------------------------------------------------- //
export default function ClientHome({ token }) {
  return (
    <div>
      <NavBar token={token} />
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/">
              <ClientHome />
            </Route> */}
          <Route path="/client/products">
            <Products />
          </Route>
          <Route path="/products/:idProduto">
            <ProductDetail />
          </Route>
          <Route path="/client/services">
            <Services />
          </Route>
          <Route path="/services/reserva/:idServico">
            <Reserva />
          </Route>
          <Route path="/client/orders">
            <ClientOrders token={token} />
          </Route>
          {/* <Route path="/client/orders/:idOrder">
            <Order />
          </Route> */}
          <Route path="/client/cart">
            <Cart token={token} />
          </Route>
          <Route path="/client/checkout">
            <Checkout token={token} />
          </Route>
          <Route path="/client/profile">
            <Profile token={token} />
          </Route>
          <Route path="/client/logout">
            <LogOut token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
