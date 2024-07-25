import { useState } from "react";
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

function PopDetail() {
  const [activeTab, setActiveTab] = useState<string | null>("info");
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const onTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const onClickBack = () => {
    navigate("/");
  };

  const title = "베베 더 월드 팝업스토어";

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
        <button className="back-button" onClick={onClickBack}>
          <img src={backButton} />
        </button>
        <button onClick={toggleLike} className="like-button">
          <img src={liked ? fillLike : noneLike} alt="좋아요" />
        </button>
      </div>
      <div className="main-info">
        <div className="title">{title}</div>
        <div className="date">
          <h5>24.07.05. ~ 24.07.18.</h5>
        </div>
        <div className="score-like">
          <div className="score">
            <img src={scoreIcon} />
            4.8
          </div>
          <div className="like">
            <img src={likeIcon} />
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
        {activeTab === "info" && <PopDetailInfo />}
        {activeTab === "reservation" && <PopDetailReservation title={title} />}
        {activeTab === "review" && <PopDetailReview />}
        {activeTab === "chat" && <PopDetailChat />}
      </div>
    </div>
  );
}

export default PopDetail;
