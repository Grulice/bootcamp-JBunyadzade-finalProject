import styled from "styled-components";
export const MainBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
`;
export const IncDecButton = styled.button`
  cursor: pointer;
  border: none;
  height: 30px;
  width: 30px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;

  color: ${(props) => (props.selected ? "blueviolet" : "black")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  &:hover {
    border: 0.5px solid black;
  }

  &:active svg path {
    stroke: #ffdc40;
  }
`;
