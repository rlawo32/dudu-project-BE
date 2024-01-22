import {useState} from "react";

import ClickConfettiEffect from "../../styles/ClickConfettiEffect";
import FixedConfettiEffect from "../../styles/FixedConfettiEffect";
import useJoinProgressStore from "../../stores/useJoinProgressStore";

import * as Styled from "../SignUp.style";

const JoinComplete = ():any => {

    const {activeProgressTab} = useJoinProgressStore();

    const [xy,setXY]=useState<{x:number, y:number}>({x:0,y:0});

    return (
        <>
            <Styled.JoinCompleteView onMouseDown={(e) => setXY({x:e.clientX-500, y:e.clientY-500})}>
                <h1>가입완료 !!{ activeProgressTab === 'joinProgress4' ? <FixedConfettiEffect /> : <div />}</h1>

                <ClickConfettiEffect coordinate={xy}/>
                {/*{ activeProgressTab === 'joinProgress4' ? <ClickConfettiEffect coordinate={xy}/> : <div />}*/}

            </Styled.JoinCompleteView>
        </>
    )
}

export default JoinComplete;