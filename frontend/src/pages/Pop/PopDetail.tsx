import { useState, useEffect } from "react";
import Slider from "react-slick";
import PopDetailInfo from "../../components/Pop/PopDetailInfo";
import PopDetailReservation from "../../components/Pop/PopDetailReservation";
import PopDetailReview from "../../components/Pop/PopDetailReview";
import PopDetailChat from "../../components/Pop/PopDetailChat";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PopDetail.css";

import image1 from "../../assets/sponge.jpg";
import image2 from "../../assets/sponge2.jpg";
import image3 from "../../assets/sponge.jpg";
import scoreIcon from "../../assets/scoreIcon.png";
import likeIcon from "../../assets/likeIcon.png";
import noneLike from "../../assets/noneLike.png";
import fillLike from "../../assets/fillLike.png";

function PopDetail() {
  const [activeTab, setActiveTab] = useState(()=>{
    const savedTab=localStorage.getItem("activeTab");
    return savedTab || "info";
  });
  const [liked, setLiked] = useState(false);



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

  const handleTabClick = (tab: string) => {
    if(tab==="info" || tab==="reservation" ||tab==="review"||tab==="chat"){
      setActiveTab(tab);
    } else {
      tab===activeTab;
      setActiveTab(tab);
    }
    console.log("이거 찍음: ",tab);
  }

  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={image1} alt="팝업스토어 이미지 1" />
          </div>
          <div>
            <img src={image2} alt="팝업스토어 이미지 2" />
          </div>
          <div>
            <img src={image3} alt="팝업스토어 이미지 3" />
          </div>
        </Slider>
        <button onClick={toggleLike} className="like-button">
          <img src={liked ? fillLike : noneLike} alt="좋아요" />
        </button>
      </div>
      <div className="main-info">
        <div className="title">제목</div>
        <div className="date">
          <h5>일정</h5>
        </div>
        <div className="score-like">
          <div className="score">
            <img src={scoreIcon} />
            별점
          </div>
          <div className="like">
            <img src={likeIcon} />
            좋아요 수
          </div>
        </div>
      </div>
      <div className="tab">
        <button
          onClick={() => handleTabClick("info")}
          className={activeTab === "info" ? "active" : ""}
        >
          정보
        </button>
        <button
          onClick={() => handleTabClick("reservation")}
          className={activeTab === "reservation" ? "active" : ""}
        >
          예약
        </button>
        <button
          onClick={() => handleTabClick("review")}
          className={activeTab === "review" ? "active" : ""}
        >
          리뷰
        </button>
        <button
          onClick={() => handleTabClick("chat")}
          className={activeTab === "chat" ? "active" : ""}
        >
          채팅
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "info" && <PopDetailInfo />}
        {activeTab === "reservation" && <PopDetailReservation />}
        {activeTab === "review" && <PopDetailReview />}
        {activeTab === "chat" && <PopDetailChat />}
      </div>
    </div>
  );
}

export default PopDetail;
