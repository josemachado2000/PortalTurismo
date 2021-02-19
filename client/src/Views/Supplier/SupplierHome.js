// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";

import "../../Components/Products/Products.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "../../Components/Navbar/NavBar";
import LogOut from "../../Components/Login_signup/LogOut";
import Profile from "../../Components/Profile/Profile";
import Shops from "../../Components/Supplier/Shops";
import EditShop from "../../Components/Supplier/EditShop";
import ShopProducts from "../../Components/Supplier/ShopProducts";
import ShopServices from "../../Components/Supplier/ShopServices";
import Service from "../../Components/Supplier/Service";
import CreateShop from "../../Components/Supplier/CreateShop";
import Product from "../../Components/Supplier/Product";
import CreateProduct from "../../Components/Supplier/CreateProduct";
import CreateService from "../../Components/Supplier/CreateService";
import SupplierProducts from "../../Components/Supplier/SupplierProducts";
import SupplierServices from "../../Components/Supplier/SupplierServices";
import SupplierOrders from "../../Components/Supplier/SupplierOrders";

// TODO SUPPLIER HOME -------------------------------------------------------------------------- //
export default function SupplierHome({ token }) {
  return (
    <div>
      <NavBar token={token} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/supplier/shops">
            <Shops token={token} />
          </Route>
          <Route exact path="/supplier/shops">
            <Shops token={token} />
          </Route>
          <Route exact path="/supplier/products">
            <SupplierProducts token={token} />
          </Route>
          <Route exact path="/supplier/services">
            <SupplierServices token={token} />
          </Route>
          <Route exact path="/supplier/orders">
            <SupplierOrders token={token} />
          </Route>
          <Route exact path="/supplier/products/:idProduct">
            <Product />
          </Route>
          <Route exact path="/supplier/services/:idService">
            <Service />
          </Route>
          <Route exact path="/supplier/shops/edit/:idShop">
            <EditShop />
          </Route>
          <Route exact path="/supplier/shops/products/:idShop">
            <ShopProducts />
          </Route>
          <Route exact path="/supplier/shops/services/:idShop">
            <ShopServices />
          </Route>
          <Route exact path="/supplier/shops/service/:idShop&:idService">
            <Service />
          </Route>
          <Route exact path="/supplier/shops/product/:idShop&:idProduct">
            <Product />
          </Route>
          <Route exact path="/supplier/shops/createProduct/:idShop">
            <CreateProduct token={token} />
          </Route>
          <Route exact path="/supplier/shops/createService/:idShop">
            <CreateService token={token} />
          </Route>
          <Route exact path="/supplier/shop/create">
            <CreateShop token={token} />
          </Route>
          <Route exact path="/supplier/profile">
            <Profile token={token} />
          </Route>
          <Route exact path="/supplier/logout">
            <LogOut token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
