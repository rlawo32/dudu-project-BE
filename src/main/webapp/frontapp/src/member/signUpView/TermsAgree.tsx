import styled from "styled-components";
import {useState} from "react";

import useJoinProgressStore from "../../stores/useJoinProgressStore";

const TermsAgreeView = styled.div`
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

const SignUpButton = styled.button`
  border: 1px solid black;
  border-radius: 7px;
  width: 150px;
  padding: 5px 10px 5px 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.headerTextColor};
  background-color: ${({theme}) => theme.reverseBgColor};
  cursor: pointer;
`;

const TermsAgree = ():any => {

    const [termsAgreeCheck1, setTermsAgreeCheck1] = useState<boolean>(false);
    const [termsAgreeCheck2, setTermsAgreeCheck2] = useState<boolean>(false);
    const [termsAgreeCheck3, setTermsAgreeCheck3] = useState<boolean>(false);

    const {setActiveProgressTab, setInputTermsAgree} = useJoinProgressStore();

    const termsAgreeHandler = ():void => {
        const termsData:object = {
            termsAgree1: termsAgreeCheck1,
            termsAgree2: termsAgreeCheck2,
            termsAgree3: termsAgreeCheck3
        }

        if(!termsAgreeCheck1 || !termsAgreeCheck2) {
            alert('필수 약관에 동의해주시길 바랍니다.')
        } else {
            setInputTermsAgree(termsData);
            setActiveProgressTab("joinProgress2");
        }
    }
    
    return (
        <TermsAgreeView>
            <h1>약관 동의</h1>

            <div className="terms-box">
                <div className="terms-title">문화센터 이용약관</div>
                <div className="terms-text">
                    <textarea readOnly={true}>

                    </textarea>
                </div>
                <div className="terms-input">
                    <label>
                        <input type="checkbox" onClick={() => setTermsAgreeCheck1(!termsAgreeCheck1)}/>
                        <span>동의합니다.&nbsp;</span>
                        <span className="input-custom">(필수)</span>
                    </label>
                </div>
            </div>
            <div className="terms-box">
                <div className="terms-title">개인정보 수집 및 이용</div>
                <div className="terms-text">
                    <textarea readOnly={true}>

                    </textarea>
                </div>
                <div className="terms-input">
                    <label>
                        <input type="checkbox" onClick={() => setTermsAgreeCheck2(!termsAgreeCheck2)}/>
                        <span>동의합니다.&nbsp;</span>
                        <span className="input-custom">(필수)</span>
                    </label>
                </div>
            </div>
            <div className="terms-box">
                <div className="terms-title">이벤트 • 혜택 정보 수신</div>
                <div className="terms-text">
                    <textarea readOnly={true}>

                    </textarea>
                </div>
                <div className="terms-input">
                    <label>
                        <input type="checkbox" onClick={() => setTermsAgreeCheck3(!termsAgreeCheck3)}/>
                        <span>동의합니다.&nbsp;</span>
                        <span className="input-custom">(선택)</span>
                    </label>
                </div>
            </div>

            <div className="terms-button">
                <SignUpButton onClick={() => termsAgreeHandler()}>다음</SignUpButton>
            </div>
        </TermsAgreeView>
    )
}

export default TermsAgree;