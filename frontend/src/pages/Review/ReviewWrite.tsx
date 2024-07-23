import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useRef, useState } from "react";

const ReviewWrite = () => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);

  const handleWriteContent = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div id="review-write">
      <div className="review-input-title">
        <input type="text" placeholder="제목을 입력하세요 (최대 40자)" />
      </div>
      <div className="review-input-search">
        <input type="text" placeholder="다녀온 팝업 스토어" />
      </div>
      <div className="review-input-thumbnail">
        <input type="text" placeholder="썸네일 이미지" />
        <label htmlFor="file">썸네일 찾기</label>
        <input id="file" type="file" accept="image/*" />
      </div>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={handleWriteContent}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }, { align: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
  ],
};

const formats = [
  "font",
  "size",
  "color",
  "background",
  "align",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default ReviewWrite;
