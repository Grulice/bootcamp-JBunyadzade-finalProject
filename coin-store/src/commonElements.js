import styled from "styled-components";
import { Link } from "react-router-dom";

const primaryColor = "#833AE0";

export const PageTitle = styled.h1`
  font-weight: lighter;
`;

export const Button = styled.button`
  padding: 20px 40px;
  border: none;
  outline: none;
  background-color: #e1e1e1;
  transition: 0.2s;
  &:hover {
    background-color: grey;
  }
  &:active {
    background-color: #e1e1e1;
    transition: 0.1s;
  }
  &:disabled {
    background-color: grey;
    opacity: 0.5;
    &:hover {
      background-color: grey;
    }
  }
  ::-moz-focus-inner {
    border: 0;
  }
`;

export const ButtonPrimary = styled(Button)`
  color: white;
  background-color: ${primaryColor};

  &:hover {
    background-color: rgb(156, 86, 221);
  }
  &:active {
    background-color: ${primaryColor};
    transition: 0.1s;
  }
`;

export const ButtonTextSmall = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  text-decoration: none;
  display: inline-block;
  font-size: small;
  color: black;
  margin: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid black;
  transition: 0.1s;
  &:hover {
    border: 1px solid #cccccc;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const InputLabel = styled.p`
  font-size: x-small;
  font-weight: bold;
  margin: 5px 0 3px 0;
`;

export const TextArea = styled.textarea`
  resize: none;
  padding: 10px;
  border: 1px solid black;
  transition: 0.1s;
  &:hover {
    border: 1px solid #cccccc;
  }
`;

export const PageBody = styled.main`
  flex-grow: 1;
`;

export const LinkSmall = styled(Link)`
  display: inline-block;
  font-size: small;
  color: black;
  margin: 5px 0;
`;

export const NavButton = styled(Button)`
  border: 0.5px solid black;
  background-color: ${(props) => (props.active ? "lightgrey" : "white")};
  /* text-decoration: ${(props) => (props.active ? "underline" : "none")}; */
  /* border-bottom: ${(props) =>
    props.active ? "none" : "0.5px solid black"}; */
  &:hover {
    background-color: #f5f5f5;
  }
  &:active {
    background-color: white;
  }
`;
