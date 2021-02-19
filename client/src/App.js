// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { getProductsDB } from "./Actions/getProductsAction";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";

import NavBar from "./Components/Navbar/NavBar";

import SignUpOption from "./Components/Login_signup/SignUpOption";
import Login from "./Components/Login_signup/Login";
import useToken from "./Components/Login_signup/useToken";

import AdminHome from "./Views/Admin/AdminHome";
import ClientHome from "./Views/Cliente/ClientHome";
import SupplierHome from "./Views/Supplier/SupplierHome";
import AnonymousHome from "./Views/Anonymous/AnonymousHome";

import Services from "./Components/Services/Services";
import Products from "./Components/Products/Products";
import ProductDetail from "./Components/Products/ProductDetail";
import Cart from "./Components/Cart/Cart";
import Reserva from "./Components/Services/Reserva";

// TODO APP ----------------------------------------------------------------------------------- //
export default function App() {
  const { token, setToken } = useToken();

  store.dispatch(getProductsDB());

  if (!token) {
    // console.log("App    => Não tem Token: " + token);
    return (
      <Provider store={store}>
        <div>
          <NavBar token={token} />
          <BrowserRouter>
            <Switch>
              {/* <Route exact path="/">
                <AnonymousHome />
              </Route> */}
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/services">
                <Services />
              </Route>
              <Route path="/services/reserva/:idServico">
                <Reserva />
              </Route>
              <Route path="/cart">
                <Cart token={token} />
              </Route>
              <Route path="/signup">
                <SignUpOption />
              </Route>
              <Route path="/login">
                <Login setToken={setToken} />
              </Route>
              <Route path="/products/:id">
                <ProductDetail />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
  if (token.data.userType === "admin") {
    // console.log("App    => Tem Admin Token: " + token);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route>
              <AdminHome token={token} />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
  if (token.data.userType === "client") {
    // console.log("App    => Tem Client Token: " + token);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route>
              <ClientHome token={token} />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
  if (token.data.userType === "supplier") {
    // console.log("App    => Tem Supplier Token: " + token);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route>
              <SupplierHome token={token} />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
