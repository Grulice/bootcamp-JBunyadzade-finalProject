import { Input, ButtonPrimary } from "../../../commonElements";
import Select from "react-select";
import styled from "styled-components";
export const PageContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
export const SearchArea = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid lightgrey;
`;
export const SearchTextContainer = styled.div``;
export const InputContainer = styled.div``;
export const SearchInput = styled(Input)`
  width: 300px;
`;
export const SearchButton = styled(ButtonPrimary)`
  margin-left: 30px;
  padding: 0 40px;
  height: 38px;
`;
export const SearchAdvFilterContainer = styled.div`
  display: flex;
`;
export const SearchSelectsContainer = styled.div`
  margin-right: 15px;
`;
export const SearchSelect = styled(Select)`
  width: 300px;
`;
export const SearchPriceYearInput = styled(Input)`
  margin: 0 5px;
  margin-right: 10px;
  width: 100px;
`;
export const SearchPriceYearContainer = styled.div``;
export const CoinsArea = styled.div``;
export const NewCoinContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 150px;
  width: 80%;
  height: 120px;
`;
export const NewCoinBtn = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 30px;
  &:hover {
    background-color: grey;
  }
  &:active {
    background-color: white;
  }
`;
