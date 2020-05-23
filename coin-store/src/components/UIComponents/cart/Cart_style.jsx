import styled from "styled-components";
export const CartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 60px;
  width: 60px;

  &:hover {
    background-color: #f3f3f3;
  }
`;
export const Badge = styled.p`
  position: absolute;
  right: 3px;
  top: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background-color: blueviolet;
  color: white;
  height: 22px;
  width: 22px;
`;
