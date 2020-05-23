import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 100%;
  padding-bottom: 20px;
`;

export const DictCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 700px;
  border: 0.5px solid black;
  padding: 15px;
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
`;
