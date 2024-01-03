import HeaderNavigation from "../navigation/HeaderNavigation";
import axios from "axios";

import LectureEventSwiperView from "./lectureListComponent/LectureEventSwiperView";
import LectureMainCategoryView from "./lectureListComponent/LectureMainCategoryView";
import LectureSubCategoryView from "./lectureListComponent/LectureSubCategoryView";
import LectureListBoxView from "./lectureListComponent/LectureListBoxView";
import React, {useEffect, useRef, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./LectureList.style";

const LectureList = () => {
    const selectBox:any = useRef<any>();
    const selectItem:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionContact:string;
    }[]>([{
        institutionNo: 0,
        institutionName: '',
        institutionContact: ''
    }]);
    const [lectureList, setLectureList] = useState<{
        lectureNo:number;
        lectureTitle:string;
        lectureDivision:string;
        lectureTeacher:string;
        lectureTime:string;
        lectureFee:number;
        lectureInstitution:string;
        lectureStateNo:number;
        lectureCount:number;
        lectureThumbnail:string;
    }[]>([{
        lectureNo: 0,
        lectureTitle: '',
        lectureDivision: '',
        lectureTeacher: '',
        lectureTime: '',
        lectureFee: 0,
        lectureInstitution: '',
        lectureStateNo: 0,
        lectureCount: 0,
        lectureThumbnail: ''
    }]);

    const [institutionNo, setInstitutionNo] = useState<number>(1);
    const [mainCategoryNo, setMainCategoryNo] = useState<number>(0);
    const [subCategoryNo, setSubCategoryNo] = useState<number>(0);
    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);

    const paging:object = {
        institutionNo: institutionNo,
        mainCategoryNo: mainCategoryNo,
        subCategoryNo: subCategoryNo
    }

    const customInstitutionSelectBox = ():any => {
        const result:any[] = [];

        for(let i:number=0; i<institutionList.length; i++) {
            result.push(<li key={institutionList[i].institutionNo} value={institutionList[i].institutionNo}
                            onClick={() => onClickInstitutionSelectBox(institutionList[i].institutionNo, i)}
                            ref={li => (selectItem.current[i] = li)}>
                {institutionList[i].institutionName}
            </li>)
        }
        return result;
    }

    const onClickInstitutionSelectBox = (idx:number, refIdx:number):any => {
        setIsSelectBoxShow(false);
        setInstitutionNo(idx);

        selectItem.current[refIdx].className = selectItem.current[refIdx].className.replace('si-active', '');
        selectItem.current[refIdx].className += 'si-active';

        for(let i:number=0; i<selectItem.current.length; i++) {
            if(i !== refIdx) {
                selectItem.current[i].className = selectItem.current[i].className.replace('si-active', '');
            }
        }
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
        institutionList().then();
    }, [])

    useEffect(() => {
        const lectureList = async () => {
           await axios({
               method: "GET",
               url: '/lecture/lectureList',
               params: paging
           }).then((res):void => {
               setLectureList(res.data.data);
           }).catch((err):void => {
               console.log(err.message);
           });
        }
        lectureList().then();
    }, [institutionNo, mainCategoryNo, subCategoryNo])

    useEffect(() => {
        setMainCategoryNo(0);
        setSubCategoryNo(0);
    }, [institutionNo])

    useEffect(() => {
        if(isSelectBoxShow) {
            selectBox.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
        }
    }, [isSelectBoxShow])

    return (
        <Styled.LectureListView>
            <HeaderNavigation />

            <div className="lt-list-header">
                <div className="custom-selectBox">
                    <div className="select-btn" onClick={() => setIsSelectBoxShow(!isSelectBoxShow)}>
                        {institutionList[institutionNo-1].institutionName}
                        <div className="select-arrow" ref={selectArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="select-list" ref={selectBox}>
                        {customInstitutionSelectBox()}
                    </ul>
                </div>
                <LectureEventSwiperView institutionNo={institutionNo} />
            </div>

            <div className="lt-list-main">
                <LectureMainCategoryView institutionNo={institutionNo} setMainCategoryNo={setMainCategoryNo}/>
                {
                    mainCategoryNo !== 0 ?
                        <LectureSubCategoryView mainCategoryNo={mainCategoryNo} setSubCategoryNo={setSubCategoryNo}/>
                        :
                        <></>
                }

                <LectureListBoxView lectureList={lectureList}/>
            </div>

        </Styled.LectureListView>
    )
}

export default LectureList;