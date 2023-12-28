import React, {useMemo, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface Props {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
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
      height: 350px;
      width: 100%;
      border: none;
      font-size: 30px;
    }
  }
`;

const LectureQuillEditor = (props: Props) => {
    const quillRef:any = useRef<any>();

    const [previewWriteImgUrlArr, setPreviewWriteImgUrlArr] = useState<string[]>([]);
    const [previewWriteImgNameArr, setPreviewWriteImgNameArr] = useState<string[]>([]);
    const [previewWriteImgSize, setPreviewWriteImgSize] = useState<number>(0);
    const [attachImageArr, setAttachImageArr] = useState([{
        imgName: '',
        imgUrl: '',
        imgSize: 0
    }]);
    const [removeImageArr, setRemoveImageArr] = useState<string[]>([]);

    const changeImageHandler = ():void => {
        const input:HTMLInputElement = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/jpg,image/png,image/jpeg,image/gif");
        input.setAttribute("multiple", "multiple");
        input.click();

        input.onchange = async ():Promise<void> => {
            let file:FileList|null = input.files;
            const editor:any = quillRef.current.getEditor();
            const range:any = editor.getSelection();

            let fileSize:number = 0;

            if(file !== null) {
                const formData:FormData = new FormData();

                for(let i:number=0; i<file.length; i++) {
                    fileSize += file[i].size;
                    formData.append('files', file[i]);

                    await axios({
                        method: "POST",
                        url: "",
                        data: formData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then((res):void => {
                        const imgFileName = res.data.data.imgName;
                        const imgFileUrl = res.data.data.imgUrl;

                        setPreviewWriteImgUrlArr((prevList:string[]) => [...prevList, imgFileUrl]);
                        setPreviewWriteImgNameArr((prevList:string[]) => [...prevList, imgFileName]); // imgName 성공시 삭제
                        setAttachImageArr((prevList) => [...prevList, {
                            imgName:imgFileName,
                            imgUrl:imgFileUrl,
                            imgSize:file !== null ? file[i].size : 0
                        }]);


                        editor.insertEmbed(range.index, 'image', imgFileUrl);
                        editor.setSelection(range.index + 1);
                    }).catch((err):void => {
                        console.log(err.message);
                    })
                }
            }
        }
    }

    const formats:string[] = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "code-block",
    ];

    const modules:{} = useMemo(() => ({
        toolbar: {
            container: "#toolBar",
            // handlers: {
            //     image: changeImageHandler
            // }
        },
    }), []);

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
                    <button className="ql-link" />
                    <button className="ql-image" />
                </span>
                <span className="ql-formats">
                    <button className="ql-formula" />
                    <button className="ql-code-block" />
                    <button className="ql-clean" />
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
        </CustomQuillEditorView>
    )
}

export default LectureQuillEditor;