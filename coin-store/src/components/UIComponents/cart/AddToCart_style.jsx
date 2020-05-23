import styled from "styled-components";
import { ButtonPrimary } from "../../../commonElements";
export const PlaqueContainer = styled.div`
  margin: 10px -3px 0 10px;
  border: 0.5px solid lightgrey;
  padding: 15px;
  border-radius: 5px 0 0 5px;
`;
export const AddButton = styled(ButtonPrimary)`
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  align-items: center;
  border-radius: 5px;
  margin-top: 5px;
  img {
    filter: invert(1);
    width: 25px;
  }
  .add-to-cart {
    flex-grow: 1;
    width: max-content;
    margin: 0 3px 0 10px;
  }
`;
