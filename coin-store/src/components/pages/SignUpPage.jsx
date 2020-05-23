import React, { Component } from "react";
import { InputLabel, ButtonPrimary } from "../../commonElements";
import { Redirect } from "react-router-dom";
import * as fetcher from "../../fetcher";
import {
  PageContainer,
  LoginForm,
  InputContainer,
  LoginInput,
  StatusMessage,
} from "./SignUpPage_style";

const REDIRECT_TIMEOUT = 3000;

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInp: "",
      passwInp: "",
      repPasswInp: "",
      statusMessage: "",
      statusSuccess: true,
      passwordsValid: false,
      redirect: false,
    };
  }
  handleLoginChange = (e) => {
    this.setState({ loginInp: e.target.value });
  };

  handlePasswChange = (e) =>
    this.setState({
      passwInp: e.target.value,
      passwordsValid: this.arePasswordsValid(
        e.target.value,
        this.state.repPasswInp
      ),
    });

  handleRepPasswChange = (e) =>
    this.setState({
      repPasswInp: e.target.value,
      passwordsValid: this.arePasswordsValid(
        this.state.passwInp,
        e.target.value
      ),
    });

  handleRegistration = (e) => {
    const { loginInp, passwInp } = this.state;
    fetcher.registerUser(loginInp, passwInp).then((status) => {
      switch (status) {
        case 200: {
          setTimeout(() => this.setState({ redirect: true }), REDIRECT_TIMEOUT);
          this.setState({
            statusMessage:
              "User created successfully! Redirecting to login page...",
            statusSuccess: true,
          });
          break;
        }

        case 409:
          this.setState({
            statusMessage:
              "User already exists. Please, log in or choose a different user name.",
            statusSuccess: false,
          });
          break;
        case 500:
          this.setState({
            statusMessage: "Something went wrong. Please, contact the admin.",
            statusSuccess: false,
          });
          break;
        default:
          break;
      }
    });
  };

  arePasswordsValid = (pass, repeat) => pass && repeat && pass === repeat;
  render() {
    const {
      loginInp,
      passwInp,
      repPasswInp,
      passwordsValid,
      statusSuccess,
      statusMessage,
      redirect,
    } = this.state;
    return (
      <PageContainer>
        {redirect ? <Redirect to="/login" /> : ""}
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
          <InputContainer>
            <InputLabel>Repeat password</InputLabel>
            <LoginInput
              type="password"
              value={repPasswInp}
              onChange={this.handleRepPasswChange}
            />
          </InputContainer>
          <StatusMessage success={statusSuccess}>{statusMessage}</StatusMessage>
          <ButtonPrimary
            style={{ width: "100%", marginTop: 10 }}
            disabled={!passwordsValid}
            onClick={this.handleRegistration}
          >
            Sign-up
          </ButtonPrimary>
        </LoginForm>
      </PageContainer>
    );
  }
}

export default SignUpPage;
