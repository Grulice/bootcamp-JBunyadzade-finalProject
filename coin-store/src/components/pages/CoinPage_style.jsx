import styled from "styled-components";
export const PageContainer = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  padding: 30px 0;
`;
export const ImagesContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  img:first-child {
    margin-bottom: 25px;
  }
  img {
    width: 100%;
  }
`;
export const DescContainer = styled.div`
  position: relative;
  padding: 30px 30px 100px 30px;
  background-color: rgba(196, 196, 196, 0.5);
  margin-left: 30px;
  width: 60%;
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 25px;
  }
  p {
    margin-bottom: 20px;
  }
  table {
    margin-top: 30px;
    width: 100%;
    border-collapse: collapse;
  }
  table tr:nth-child(odd) {
    background-color: white;
  }
  table tr:not(:last-child) {
    border-bottom: 0.5px solid grey;
  }
  table td {
    padding: 5px;
    width: 50%;
  }
  table td:last-child {
    border-left: 0.5px solid grey;
  }
`;
export const BuyBox = styled.div`
  position: fixed;
  right: 0;
  top: 30vh;
`;
export const LinkBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
`;
