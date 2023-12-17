import styled from "styled-components";

export const ModalView = styled.div`
  position: absolute;
  top: 25%;
  left: 35%;
  transform: translate(-40%, -30%);
`;

export const ModalTabBar = styled.div`
  height: 25px;
  width: 100%;
  border: none;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: move;
  text-align: right;
  
  button {
    height: 25px;
    width: 25px;
    border: none;
    border-top-right-radius: 15px;
    color: ${({theme}) => theme.headerTextColor};
    background: none;
    margin: auto 1px;
    cursor: pointer;
    
    &:hover {
      background-color: darkgray;
    }
  }
`;

export const ModalFindView = styled.div`
  display: flex;
  flex-direction: column;
  
  .findIdView-box {
    height: 170px;
    width: fit-content;
    margin: auto;
  }

  .findIdView-text {
    font-size: 14px;
    margin: 10px 0 0 20px;
  }
  
  div:nth-child(3) {

    div:nth-child(3) {
      display: flex;
      justify-content: space-between;
      margin: 35px auto;
    }
  }
  
  span {
    display: block;
    border-top: 1px solid ${({theme}) => theme.textColor};
  }
  
  p:nth-child(1) {
    margin: 30px 0;
    font-size: 35px;
  }
`;

export const ModalInput = styled.input`
  display: block;
  height: 30px;
  width: 250px;
  border: ${({theme}) => theme.borderColor};
  border-radius: 10px;
  padding: 8px 10px 5px 10px;
  margin: 10px auto;
  font-size: 18px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
`;

export const ModalButton = styled.button`
  display: inline;
  width: 100px;
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  font-size: 20px;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;