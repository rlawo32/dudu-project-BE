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

    useEffect(() => {
        console.log(termsAgreeCheck1);
        console.log(termsAgreeCheck2);
        console.log(termsAgreeCheck3);
    }, [termsAgreeCheck1, termsAgreeCheck2, termsAgreeCheck3])
    
    return (
        <TermsAgreeView>
            <h1>약관 동의</h1>

            <input type="checkbox" onClick={() => setTermsAgreeCheck1(!termsAgreeCheck1)} />
            <input type="checkbox" onClick={() => setTermsAgreeCheck2(!termsAgreeCheck2)} />
            <input type="checkbox" onClick={() => setTermsAgreeCheck3(!termsAgreeCheck3)} />

            <button onClick={() => setActiveProgressTab("joinProgress2")}>다음 단계</button>
        </TermsAgreeView>
    )
}

export default TermsAgree;