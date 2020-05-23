import styled from "styled-components";
import { Input } from "../../commonElements";
export const InputContainer = styled.div`
  margin: 7px 0;
`;
export const LoginInput = styled(Input)`
  width: 100%;
`;
export const PageContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LoginForm = styled.div`
  width: 300px;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: x-large;
`;
