import React, { Component } from "react";
import { connect } from "react-redux";
import { putLoginData } from "./redux/auth/actions";
import { setCart } from "./redux/cart/actions";

import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Header from "./components/UIComponents/Header";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import AdminPage from "./components/pages/admin/AdminPage";
import CoinPage from "./components/pages/CoinPage";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";

import { PageBody } from "./commonElements";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.checkLocalStorageCart();
    this.checkLocalStorageToken();
  }

  checkLocalStorageToken = () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    this.props.putLoginData(username, token);
  };

  checkLocalStorageCart = () => {
    const cartString = localStorage.getItem("cart") || "[]";
    this.props.setCart(JSON.parse(cartString));
  };

  render() {
    return (
      <BrowserRouter>
        <Header />
        <PageBody>
          <Route exact path="(/|/search)">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/coin/:id" component={CoinPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/orders" component={OrdersPage} />
        </PageBody>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = { putLoginData, setCart };

export default connect(mapStateToProps, mapDispatchToProps)(App);
