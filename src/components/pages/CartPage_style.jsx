import styled from "styled-components";
export const PageContainer = styled.div`
  display: flex;
  height: 100%;
`;
export const CartCol = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
export const BuyCol = styled.div`
  width: 30%;
  border-left: 0.5px solid black;
  padding: 20px 0 20px 20px;
  text-align: right;

  h2 {
    margin-bottom: 15px;
  }

  .buy-details-container {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;
