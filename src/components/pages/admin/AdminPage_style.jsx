import styled from "styled-components";
export const PageContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
export const NavBar = styled.nav`
  padding: 15px 0;
  margin-bottom: 15px;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
  }
  border-bottom: 0.5px solid black;
`;
