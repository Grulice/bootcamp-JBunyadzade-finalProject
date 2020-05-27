import styled from "styled-components";
import { Input, Button } from "../../commonElements";
export const ElemContainer = styled.div`
  display: flex;
  width: 100%;
`;
export const SmallInput = styled(Input)`
  width: 60px;
  height: 30px;
  flex-grow: 1;
  text-align: center;
`;
export const SmallButton = styled(Button)`
  padding: 0;
  width: 20px;
  height: 30px;
  border-radius: ${(props) =>
    props.side === "left" ? "5px 0 0 5px" : "0 5px 5px 0"};

  &:active {
    background-color: ${(props) =>
      props.side === "left" ? "#00c3e3" : "#ff4554"};
  }
`;
