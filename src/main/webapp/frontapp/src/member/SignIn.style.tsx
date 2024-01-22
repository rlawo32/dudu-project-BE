import styled from "styled-components";

export const SignInMain = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  
  @media all and (max-width: 850px) {
    flex-direction: column;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .login-view {
    display: flex;
    @media screen and (max-width: 1024px) {
      flex-direction: column-reverse;
      width: 100%;
      margin: 0;
      border-bottom: 1px solid gray;
    }
  }
  
  .signUp-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    @media screen and (max-width: 1024px) {
      height: 50vh;
    }
    background-image: url("https://react-project-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage/signup-image1.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
    .signUp-box {
      margin: auto;
      width: fit-content;

      p:nth-child(1) {
        margin: 0;
        color: white;
        font-size: 50px;
        @media all and (max-width: 1100px) {
          font-size: 40px;
        }
      }

      p:nth-child(2) {
        margin: 0 0 70px 0;
        color: white;
        font-size: 17px;
        @media all and (max-width: 1100px) {
          font-size: 14px;
        }
      }
      
      .link-custom {
        text-decoration: none;
        color: white;
        font-size: 30px;
        @media all and (max-width: 1100px) {
          font-size: 20px;
        }
        font-weight: bold;
      }
    }
  }
  
  .signIn-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    
    .signIn-box {
      margin: auto;
      width: fit-content;
    }
  }
`;

export const InputBox = styled.div`
  display: block;
  position: relative;
  
  .icon-custom {
    position: absolute;
    top: 20%;
    left: 5%;
    font-size: 35px;
    color: ${({theme}) => theme.textColor};
  }
`;

export const SignInInput = styled.input`
  display: block;
  border: ${({theme}) => theme.borderColor};
  border-radius: 30px;
  height: 50px;
  width: 420px;
  @media all and (max-width: 1100px) {
    width: 320px;
    margin: 10px auto;
  }
  padding: 5px 10px 3px 75px;
  margin-bottom: 10px;
  font-size: 22px;
  color: ${({theme}) => theme.textColor};
  background-color: ${({theme}) => theme.inputBgColor};
`;

export const SignInButton = styled.button`
  display: block;
  border: none;
  border-radius: 30px;
  height: 50px;
  width: 480px;
  @media all and (max-width: 1100px) {
    width: 350px;
  }
  padding: 5px 10px 5px 10px;
  margin: 40px auto 20px;
  font-size: 19px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;

export const LoginKakaoButton = styled.button`
  border: none;
  border-radius: 30px;
  height: 55px;
  width: 480px;
  @media all and (max-width: 1100px) {
    width: 350px;
  }
  padding: 5px 10px 5px 10px;
  margin: 50px auto 0;
  font-size: 19px;
  font-weight: bold;
  color: black;
  background-color: gold;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  
  .icon-custom {
    margin-right: 13px;
    font-size: 25px;
  }
`;

export const LoginNaverButton = styled.button`
  border: none;
  border-radius: 30px;
  height: 55px;
  width: 480px;
  @media all and (max-width: 1100px) {
    width: 350px;
  }
  padding: 5px 10px 5px 10px;
  margin: 10px auto;
  font-size: 19px;
  font-weight: bold;
  color: white;
  background-color: green;
  cursor: pointer;
  
  display: flex;
  justify-content: center;
  align-items: center;

  .icon-custom {
    margin-right: 13px;
    font-size: 35px;
    font-weight: bold;
  }
`;

export const FindButton = styled.div`
  width: fit-content;
  margin: 0 auto 0;
  
  button {
    display: inline;
    border: none;
    margin: 0 30px 0 30px;
    background: none;
    color: ${({theme}) => theme.reverseBgColor};
    cursor: pointer;
  }
  
  span {
    border-right: 1px solid ${({theme}) => theme.reverseBgColor};
    margin: 0;
  }
`;