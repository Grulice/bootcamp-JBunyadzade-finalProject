import React, { Component } from "react";
import { InputLabel, ButtonPrimary, LinkSmall } from "../../commonElements";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { putLoginData, removeLoginData } from "../../redux/auth/actions";

import * as fetcher from "../../fetcher";
import {
  PageContainer,
  LoginForm,
  InputContainer,
  LoginInput,
  ErrorMessage,
} from "./LoginPage_style";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInp: "",
      passwInp: "",
      errorMessage: "",
      rememberMeChecked: false,
      redirectToHomePage: false,
    };
  }
  handleLoginChange = (e) => {
    this.setState({ loginInp: e.target.value });
  };

  handlePasswChange = (e) =>
    this.setState({
      passwInp: e.target.value,
    });
  handleRememberMeChange = (e) => {
    this.setState({ rememberMeChecked: e.target.checked });
  };

  handleLogin = (e) => {
    fetcher
      .getUserToken(this.state.loginInp, this.state.passwInp)
      .then((token) => {
        this.setState({ errorMessage: "" });
        this.changeToken(this.state.loginInp, token);
        // window.location.replace("/");
      })
      .catch((_) => this.setState({ errorMessage: "Wrong username/password" }));
  };

  changeToken = (username, token) => {
    if (username && token) {
      if (this.state.rememberMeChecked) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
      }
      this.props.putLoginData(username, token);
      this.setState({ redirectToHomePage: true });
    }
  };

  render() {
    const { loginInp, passwInp, redirectToHomePage, errorMessage } = this.state;
    return (
      <PageContainer>
        {redirectToHomePage ? <Redirect to="/" /> : ""}
        <LoginForm>
          <InputContainer>
            <InputLabel>Login</InputLabel>
            <LoginInput
              type="text"
              value={loginInp}
              onChange={this.handleLoginChange}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Password</InputLabel>
            <LoginInput
              type="password"
              value={passwInp}
              onChange={this.handlePasswChange}
            />
          </InputContainer>
          <label>
            <input
              name=""
              type="checkbox"
              style={{ marginRight: 3 }}
              checked={this.state.rememberMeChecked}
              onChange={this.handleRememberMeChange}
            />
            Remember me
          </label>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <ButtonPrimary
            style={{ width: "100%", marginTop: 10 }}
            onClick={this.handleLogin}
          >
            Sign-in
          </ButtonPrimary>
          <LinkSmall to="/signup">Click here to Sign-up!</LinkSmall>
        </LoginForm>
      </PageContainer>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = { putLoginData, removeLoginData };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
