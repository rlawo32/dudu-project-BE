import React, {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark as attachDelete} from "@fortawesome/free-solid-svg-icons";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface Props {
    useType: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    Image: {
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[];
    setImage: React.Dispatch<React.SetStateAction<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>>;
}

const CustomQuillEditorView = styled.div`
  
  #toolBar {
    height: 43px;
    width: 100%;
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    background-color: ${({theme}) => theme.bgColor};
    color: ${({theme}) => theme.textColor};
    font-size: 32px;
    
    .ql-picker-label {
      color: ${({theme}) => theme.textColor};
    }
    
    svg {
      path {
        stroke: ${({theme}) => theme.textColor};
      }
      rect {
        stroke: ${({theme}) => theme.textColor};
      }
      circle {
        fill: ${({theme}) => theme.textColor};
      }
      polyline {
        stroke: ${({theme}) => theme.textColor};
      }
      polygon {
        stroke: ${({theme}) => theme.textColor};
      }
      line {
        fill: ${({theme}) => theme.textColor};
        stroke: ${({theme}) => theme.textColor};
      }
      fill: ${({theme}) => theme.textColor};
      stroke: ${({theme}) => theme.textColor};
    }
    
    .ql-formats {
      position: relative;
      top: -10px;
    }
  }
  
  #quillContent {
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    background-color: ${({theme}) => theme.boxBgColor};
    
    .ql-container {
      height: 650px;
      width: 100%;
      border: none;
      font-size: 25px;
    }
  }
  
  .write-image-attach {
    margin-top: 10px;
    padding: 5px 10px 5px 10px;
    border: ${({theme}) => theme.borderColor};
    border-radius: 10px;
    
    .write-image-attach-header {
      margin-bottom: 10px;
    }
    
    .write-image-attach-body {
      
      .write-attach-item {
        position: relative;
        
        .write-attach-image {
          height: 100px;
          width: 100px;
          margin-right: 3px;
          border: ${({theme}) => theme.borderColor};
          border-radius: 20px;
        }
        
        .write-attach-delete {
          position: absolute;
          top: -81px;
          left: 83px;
          color: orangered;
          cursor: pointer;
        }
      }
    }
  }
`;

const LectureQuillEditor = (props: Props) => {
    const quillRef:any = useRef<any>();

    const [previewWriteImgUrlArr, setPreviewWriteImgUrlArr] = useState<string[]>([]); // 미리보기를 위한 state
    const [previewWriteImgNameArr, setPreviewWriteImgNameArr] = useState<string[]>([]); // 삭제를 위한 state
    const [previewWriteImgSize, setPreviewWriteImgSize] = useState<number>(0); // 업로드한 이미지 용량 state
    const [attachImageArr, setAttachImageArr] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);

    const changeImageHandler = ():void => {
        const input:HTMLInputElement = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/jpg,image/png,image/jpeg");
        input.setAttribute("multiple", "multiple");
        input.click();

        input.onchange = async ():Promise<void> => {
            let file:FileList|null = input.files;
            const editor:any = quillRef.current.getEditor();
            const range:any = editor.getSelection();
            let fileSize:number = 0;

            if(file !== null) {
                for(let i:number=0; i<file.length; i++) {
                    fileSize += file[i].size;
                    const formData:FormData = new FormData();
                    formData.append('files', file[i]);
                    formData.append('type', props.useType);

                    await axios({
                        method: "POST",
                        url: "/lecture/lectureUploadImage",
                        data: formData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then((res):void => {
                        const imgFileType:string = props.useType;
                        const imgFileName:string = res.data.data.imgName;
                        const imgFileUrl:string = res.data.data.imgUrl;

                        setPreviewWriteImgUrlArr((prevList:string[]) => [...prevList, imgFileUrl]);
                        setPreviewWriteImgNameArr((prevList:string[]) => [...prevList, imgFileName]);
                        setAttachImageArr((prevList) => [...prevList, {
                            imgType: imgFileType,
                            imgName: imgFileName,
                            imgUrl: imgFileUrl,
                            imgSize: file !== null ? file[i].size : 0
                        }]);
                        editor.insertEmbed(range.index, 'image', imgFileUrl);
                        editor.setSelection(range.index + 1);
                    }).catch((err):void => {
                        console.log(err.message);
                    })
                }
                setPreviewWriteImgSize(prevList => prevList + fileSize);
            }
        }
    }

    const attachImageArray = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<previewWriteImgUrlArr.length; i++) {
            result.push(
                <span key={i} className="write-attach-item">
                    <img key={i} src={previewWriteImgUrlArr[i]} alt="업로드 이미지" className="write-attach-image" />
                    <FontAwesomeIcon icon={attachDelete} onClick={(e) =>
                        attachImageDelete(previewWriteImgUrlArr[i], props.useType)} className="write-attach-delete"/>
                </span>);
        }
        return result;
    }

    const attachImageSize = ():string => {
        let result:string;
        let sizeName:string[] = ["KB", "MB"];
        let imageSize:number = previewWriteImgSize / 1024;

        if(parseFloat(imageSize.toFixed(1)) < 1000) {
            result = imageSize.toFixed(1) + sizeName[0];
        } else {
            imageSize = imageSize / 1024;
            result = imageSize.toFixed(2) + sizeName[1];
        }
        return result;
    }

    const attachImageDelete = async (url:string, deleteType:string):Promise<void> => {
        let removeImgSize:number = 0;
        let removeImgName:string = "";

        for (let i:number = 0; i < attachImageArr.length; i++) {
            if (attachImageArr[i].imgUrl === url) {
                removeImgSize = attachImageArr[i].imgSize;
                removeImgName = attachImageArr[i].imgName;
            }
        }
        setPreviewWriteImgUrlArr(previewWriteImgUrlArr.filter((value:string) => value !== url));
        setPreviewWriteImgSize(previewWriteImgSize - removeImgSize);
        setAttachImageArr(attachImageArr.filter((value) => value.imgUrl !== url))

        const removeImg:Element|null = document.querySelector('img[src="' + url + '"]');

        if(removeImg !== null) {
            removeImg.remove();
        }
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

    const formats:string[] = [
        "header", "size", "font",
        "bold", "italic", "underline", "strike", "blockquote",
        "list", "bullet", "indent", "link", "image",
        "color", "background", "align",
        "script", "code-block", "clean"
    ];

    const modules:{} = useMemo(() => ({
        toolbar: {
            container: "#toolBar",
            handlers: {
                image: changeImageHandler
            }
        },
    }), []);

    useEffect(() => {
        props.setImage(attachImageArr);
    }, [attachImageArr])

    return (
        <CustomQuillEditorView>
            <div id="toolBar">
                <span className="ql-formats">
                    <select className="ql-header" defaultValue="7">
                        <option value="1">Header 1</option>
                        <option value="2">Header 2</option>
                        <option value="3">Header 3</option>
                        <option value="4">Header 4</option>
                        <option value="5">Header 5</option>
                        <option value="6">Header 6</option>
                        <option value="7">Normal</option>
                    </select>
                    <select className="ql-size" defaultValue="medium">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                    </select>
                    <select className="ql-font" defaultValue="sans-serif" />
                </span>
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-blockquote" />
                </span>

                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                    <button className="ql-indent" value="-1" />
                    <button className="ql-indent" value="+1" />
                </span>
                <span className="ql-formats">
                    <select className="ql-color" />
                    <select className="ql-background" />
                    <select className="ql-align" />
                </span>
                <span className="ql-formats">
                    <button className="ql-code-block" />
                    <button className="ql-link" />
                    <button className="ql-image" />
                </span>
            </div>

            <ReactQuill
                id="quillContent"
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={props.setContent}
                value={props.content}
            />

            <div className="write-image-attach" style={ previewWriteImgUrlArr.length > 0 ? {display: 'block'} : {display: 'none'} }>
                <div className="write-image-attach-header">
                    <span>이미지 첨부</span>
                    <span style={{marginLeft: '10px'}}>{attachImageArray().length} 개</span>
                    <span style={{marginLeft: '10px'}}>({attachImageSize()} / 5.00MB)</span>
                </div>
                <div className="write-image-attach-body">
                    {attachImageArray()}
                </div>
            </div>
        </CustomQuillEditorView>
    )
}

export default LectureQuillEditor;