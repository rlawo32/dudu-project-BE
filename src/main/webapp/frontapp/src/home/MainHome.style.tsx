import styled from "styled-components";

export const MainHomeView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  .top-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    height: 50px;
    width: 50px;
    border: 1px solid ${({theme}) => theme.boxBgColor};
    border-radius: 50%;
    background-color: ${({theme}) => theme.boxBgColor};
    color: ${({theme}) => theme.textColor};;
    text-align: center;
    z-index: 99;
    cursor: pointer;

    .icon-custom {
      position: relative;
      top: 12px;
      font-size: 25px;
    }
  }
`;