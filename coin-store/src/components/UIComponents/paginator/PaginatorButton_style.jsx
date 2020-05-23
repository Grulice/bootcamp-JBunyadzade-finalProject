import styled from "styled-components";
export const Button = styled.button`
  cursor: pointer;
  border: none;
  height: 30px;
  width: 30px;
  margin: 0 3px;

  background-color: white;

  color: ${(props) => (props.selected ? "blueviolet" : "black")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  &:hover {
    border: 0.5px solid black;
  }

  &:active {
    color: #ffdc40;
  }
`;
