import React, {useEffect, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import * as Styled from "./BranchInfo.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BranchInfoWrite = () => {

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionPosition:string;
        institutionContact:string;
    }[]>([]);
    const [institutionImageList, setInstitutionImageList] = useState<{
        institutionImageNo:number;
        institutionImageCustom:string;
        institutionImageUrl:string;
    }[]>([]);

    const [institutionNo, setInstitutionNo] = useState<number>(1);
    const [selectItem, setSelectItem] = useState<number>(0);

    const [previewImgUrlArr, setPreviewImgUrlArr] = useState<string[]>([]); // 미리보기를 위한 state
    const [previewImgSize, setPreviewImgSize] = useState<number>(0); // 업로드한 이미지 용량 state
    const [attachImageArr, setAttachImageArr] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);

    const customInstitutionSelectBox = ():any => {
        const result:any[] = [];
        for(let i:number=0; i<institutionList.length; i++) {
            result.push(<option key={i} value={institutionList[i].institutionNo}>
                {institutionList[i].institutionName}
            </option>)
        }
        return result;
    }

    const changeInstitutionImageHandler = async(file:FileList|null):Promise<void> => {
        if(file !== null) {
            let fileSize:number = 0;
            for(let i:number=0; i<file.length; i++) {
                fileSize += file[i].size;
                const formData:FormData = new FormData();
                formData.append('files', file[i]);
                formData.append('type', "I");

                await axios({
                    method: "POST",
                    url: "/lecture/lectureUploadImage",
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res):void => {
                    const imgFileType:string = "I";
                    const imgFileName:string = res.data.data.imgName;
                    const imgFileUrl:string = res.data.data.imgUrl;

                    setPreviewImgUrlArr((prevList:string[]) => [...prevList, imgFileUrl]);
                    setAttachImageArr((prevList) => [...prevList, {
                        imgType: imgFileType,
                        imgName: imgFileName,
                        imgUrl: imgFileUrl,
                        imgSize: file !== null ? file[i].size : 0
                    }]);
                }).catch((err):void => {
                    console.log(err.message);
                })
            }
            setPreviewImgSize(prevList => prevList + fileSize);
        }
    }

    const deleteInstitutionPreviewImageHandler = async (url:string, deleteType:string):Promise<void> => {
        let removeImgSize:number = 0;
        let removeImgName:string = "";
        for (let i:number = 0; i < attachImageArr.length; i++) {
            if (attachImageArr[i].imgUrl === url) {
                removeImgSize = attachImageArr[i].imgSize;
                removeImgName = attachImageArr[i].imgName;
            }
        }
        setPreviewImgUrlArr(previewImgUrlArr.filter((value:string) => value !== url));
        setPreviewImgSize(previewImgSize - removeImgSize);
        setAttachImageArr(attachImageArr.filter((value) => value.imgUrl !== url))

        const deleteObj:object = {
            imageFileName: removeImgName,
            type: deleteType
        }
        await axios({
            method: "DELETE",
            url: '/lecture/lectureDeleteImage',
            params: deleteObj
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    const deleteInstitutionImageHandler = async (imageNo:number, imageName:string, deleteType:string):Promise<boolean> => {
        if(window.confirm("정말 삭제하시겠습니까??") == true) {
            const deleteObj:object = {
                imageFileName: imageName,
                type: deleteType
            }
            console.log(deleteObj)
            axios({
                method: "DELETE",
                url: "/lecture/lectureInstitutionImageDelete",
                params: {institutionImageNo: imageNo}
            }).then((res):void => {
                axios({
                    method: "DELETE",
                    url: '/lecture/lectureDeleteImage',
                    params: deleteObj
                }).then((res):void => {
                    window.location.reload();
                }).catch((err):void => {
                    console.log(err.message);
                })
            }).catch((err):void => {
                console.log(err.message);
            })
            return true;
        }else{
            return false;
        }
    }

    const attachImageArray = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<previewImgUrlArr.length; i++) {
            result.push(
                <span key={i} className="image-item">
                    <img key={i} src={previewImgUrlArr[i]} alt="업로드 이미지" className="image-preview-item" />
                    <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                        deleteInstitutionPreviewImageHandler(previewImgUrlArr[i], "I")} className="image-delete"/>
                </span>);
        }
        return result;
    }

    const customInstitutionImageSwiper = ():any[] => {
        let result:any[] = [];
        for(let i:number=0; i<institutionImageList.length; i++) {
            result.push(<SwiperSlide key={i} className="bis-item">
                <img src={institutionImageList[i].institutionImageUrl} alt="지점 이미지" />
                <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                    deleteInstitutionImageHandler(institutionImageList[i].institutionImageNo,
                        institutionImageList[i].institutionImageCustom, "I")} className="image-delete"/>
            </SwiperSlide>);
        }
        return result;
    }

    const insertInstitutionImageHandler = ():void => {
        const imageData:object = {
            institutionNo: institutionNo,
            institutionImage: attachImageArr
        }
        axios({
            method: "POST",
            url: "/lecture/insertInstitutionImage",
            data: JSON.stringify(imageData),
            headers: {'Content-type': 'application/json'}
        }).then((res):void => {
            alert("이미지 등록이 되었습니다.");
            window.location.reload()
        }).catch((err):void => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const institutionList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionNo(res.data.data[0].institutionNo);
                setInstitutionList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {institutionList().then();}, 0);
    }, [])

    useEffect(() => {
        const institutionImageList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionImageList",
                params: {institutionNo: institutionNo}
            }).then((res):void => {
                setInstitutionImageList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {institutionImageList().then();}, 0);
    }, [institutionNo])

    console.log(institutionImageList)

    return (
        <Styled.BranchInfoWriteView>
            <HeaderNavigation />

            <div className="bi-write-main">
                <div className="section-select">
                    <select onChange={(e) => {
                        setInstitutionNo(parseInt(e.target.value))
                        setSelectItem(e.target.selectedIndex)
                    }}>
                        {customInstitutionSelectBox()}
                    </select>
                </div>
                <div className="section-list">
                    {
                        institutionList.length > 0 ?
                            <div className="list-item">
                                <div className="item-name">
                                    지점명 : {institutionList[selectItem].institutionName}
                                </div>
                                <div className="item-position">
                                    지점위치 : {institutionList[selectItem].institutionPosition}
                                </div>
                                <div className="item-contact">
                                    지점문의 : {institutionList[selectItem].institutionContact}
                                </div>
                            </div>
                            :
                            <div />
                    }
                </div>
                <div className="section-submit">
                    <input type="file" id="institution-image-attach" accept="image/jpg,image/png,image/jpeg" multiple={true}
                           onChange={(e) => changeInstitutionImageHandler(e.target.files)}/>
                    <div className="submit-image-attach" style={ previewImgUrlArr.length > 0 ? {display: 'block'} : {display: 'none'} }>
                        <div className="image-attach-body">
                            {attachImageArray()}
                        </div>
                    </div>
                    <div className="submit-image-button">
                        <button onClick={() => insertInstitutionImageHandler()}>등록</button>
                    </div>
                </div>
                <div className="section-image">
                    <Swiper className="bis-list"
                            modules={[Navigation, Pagination]}
                            speed={1000}
                            spaceBetween={10}
                            slidesPerView={2}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{

                            }}>
                        {customInstitutionImageSwiper()}
                    </Swiper>
                </div>
            </div>

            <FooterNavigation />
        </Styled.BranchInfoWriteView>
    )
}
export default BranchInfoWrite;