import styled from "styled-components";
import {useState} from "react";

import useJoinProgressStore from "../../stores/useJoinProgressStore";

const TermsAgreeView = styled.div`
  text-align: center;
  margin: auto;
`;

const TermsAgree = ():any => {

    const [termsAgreeCheck1, setTermsAgreeCheck1] = useState(false);
    const [termsAgreeCheck2, setTermsAgreeCheck2] = useState(false);
    const [termsAgreeCheck3, setTermsAgreeCheck3] = useState(false);

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

            <input type="checkbox" onClick={() => setTermsAgreeCheck1(!termsAgreeCheck1)} />
            <input type="checkbox" onClick={() => setTermsAgreeCheck2(!termsAgreeCheck2)} />
            <input type="checkbox" onClick={() => setTermsAgreeCheck3(!termsAgreeCheck3)} />

            <button onClick={() => termsAgreeHandler()}>다음 단계</button>
        </TermsAgreeView>
    )
}

export default TermsAgree;