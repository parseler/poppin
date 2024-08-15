import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "@components/common/Header";
import Menu from "@components/common/Menu";
import { createReviewData, uploadImages } from "@api/reviews";
import useAuthStore from "@store/useAuthStore";
import { UserProps } from "@interface/users";
import { getUserData } from "@api/users";

const ReviewWrite: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserProps | null>(null);
  const [title, setTitle] = useState("");
  const [store, setStore] = useState("");
  const [popupId, setPopupId] = useState<number>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [rating, setRating] = useState(0);

  const { accessToken, userTsid, userRole } = useAuthStore();
  const quillRef = useRef<ReactQuill | null>(null);

  // 사용자 정보 가져오기
  useEffect(() => {
    if (accessToken) {
      getUserData()
        .then((data) => {
          if (data) {
            setUser({
              userTsid: userTsid !== null ? userTsid : "",
              nickname: data.nickname ?? "",
              email: data.email ?? "",
              phoneNumber: data.phoneNumber ?? "",
              userCategories: data.userCategories
                ? data.userCategories.map((cate: any) => ({
                    name: cate.name,
                  }))
                : [],
              userConsents: {
                marketingConsent: data.userConsents?.marketingConsent ?? false,
                marketingUpdatedAt: data.userConsents?.marketingUpdatedAt ?? "",
                servicePushConsent:
                  data.userConsents?.servicePushConsent ?? false,
                serviceUpdatedAt: data.userConsents?.serviceUpdatedAt ?? "",
              },
              img: data.img ?? "",
              role: userRole ?? "",
            });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, [accessToken, userTsid, userRole, navigate]);

  // URL에서 store 값을 가져와서 설정
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const storeName = params.get("store");
    const popupNumber = params.get("popupId");

    if (storeName) {
      setStore(storeName);
    }

    if (popupNumber) {
      setPopupId(Number(popupNumber));
    }
  }, [location]);

  // 후기 썸네일 처리
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setThumbnail(event.target.files[0]);
    }
  };

  // 후기 내용 처리
  const handleWriteContent = (content: string) => {
    setEditorContent(content);
  };

  // 이미지 핸들러 추가 (본문에 삽입되는 이미지 처리) - 수정된 부분
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        try {
          const uploadedImageUrl = await uploadImages(file);
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index || 0, 'image', uploadedImageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("이미지 업로드 중 오류가 발생했습니다.");
        }
      }
    };
  };

  // 후기 별점 처리
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  // 후기 작성 완료 처리
  const handleSubmit = async () => {
    if (!title || !editorContent || !thumbnail || !store) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();

      const reviewData = {
        reviewId: 0, // 서버에서 생성된 후기를 받아올 때 설정됨
        nickname: user?.nickname ?? "",
        img: user?.img ?? "",
        rating: rating,
        title: title,
        content: editorContent,
        createdAt: new Date().toISOString(),
        commentDtoList: "", // 댓글 데이터 추가 필요 시 수정
      };

      formData.append("reviewData", JSON.stringify(reviewData));

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      console.log("popupId ", popupId)
      await createReviewData(popupId!, formData);

      navigate(`/reviews/${popupId}`);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <>
      <Header leftIcon="취소" rightIcon="등록" onRightClick={handleSubmit} />

      <div id="review-write">
        <div className="review-input-title">
          <input
            type="text"
            placeholder="제목을 입력하세요 (최대 40자)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="review-input-search">
          <input
            type="text"
            placeholder="다녀온 팝업 스토어"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            readOnly
          />
        </div>
        <div className="review-input-thumbnail">
          <input
            type="text"
            placeholder="썸네일 이미지"
            readOnly
            value={thumbnail ? thumbnail.name : ""}
          />
          <label htmlFor="file">썸네일 찾기</label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </div>
        <div className="review-input-rating">
          <span>별점</span>
          <div className="review-star">
            <input
              type="radio"
              name="rating"
              value="5"
              id="rate5"
              onChange={handleRatingChange}
            />
            <label htmlFor="rate5">⭐</label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="rate4"
              onChange={handleRatingChange}
            />
            <label htmlFor="rate4">⭐</label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="rate3"
              onChange={handleRatingChange}
            />
            <label htmlFor="rate3">⭐</label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="rate2"
              onChange={handleRatingChange}
            />
            <label htmlFor="rate2">⭐</label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="rate1"
              onChange={handleRatingChange}
            />
            <label htmlFor="rate1">⭐</label>
          </div>
        </div>
        <ReactQuill
          ref={quillRef}
          value={editorContent}
          onChange={handleWriteContent}
          modules={{
            ...modules,
            handlers: { image: imageHandler }
          }}
          formats={formats}
        />
      </div>

      <Menu />
    </>
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
