import {useRef} from "react";
import styled from "styled-components";
import React from "react";

const FindPwModalView = styled.div`
  position: relative;
  height: 400px;
  width: 400px;
  background-color: black;
`;

interface Props {
    setIsFindPwModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindPwModal = (props: Props) => {
    const modalRef:any = useRef<any>();

    return (
        <FindPwModalView ref={modalRef}>

            <button onClick={() => props.setIsFindPwModal(false)}>끄기</button>

        </FindPwModalView>
    )
}

export default FindPwModal;