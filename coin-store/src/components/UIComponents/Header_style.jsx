import styled from "styled-components";
import { LinkSmall } from "../../commonElements";
export const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const HeaderHome = styled.div``;
export const PathLink = styled(LinkSmall)`
  color: lightgrey;
`;
export const LoginInfoContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* width: 600px; */
`;
export const LoginInfoLabel = styled.p`
  margin: 0 10px;
  word-break: break-all;
  width: 160px;
`;
