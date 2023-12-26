import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
import React, {useMemo, useRef, useState} from "react";

interface Props {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const CustomToolBar = styled.div`
  
  #toolBar {
    width: 530px;
    background-color: ${({theme}) => theme.bgColor};
    color: ${({theme}) => theme.textColor};
    font-size: 32px;
    border: ${({theme}) => theme.borderColor};

    height: 43px;

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

    .ql-align {
      position: absolute;
      top: -15px;
      left: 45px;
    }

    .ql-bold {
      margin-left: 10px;
    }

    .ql-color {
      position: absolute;
      top: -13px;
      left: 10px;
    }

    .ql-background {
      position: absolute;
      top: -15px;
      left: 35px;
    }

    .ql-image {
    }
  }
  
  #quillContent {
    background-color: ${({theme}) => theme.boxBgColor};
    border: ${({theme}) => theme.borderColor};
    height: 350px;
    
    .ql-container {
      border: none;
    }
  }
`;

const LectureQuillEditor = (props: Props) => {
    const quillRef:any = useRef<any>();

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
        <div>
            <CustomToolBar>
                <div id="toolBar">
                    <span className="ql-formats">
                        <button className="ql-image" />
                    </span>
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
                        <select className="ql-font" defaultValue="sans-serif">
                            <option value="sans-serif">Sans Serif</option>
                            <option value="serif">Serif</option>
                            <option value="monospace">Monospace</option>
                        </select>
                    </span>
                        <span className="ql-formats">
                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                        <button className="ql-strike" />
                        <button className="ql-blockquote" />
                    </span>
                        <span className="ql-formats">
                        <select className="ql-color" />
                        <select className="ql-background" />
                    </span>
                        <span className="ql-formats">
                        <select className="ql-align" defaultValue="right">
                            <option className="ql-align-center" value="center" />
                            <option className="ql-align-right" value="right" />
                            <option className="ql-align-justify" value="justify" />
                        </select>
                    </span>
                </div>

                <ReactQuill
                    id="quillContent"
                    ref={quillRef}
                    placeholder="Quill Content"
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    onChange={props.setContent}
                    value={props.content}
                />
            </CustomToolBar>
            <div>
            </div>
        </div>
    )
}

export default LectureQuillEditor;