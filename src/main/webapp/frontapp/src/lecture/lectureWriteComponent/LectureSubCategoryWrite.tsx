import React, {useState} from "react";
import axios from "axios";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete, faPlus as imagePlus} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const LectureScWriteView = styled.div`
  
    .sc-thumbnail {

      input {
        display: none;
      }

      .sc-attach-thumbnail {
        position: relative;
        height: 150px;
        width: 160px;
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        overflow: hidden;

        .sc-thumbnail-image {
          height: 150px;
          width: 160px;
          object-fit: cover;
        }

        .sc-thumbnail-image-delete {
          position: absolute;
          top: 5px;
          left: 140px;
          color: orangered;
          cursor: pointer;
        }
      }

      .sc-attach-input {
        position: relative;
        height: 150px;
        width: 160px;
        border: ${({theme}) => theme.borderColor};
        border-radius: 10px;
        cursor: pointer;

        .icon-custom {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 50px;
        }
      }
    }
`;
const LectureSubCategoryWrite = (props:{mainCategoryNo:string}) => {
    const navigate = useNavigate();

    const [insertLectureSubCategoryName, setInsertLectureSubCategoryName] = useState<string>("");
    const [insertLectureSubCategoryDesc, setInsertLectureSubCategoryDesc] = useState<string>("");

    const [categoryThumbnailName, setCategoryThumbnailName] = useState<string>("");
    const [categoryThumbnailUrl, setCategoryThumbnailUrl] = useState<string>("");
    const [categoryThumbnailSize, setCategoryThumbnailSize] = useState<number>(0);
    const [categoryThumbnail, setCategoryThumbnail] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);

    const changeCategoryThumbnailHandler = async(file:FileList|null):Promise<void> => {
        if(file !== null) {
            const formData:FormData = new FormData();
            formData.append('files', file[0]);
            formData.append('type', 'C');

            await axios({
                method: "POST",
                url: "/lecture/lectureUploadImage",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res):void => {
                const imgFileType:string = "C";
                const imgFileName:string = res.data.data.imgName;
                const imgFileUrl:string = res.data.data.imgUrl;

                setCategoryThumbnailName(imgFileName);
                setCategoryThumbnailUrl(imgFileUrl);
                setCategoryThumbnail([{
                    imgType: imgFileType,
                    imgName: imgFileName,
                    imgUrl: imgFileUrl,
                    imgSize: file[0].size
                }]);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
    }

    const deleteCategoryThumbnailHandler = (thumbnailName:string, deleteType:string):void => {
        setCategoryThumbnailName("");
        setCategoryThumbnailUrl("");
        setCategoryThumbnail([]);

        const deleteObj:object = {
            imageFileName: thumbnailName,
            type: deleteType
        }
        axios({
            method: "DELETE",
            url: '/lecture/lectureDeleteImage',
            params: deleteObj
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    const insertLectureSubCategoryHandler = ():void => {
        const subCategoryData:object = {
            lectureMainCategoryNo: props.mainCategoryNo,
            lectureSubCategoryName: insertLectureSubCategoryName,
            lectureSubCategoryDesc: insertLectureSubCategoryDesc,
            lectureSubCategoryThumbnail: categoryThumbnail[0].imgUrl
        }
        axios({
            method: "POST",
            url: "/lecture/insertLectureSubCategory",
            data: JSON.stringify(subCategoryData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            navigate("/");
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    return (
        <LectureScWriteView>
            <div className="sc-thumbnail">
                <input type="file" id="sc-attach-thumbnail" accept="image/jpg,image/png,image/jpeg"
                       onChange={(e) => changeCategoryThumbnailHandler(e.target.files)}/>
                {
                    categoryThumbnailUrl.length > 0 ?
                        <div className="sc-attach-thumbnail">
                            <img src={categoryThumbnailUrl} alt="썸네일 이미지" className="sc-thumbnail-image" />
                            <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                                deleteCategoryThumbnailHandler(categoryThumbnailName, "C")} className="sc-thumbnail-image-delete"/>
                        </div>
                        :
                        <label htmlFor={"sc-attach-thumbnail"}>
                            <div className="sc-attach-input">
                                <FontAwesomeIcon icon={imagePlus} className="icon-custom" />
                            </div>
                        </label>
                }
            </div>
            <input type="text" onChange={(e) => setInsertLectureSubCategoryName(e.target.value)} placeholder="카테고리이름" />
            <input type="text" onChange={(e) => setInsertLectureSubCategoryDesc(e.target.value)} placeholder="카테고리설명" />
            <button onClick={() => insertLectureSubCategoryHandler()}>insert</button>
        </LectureScWriteView>
    )
}

export default LectureSubCategoryWrite;