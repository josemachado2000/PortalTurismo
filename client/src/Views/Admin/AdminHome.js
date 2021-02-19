// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "../../Components/Navbar/NavBar";
import LogOut from "../../Components/Login_signup/LogOut";

import SuppliersList from "../../Components/SuppliersList/SuppliersList";

// TODO ADMIN HOME ----------------------------------------------------------------------------- //
export default function AdminHome({ token }) {
  return (
    <div>
      <NavBar token={token} />
      <SuppliersList />
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/">
            <AdminHome />
          </Route> */}
          <Route exact path="/logout">
            <LogOut token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
