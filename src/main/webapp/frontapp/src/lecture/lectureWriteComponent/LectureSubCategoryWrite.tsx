import {useState} from "react";
import axios from "axios";

const LectureSubCategoryWrite = (props:{mainCategoryNo:string}) => {

    const [insertLectureSubCategoryName, setInsertLectureSubCategoryName] = useState<string>("");
    const [insertLectureSubCategoryDesc, setInsertLectureSubCategoryDesc] = useState<string>("");

    const insertLectureSubCategoryHandler = ():void => {
        const subCategoryData:object = {
            lectureMainCategoryNo: props.mainCategoryNo,
            lectureSubCategoryName: insertLectureSubCategoryName,
            lectureSubCategoryDesc: insertLectureSubCategoryDesc
        }

        axios({
            method: "POST",
            url: "/lecture/insertLectureSubCategory",
            data: JSON.stringify(subCategoryData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            console.log(res.data);
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    return (
        <div>
            <input type="text" onChange={(e) => setInsertLectureSubCategoryName(e.target.value)} placeholder="카테고리이름" />
            <input type="text" onChange={(e) => setInsertLectureSubCategoryDesc(e.target.value)} placeholder="카테고리설명" />
            <button onClick={() => insertLectureSubCategoryHandler()}>insert</button>
        </div>
    )
}

export default LectureSubCategoryWrite;