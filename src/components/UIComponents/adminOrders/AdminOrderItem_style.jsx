import styled from "styled-components";

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  &:hover {
    background-color: #f3f3f3;
  }
  .order-number-container {
    width: 3%;
  }
  .order-date-container {
    width: 10%;
  }

  .order-contents-container {
    width: 30%;
  }

  .ship-addr-container {
    width: 20%;
  }

  .status-container {
    width: 15%;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }
`;

export const FinalRow = styled.tr`
  border-top: 0.5px solid black;
`;
