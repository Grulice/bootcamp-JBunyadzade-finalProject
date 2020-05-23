import { Input } from "../../commonElements";
import styled from "styled-components";
export const InputContainer = styled.div`
  margin: 7px 0;
`;
export const LoginInput = styled(Input)`
  width: 100%;
`;
export const PageContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LoginForm = styled.div`
  width: 300px;
`;
export const StatusMessage = styled.p`
  color: ${(props) => (props.success ? "green" : "red")};
  font-size: large;
`;
