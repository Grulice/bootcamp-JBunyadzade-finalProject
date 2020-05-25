import React, { Component } from "react";
import {
  PageTitle,
  ButtonPrimary,
  Button,
  LinkSmall,
} from "../../commonElements";
import Cart from "./cart/Cart";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeLoginData } from "../../redux/auth/actions";
import { emptyCart } from "../../redux/cart/actions";
import {
  HeaderBar,
  HeaderHome,
  PathLink,
  LoginInfoContainer,
  LoginInfoLabel,
} from "./Header_style";

const pathDict = {
  "/": "Homepage",
  "/login": "Login",
  "/signup": "Sign-up",
  "/admin": "Admin panel",
  "/admin/coinlist": "Admin panel - Coin List",
  "/admin/dicts": "Admin panel - Dictionaries",
  "/admin/orders": "Admin panel - Orders",
  "/search": "Search",
  "/coin": "Coin information",
  "/cart": "Cart",
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogOut = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    this.props.removeLoginData();

    this.props.emptyCart();
  };

  getCurrentPageTitle = () => {
    const curPath = this.props.location.pathname;

    let maxLen = 0;
    let result = "";
    for (let path in pathDict) {
      //choose the longest matching path
      if (curPath.startsWith(path) && path.length > maxLen) {
        result = pathDict[path];
        maxLen = path.length;
      }
    }
    return result;
  };

  render() {
    const { username, token } = this.props;
    return (
      <HeaderBar>
        <div>
          <PageTitle>{this.getCurrentPageTitle()}</PageTitle>
          <HeaderHome>
            <PathLink to="/">Home</PathLink>
          </HeaderHome>
        </div>

        <LoginInfoContainer>
          {username && token ? (
            <Button onClick={this.handleLogOut}>Log&nbsp;out</Button>
          ) : (
            <Link to="/login">
              <ButtonPrimary>Sign-in / Register</ButtonPrimary>
            </Link>
          )}
          {username && token ? (
            <>
              <LoginInfoLabel>
                You are logged in as <br />
                <b>{username}</b>
                <br />
                <LinkSmall to="/orders">Your Orders</LinkSmall>
                {username === "admin" && (
                  <>
                    {" | "}
                    <LinkSmall to="/admin/coinlist">Admin Panel</LinkSmall>
                  </>
                )}
              </LoginInfoLabel>
              <Cart />
            </>
          ) : (
            <></>
          )}
        </LoginInfoContainer>
      </HeaderBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    token: state.auth.token,
  };
};

const mapDispatchToProps = { removeLoginData, emptyCart };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
