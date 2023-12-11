import {useRef, useState} from "react";
import styled from "styled-components";
import React from "react";
import axios from "axios";

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
    
    const [findIdMemberName, setFindIdMemberName] = useState<string>("");
    const [findIdMemberEmail, setFindIdMemberEmail] = useState<string>("");
    const [isFindIdModalSection, setIsFindIdModalSection] = useState<boolean>(true);
    const [findMemberId, setFindMemberId] = useState<string>("");
    const [isFindMemberId, setIsFindMemberId] = useState<boolean>(true);

    const findIdHandler = ():void => {
        const findIdData:object = {
            memberName: findIdMemberName,
            memberEmail: findIdMemberEmail
        }

        axios({
            method: "POST",
            url: "/member/findMemberId",
            data: findIdData,
            headers: {'Content-type': 'application/json'}
        }).then((res) => {
            const responseData = res.data;
            console.log(responseData);
            if(responseData.result) {
                let encodeId:string = "";
                for(let i:number=0; i<responseData.data.length; i++) {
                    if(i < 2) {
                        encodeId += responseData.data.substring(i, i+1);
                    } else {
                        encodeId += "*";
                    }
                }
                setFindMemberId(encodeId);
                setIsFindMemberId(true);
            } else {
                setIsFindMemberId(false);
            }
            setIsFindIdModalSection(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    const entireIdHandler = ():void => {
        const entireIdData:object = {
            memberName: findIdMemberName,
            memberEmail: findIdMemberEmail
        }

        axios({
            method: "POST",
            url: "/member/entireMemberId",
            data: entireIdData,
            headers: {'Content-type': 'application/json'}
        }).then(() => {
            alert('입력하신 이메일로 전송되었습니다.');
            props.setIsFindIdModal(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <FindIdModalView ref={modalRef}>

            <button onClick={() => props.setIsFindIdModal(false)}>x</button>

            {
                isFindIdModalSection ?
                    <div>
                        <input type="text" onChange={(e) => setFindIdMemberName(e.target.value)} placeholder="이름을 입력해주세요." />
                        <input type="text" onChange={(e) => setFindIdMemberEmail(e.target.value)} placeholder="이메일을 입력해주세요." />

                        <button onClick={() => findIdHandler()}>다음</button>
                    </div>
                    :
                    isFindMemberId ?
                        <div style={{color: "white"}}>
                            {findMemberId}

                            <button onClick={() => entireIdHandler()}>아이디 전체 확인</button>
                        </div>
                        :
                        <div>입력하신 정보와 일치하는 아이디 정보가 없습니다.</div>
            }
        </FindIdModalView>
    )
}

export default FindIdModal;