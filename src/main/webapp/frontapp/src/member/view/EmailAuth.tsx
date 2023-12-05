import useJoinProgressStore from "../../stores/useJoinProgressStore";

const EmailAuth = ():any => {


    const {setActiveProgressTab} = useJoinProgressStore();

    return (
        <>
            <h1>이메일 인증</h1>
            <button onClick={() => setActiveProgressTab("joinProgress3")}>다음 단계</button>
        </>
    )
}

export default EmailAuth;