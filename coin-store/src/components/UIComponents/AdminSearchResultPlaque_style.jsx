import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../../commonElements";
export const PlaqueContainer = styled.div`
  display: ${(props) => (props.removed ? "none" : "flex")};
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 150px;
  width: 65%;
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
  width: 300px;
  height: 100%;
`;
export const CoinLink = styled(Link)`
  color: blueviolet;
  font-weight: bold;
  text-decoration: none;
`;
export const CoinDesc = styled.p`
  font-size: small;
`;
export const EditControls = styled.div`
  /* width: 300px; */
`;
export const EditButton = styled(Button)`
  text-align: center;
  margin: 3px 20px;
  width: 120px;
`;
