import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: right; */
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  height: 60px;
  width: 60px;

  &:hover {
    background-color: #f3f3f3;
  }
  img {
    height: 100%;
    width: 100%;
  }
`;

export const RecentsBox = styled.div`
  position: absolute;
  top: 102%;
  transform: scaleY(${(props) => (props.visible ? "1" : "0")});
  transform-origin: top;
  display: flex;
  align-items: center;
  transition: 0.2s;
  z-index: 999;
`;

export const RecentsList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  background-color: #f3f3f3;
  padding: 10px;
  li {
    margin-right: 10px;
    height: 100%;
  }
  li:last-child {
    margin-right: 0;
  }
  li img {
    display: block;
    height: 100px;
  }
`;
