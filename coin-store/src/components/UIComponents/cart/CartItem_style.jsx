import styled from "styled-components";
import { Link } from "react-router-dom";
export const ItemContainer = styled.div`
  display: ${(props) => (props.removed ? "none" : "flex")};
  margin-bottom: 10px;
  padding: 5px 0;
  &:hover {
    background-color: #f3f3f3;
  }

  img {
    width: 80px;
  }
  .delete-container {
    border-top: 0.5px solid lightgrey;
  }
`;
export const DescContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  max-width: 580px;
`;
export const CoinLink = styled(Link)`
  color: blueviolet;
  font-weight: bold;
  text-decoration: none;
`;
export const CoinDesc = styled.p`
  font-size: small;
  padding-bottom: 5px;
`;
export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;
export const PriceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
  width: 50px;
`;
