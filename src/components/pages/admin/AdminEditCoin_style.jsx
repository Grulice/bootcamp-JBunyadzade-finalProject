import styled from "styled-components";
export const PageForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
`;
export const InfoColUpload = styled(InfoCol)`
  justify-content: space-between;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ImgPreviewsContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;
export const ImgPreviewBox = styled.div`
  border: 1px solid black;
  width: 150px;
  padding: 5px;
  img {
    width: 100%;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    border: "1px solid black",
    width: "100%",
  }),
};
