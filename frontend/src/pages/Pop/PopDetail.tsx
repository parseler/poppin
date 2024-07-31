import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import PopDetailInfo from "@components/Pop/PopDetailInfo";
import PopDetailReservation from "@components/Pop/PopDetailReservation";
import PopDetailReview from "@components/Pop/PopDetailReview";
import PopDetailChat from "@components/Pop/PopDetailChat";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@css/Pop/PopDetail.css";

import image1 from "@assets/image1.svg";
import image2 from "@assets/sponge2.jpg";
import image3 from "@assets/sponge.jpg";
import backButton from "@assets/backButton.svg";
import scoreIcon from "@assets/scoreIcon.svg";
import likeIcon from "@assets/likeIcon.svg";
import noneLike from "@assets/noneLike.svg";
import fillLike from "@assets/fillLike.svg";
import editIcon from "@assets/editIcon.svg";  // 수정 아이콘 이미지 추가

const initialIntroduceContent = `
베베와 멜롱이가 라인프렌즈 스퀘어에 두둥등장💫🔥!!

🌏Bebe the World 팝업
🗓️2024.7.5 - 2024.7.18 KST
📍라인프렌즈 스퀘어 성수

🎁베베 더 월드 팝업 Special Gifts

-베베 더 오리 스티커 1개 증정
*베베 더 월드 팝업 스토어 방문 고객 전원

-베레모 베베 부채 1개 증정
*베베 더 오리 상품 1만원 이상 구매 시

-베베 더 오리 리유저블백 1개 증정
*베베 더 오리 상품 7만원 이상 구매 시

*한정 수량 선착순 증정, 소진 시 별도 고지없이 종료
`;

function PopDetail() {
  const [activeTab, setActiveTab] = useState<string | null>("info");
  const [liked, setLiked] = useState(false);
  const [isManager, setIsManager] = useState(true);  // 매니저 여부 상태를 true로 설정
  const [isEditing, setIsEditing] = useState(false);  // 수정 모드 상태 추가
  const [title, setTitle] = useState("베베 더 월드 팝업스토어");
  const [date, setDate] = useState("24.07.05. ~ 24.07.18.");
  const [location, setLocation] = useState("서울특별시 성동구 성수이로 77 라인프렌즈 스퀘어 성수");
  const [hours, setHours] = useState("10:00~18:00");
  const [website, setWebsite] = useState("https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp");
  const [instagram, setInstagram] = useState("https://www.instagram.com/bebe_the_ori/");
  const [services, setServices] = useState({
    parking: true,
    fee: true,
    pet: true,
    food: undefined,
    photo: false,
    ageLimit: undefined,
  });
  const [description, setDescription] = useState(initialIntroduceContent);

  const navigate = useNavigate();

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }), []);

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    // 수정 내용을 저장하는 로직을 추가합니다.
    setIsEditing(false);
  };

  return (
    <div id="pop-detail">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-slide">
            <img src={image1} alt="팝업스토어 이미지 1" />
          </div>
          <div className="slider-slide">
            <img src={image2} alt="팝업스토어 이미지 2" />
          </div>
          <div className="slider-slide">
            <img src={image3} alt="팝업스토어 이미지 3" />
          </div>
        </Slider>
        <button className="back-button" onClick={onClickBack} aria-label="뒤로가기">
          <img src={backButton} alt="뒤로가기" />
        </button>
        <button onClick={toggleLike} className="like-button" aria-label="좋아요">
          <img src={liked ? fillLike : noneLike} alt="좋아요" />
        </button>
        {isManager && (
          <>
            <button className="edit-button" onClick={handleEditToggle} aria-label="수정">
              <img src={editIcon} alt="수정" />
            </button>
            {isEditing && (
              <button className="save-button" onClick={handleSave} aria-label="저장">
                저장
              </button>
            )}
          </>
        )}
      </div>
      <div className="main-info">
        {isEditing ? (
          <div className="edit-form">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="edit-input" />
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="edit-input" />
          </div>
        ) : (
          <>
            <div className="title">{title}</div>
            <div className="date">
              <h5>{date}</h5>
            </div>
          </>
        )}
        <div className="score-like">
          <div className="score">
            <img src={scoreIcon} alt="점수 아이콘" />
            4.8
          </div>
          <div className="like">
            <img src={likeIcon} alt="좋아요 아이콘" />
            177
          </div>
        </div>
      </div>
      <div className="tab">
        <div
          onClick={() => onTabClick("info")}
          className={activeTab === "info" ? "active" : ""}
        >
          정보
        </div>
        <div
          onClick={() => onTabClick("reservation")}
          className={activeTab === "reservation" ? "active" : ""}
        >
          예약
        </div>
        <div
          onClick={() => onTabClick("review")}
          className={activeTab === "review" ? "active" : ""}
        >
          리뷰
        </div>
        <div
          onClick={() => onTabClick("chat")}
          className={activeTab === "chat" ? "active" : ""}
        >
          채팅
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "info" && (
          <PopDetailInfo
            isEditing={isEditing}
            location={location}
            hours={hours}
            website={website}
            instagram={instagram}
            services={services}
            description={description}
            onLocationChange={setLocation}
            onHoursChange={setHours}
            onWebsiteChange={setWebsite}
            onInstagramChange={setInstagram}
            onServicesChange={setServices}
            onDescriptionChange={setDescription}
          />
        )}
        {activeTab === "reservation" && <PopDetailReservation title={title} />}
        {activeTab === "review" && <PopDetailReview />}
        {activeTab === "chat" && <PopDetailChat />}
      </div>
    </div>
  );
}

export default PopDetail;
