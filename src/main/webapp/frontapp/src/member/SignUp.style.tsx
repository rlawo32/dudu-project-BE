import styled from "styled-components";


export const TermsAgreeView = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .terms-box {
    margin-bottom: 40px;
  }
  
  .terms-title {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .terms-input {
    
    label {
      display: flex;
      align-items: center;
    }
  }
  
  input {
    margin-right: 7px;
  }
  
  textarea {
    width: 400px;
    border-radius: 10px;
    resize: none;
  }
  
  span {
    font-size: 12px;
  }
  
  .input-custom {
    color: orangered;
  }
  
  .terms-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EmailAuthView = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .emailAuth-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EmailAuthInput = styled.input`
  display: inline-block;
  border: 1px solid black;
  border-radius: 7px;
  width: 200px;
  padding: 7px 10px 5px 10px;
  margin: 0 2px 2px 0;
  font-size: 18px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.bgColor};
`;

export const EmailAuthButton = styled.button`
  display: inline-block;
  border: 1px solid black;
  border-radius: 7px;
  width: 100px;
  padding: 8px 10px 7px 10px;
  margin-left: 2px;
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;

export const EnterInfoView = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .input-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .enterInfo-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EnterInfoInput = styled.input`
  display: inline-block;
  border: 1px solid black;
  border-radius: 7px;
  width: 200px;
  padding: 7px 10px 5px 10px;
  margin: 0 2px 2px 0;
  font-size: 18px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.bgColor};
`;

export const SignUpButton = styled.button`
  border: 1px solid black;
  border-radius: 7px;
  width: 150px;
  padding: 5px 10px 5px 10px;
  margin: 0 5px 0 5px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;