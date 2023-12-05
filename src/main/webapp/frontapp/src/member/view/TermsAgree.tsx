import styled from "styled-components";

import useJoinProgressStore from "../../stores/useJoinProgressStore";
import {useEffect, useState} from "react";

const TermsAgreeView = styled.div`
  text-align: center;
  margin: auto;
`;

const TermsAgree = ():any => {

    const [termsAgreeCheck1, setTermsAgreeCheck1] = useState(false);
    const [termsAgreeCheck2, setTermsAgreeCheck2] = useState(false);
    const [termsAgreeCheck3, setTermsAgreeCheck3] = useState(false);

    const {setActiveProgressTab} = useJoinProgressStore();

    const termsAgreeHandler = () => {

        if(!termsAgreeCheck1) {
            console.log('agree1 not checked');
        } else if(!termsAgreeCheck2) {
            console.log('agree2 not checked');
        } else if(!termsAgreeCheck3) {
            console.log('agree3 not checked');
        } else {
            setActiveProgressTab("joinProgress2");
        }
    }

    useEffect(() => {

    }, [])
    
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