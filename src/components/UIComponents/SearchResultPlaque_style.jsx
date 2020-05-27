import styled from "styled-components";
import { Link } from "react-router-dom";
export const PlaqueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-right: 150px;
  width: 400px;
  height: 120px;
`;
export const ImageContainer = styled.div`
  width: 120px;
  margin-right: 10px;
  img {
    width: 120px;
  }
`;
export const DescContainer = styled.div`
  flex-grow: 1;
`;
export const CoinLink = styled(Link)`
  color: blueviolet;
  font-weight: bold;
  text-decoration: none;
`;
export const CoinDesc = styled.p`
  font-size: small;
`;
