import React, {useEffect, useState} from "react";

import FooterNavigation from "../navigation/FooterNavigation";
import HeaderNavigation from "../navigation/HeaderNavigation";

import * as Styled from "./Faq.style";
import axios from "axios";

const FaqWrite = () => {

    const [faqCategoryList, setFaqCategoryList] = useState<{
        faqCategoryNo:number;
        faqCategoryFlag:string;
        faqCategoryName:string;
        faqCategoryDesc:string;
    }[]>([]);

    const [faqCategory, setFaqCategory] = useState<string>("QM");
    const [faqTitle, setFaqTitle] = useState<string>("");
    const [faqContent, setFaqContent] = useState<string>("");

    const customFaqCategorySelectBox = ():any => {
        const result:any[] = [];

        for(let i:number=0; i<faqCategoryList.length; i++) {
            result.push(<option key={i} value={faqCategoryList[i].faqCategoryFlag}>
                {faqCategoryList[i].faqCategoryName}
            </option>)
        }
        return result;
    }

    const faqWriteHandler = ():boolean => {
        const faqData:object = {
            faqCategory: faqCategory,
            faqTitle: faqTitle,
            faqContent: faqContent
        }
        if(faqTitle.length < 1) {
            alert('제목을 작성해주세요.');
            return false;
        } else if(faqContent.length < 1) {
            alert('내용을 작성해주세요.');
            return false;
        } else {
            if(window.confirm("작성하시겠습니까?") == true) {
                axios({
                    method: "POST",
                    url: "/faq/faqWrite",
                    data: JSON.stringify(faqData),
                    headers: {'Content-type': 'application/json'}
                }).then((res):void => {
                    alert("작성이 완료되었습니다.");
                    window.location.reload();
                }).catch((err):void => {
                    console.log(err.message);
                })
                return true;
            } else {
                return false;
            }
        }
    }

    useEffect(() => {
        const faqCategoryListData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/faq/faqCategoryList"
            }).then((res):void => {
                if(faqCategory.length < 1) {
                    setFaqCategory(res.data.data[0].faqCategoryFlag)
                }
                setFaqCategoryList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {faqCategoryListData().then();}, 0);
    }, [])

    return (
        <Styled.FaqWriteView>
            <HeaderNavigation />

            <div className="faq-write-main">
                <div className="faq-write-top">
                    <div className="write-category">
                        <div className="section-title">카테고리</div>
                        <select onChange={(e) => setFaqCategory(e.target.value)}>
                            {customFaqCategorySelectBox()}
                        </select>
                    </div>
                    <div className="write-title">
                        <div className="section-title">제목</div>
                        <input type="text" onChange={(e) => setFaqTitle(e.target.value)} />
                    </div>
                </div>
                <div className="faq-write-bot">
                    <div className="section-title">내용</div>
                    <textarea onChange={(e) => setFaqContent(e.target.value)} />

                    <div className="faq-submit">
                        <button onClick={() => faqWriteHandler()}>작성</button>
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.FaqWriteView>
    )
}

export default FaqWrite;