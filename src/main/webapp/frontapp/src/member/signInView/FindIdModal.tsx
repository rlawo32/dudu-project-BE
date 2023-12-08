import {useRef} from "react";
import styled from "styled-components";
import React from "react";

const FindIdModalView = styled.div`
  position: relative;
  height: 400px;
  width: 400px;
  background-color: black;
`;

interface Props {
    setIsFindIdModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindIdModal = (props: Props) => {
    const modalRef:any = useRef<any>();

    return (
        <FindIdModalView ref={modalRef}>

            <button onClick={() => props.setIsFindIdModal(false)}>끄기</button>

        </FindIdModalView>
    )
}

export default FindIdModal;