import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPopupDetail } from "@api/apiPop";
import Slider from "react-slick";
import PopDetailInfo from "@components/Pop/PopDetailInfo";
import PopDetailReservation from "@components/Pop/PopDetailReservation";
import PopDetailReview from "@components/Pop/PopDetailReview";
import PopDetailChat from "@components/Pop/PopDetailChat";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@css/Pop/PopDetail.css";

import backButton from "@assets/backButton.svg";
import scoreIcon from "@assets/scoreIcon.svg";
import likeIcon from "@assets/likeIcon.svg";
import noneLike from "@assets/noneLike.svg";
import fillLike from "@assets/fillLike.svg";
import editIcon from "@assets/editIcon.svg";

interface PopupDetail {
  popupId: number;
  name: string;
  startDate: string;
  endDate: string;
  hours: string;
  snsUrl: string;
  pageUrl: string;
  content: string;
  description: string;
  address: string;
  lat: number;
  lon: number;
  heart: number;
  hit: number;
  rating: number;
  deleted: boolean;
  managerTsId: number;
  images: string[];
}

const PopDetail = () => {
  const { popupId } = useParams<{ popupId: string }>();
  const [popupDetail, setPopupDetail] = useState<PopupDetail | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("info");
  const [liked, setLiked] = useState(false);
  const [isManager] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopupDetail = async () => {
      if (!popupId) {
        console.error("popupId is missing");
        return;
      }
      try {
        const data = await getPopupDetail(parseInt(popupId, 10));
        setPopupDetail(data);
      } catch (error) {
        console.error("Error fetching popup detail:", error);
      }
    };
    fetchPopupDetail();
  }, [popupId]);

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    }),
    []
  );

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
    setIsEditing(false);
  };

  if (!popupDetail) {
    return <div>팝업 정보를 불러오지 못했습니다.</div>;
  }



  return (
    <div id="pop-detail">
      <div className="slider-container">
        <Slider {...settings}>
          {popupDetail.images.map((image: string, index: number) => (
            <div className="slider-slide" key={index}>
              <img src={`http://localhost/${image.replace('./','')}`} alt={`팝업스토어 이미지 ${index + 1}`} />
            </div>
          ))}
        </Slider>
        <button
          className="back-button"
          onClick={onClickBack}
          aria-label="뒤로가기"
        >
          <img src={backButton} alt="뒤로가기" />
        </button>
        <button
          onClick={toggleLike}
          className="like-button"
          aria-label="좋아요"
        >
          <img src={liked ? fillLike : noneLike} alt="좋아요" />
        </button>
        {isManager && (
          <>
            <button
              className="edit-button"
              onClick={handleEditToggle}
              aria-label="수정"
            >
              <img src={editIcon} alt="수정" />
            </button>
            {isEditing && (
              <button
                className="save-button"
                onClick={handleSave}
                aria-label="저장"
              >
                저장
              </button>
            )}
          </>
        )}
      </div>
      <div className="main-info">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={popupDetail.name}
              onChange={(e) =>
                setPopupDetail({ ...popupDetail, name: e.target.value })
              }
              className="edit-input"
            />
            <input
              type="text"
              value={popupDetail.startDate}
              onChange={(e) =>
                setPopupDetail({ ...popupDetail, startDate: e.target.value })
              }
              className="edit-input"
            />
            ~
            <input
              type="text"
              value={popupDetail.endDate}
              onChange={(e) =>
                setPopupDetail({ ...popupDetail, endDate: e.target.value })
              }
              className="edit-input"
            />
          </div>
        ) : (
          <>
            <div className="title">{popupDetail.name}</div>
            <div className="date">
              <h5>{`${popupDetail.startDate} ~ ${popupDetail.endDate}`}</h5>
            </div>
          </>
        )}
        <div className="score-like">
          <div className="score">
            <img src={scoreIcon} alt="점수 아이콘" />
            {popupDetail.rating}
          </div>
          <div className="like">
            <img src={likeIcon} alt="좋아요 아이콘" />
            {popupDetail.heart}
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
            location={popupDetail.address}
            hours={popupDetail.hours}
            website={popupDetail.pageUrl}
            instagram={popupDetail.snsUrl}
            content={popupDetail.content}
            description={popupDetail.description}
            lat={popupDetail.lat}
            lon={popupDetail.lon}
            onLocationChange={(address) =>
              setPopupDetail({ ...popupDetail, address })
            }
            onHoursChange={(hours) => setPopupDetail({ ...popupDetail, hours })}
            onWebsiteChange={(pageUrl) =>
              setPopupDetail({ ...popupDetail, pageUrl })
            }
            onInstagramChange={(snsUrl) =>
              setPopupDetail({ ...popupDetail, snsUrl })
            }
            onContentChange={(services) =>
              setPopupDetail({ ...popupDetail, content: services })
            }
            onDescriptionChange={(description) =>
              setPopupDetail({ ...popupDetail, description })
            }
          />
        )}
        {activeTab === "reservation" && (
          <PopDetailReservation title={popupDetail.name} />
        )}
        {activeTab === "review" && <PopDetailReview />}
        {activeTab === "chat" && <PopDetailChat />}
      </div>
    </div>
  );
};

export default PopDetail;
