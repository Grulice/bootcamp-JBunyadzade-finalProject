import styled from "styled-components";
import { ButtonPrimary } from "../../commonElements";

export const DictContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
  justify-content: space-between;
`;

export const TableContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 5px;
`;

export const MainTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  tr:nth-child(even) {
    background-color: #f5f5f5;
  }
  td {
    padding: 3px;
  }
  .country-col {
    text-align: right;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const AddButton = styled(ButtonPrimary)`
  padding: 0;

  font-size: x-large;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
