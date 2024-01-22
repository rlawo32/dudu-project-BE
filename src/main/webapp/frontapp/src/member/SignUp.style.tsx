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
    @media screen and (max-width: 750px) {
      width: 300px;
    }
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
  border: ${({theme}) => theme.borderColor};
  border-radius: 7px;
  width: 200px;
  padding: 7px 10px 5px 10px;
  margin: 0 2px 2px 0;
  font-size: 18px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
`;

export const EmailAuthButton = styled.button`
  display: inline-block;
  border: none;
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
    margin-bottom: 22px;
    
    .input-title {
      height: 30px;
      margin-right: 30px;
      font-size: 17px;
      font-weight: bold;
    }
    
    .input-text {
      height: 40px;
    }
    
    .input-gender {
      border: ${({theme}) => theme.borderColor};
      border-radius: 7px;
      margin-right: 62px;
    }
  }
  
  .enterInfo-button {
    width: fit-content;
    margin: auto;
  }
`;

export const EnterInfoInput = styled.input`
  display: inline-block;
  border: ${({theme}) => theme.borderColor};
  border-radius: 7px;
  width: 200px;
  padding: 7px 10px 6px 10px;
  margin: 0 2px 2px 0;
  font-size: 15px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
`;

export const EnterInfoButtonM = styled.button`
  border: none;
  border-right: 1px solid ${({theme}) => theme.textColor};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 80px;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  cursor: pointer;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.bgColor};
`;

export const EnterInfoButtonF = styled.button`
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 80px;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  cursor: pointer;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.bgColor};
`;

export const JoinCompleteView = styled.div`
  position: relative;
  height: 500px;
  width: 700px;
  @media screen and (max-width: 1024px) {
    width: 500px;
  }
  @media screen and (max-width: 750px) {
    width: 300px;
  }
  margin: auto;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
`;

export const SignUpButton = styled.button`
  border: none;
  border-radius: 7px;
  width: 150px;
  padding: 5px 10px 5px 10px;
  margin: 15px 5px 0 5px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;