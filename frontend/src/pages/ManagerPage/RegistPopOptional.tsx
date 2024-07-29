import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@css/ManagerPage/RegistPopOptional.css";

import secondStep from "@assets/secondStep.svg";

function RegistPopOptional() {
  const navigate = useNavigate();

  const [activeButtons, setActiveButtons] = useState({
    parking: "",
    fee: "",
    pet: "",
    food: "",
    photo: "",
    age: "",
  });

  const handleButtonClick = (category: string, value: string) => {
    setActiveButtons((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const goRegistFinish = () => {
    navigate("/regist-pop-fin");
  };

  const goReservationRegist = () => {
    navigate("/");
  };

  return (
    <div id="regist-pop-optional">
      <div className="optional-info-title">팝업스토어 선택 정보</div>
      <div className="step-two">
        <img src={secondStep} />
      </div>
      <div className="sns">
        <div className="sns-title">SNS 링크</div>
        <input placeholder="SNS 링크를 입력하세요. (블로그, 인스타그램 등)" />
      </div>
      <div className="homepage">
        <div className="homepage-title">홈페이지 링크</div>
        <input placeholder="홈페이지 링크를 입력하세요." />
      </div>
      <div className="more-details">
        <div className="more-details-title">팝업스토어 추가 사항</div>
        <div className="parking">
          <div>주차 가능 여부</div>
          <div className="buttons">
            <button
              className={activeButtons.parking === "불가능" ? "active" : ""}
              onClick={() => handleButtonClick("parking", "불가능")}
            >
              불가능
            </button>
            <button
              className={activeButtons.parking === "가능" ? "active" : ""}
              onClick={() => handleButtonClick("parking", "가능")}
            >
              가능
            </button>
          </div>
        </div>
        <div className="fee">
          <div>입장료 유무</div>
          <div className="buttons">
            <button
              className={activeButtons.fee === "무료" ? "active" : ""}
              onClick={() => handleButtonClick("fee", "무료")}
            >
              무료
            </button>
            <button
              className={activeButtons.fee === "유료" ? "active" : ""}
              onClick={() => handleButtonClick("fee", "유료")}
            >
              유료
            </button>
          </div>
        </div>
        <div className="pet">
          <div>반려동물 출입</div>
          <div className="buttons">
            <button
              className={activeButtons.pet === "불가능" ? "active" : ""}
              onClick={() => handleButtonClick("pet", "불가능")}
            >
              불가능
            </button>
            <button
              className={activeButtons.pet === "가능" ? "active" : ""}
              onClick={() => handleButtonClick("pet", "가능")}
            >
              가능
            </button>
          </div>
        </div>
        <div className="food">
          <div>외부 음식 반입</div>
          <div className="buttons">
            <button
              className={activeButtons.food === "불가능" ? "active" : ""}
              onClick={() => handleButtonClick("food", "불가능")}
            >
              불가능
            </button>
            <button
              className={activeButtons.food === "가능" ? "active" : ""}
              onClick={() => handleButtonClick("food", "가능")}
            >
              가능
            </button>
          </div>
        </div>
        <div className="photo">
          <div>사진 촬영</div>
          <div className="buttons">
            <button
              className={activeButtons.photo === "불가능" ? "active" : ""}
              onClick={() => handleButtonClick("photo", "불가능")}
            >
              불가능
            </button>
            <button
              className={activeButtons.photo === "가능" ? "active" : ""}
              onClick={() => handleButtonClick("photo", "가능")}
            >
              가능
            </button>
          </div>
        </div>
        <div className="age">
          <div>연령 제한</div>
          <div className="buttons">
            <button
              className={activeButtons.age === "없음" ? "active" : ""}
              onClick={() => handleButtonClick("age", "없음")}
            >
              없음
            </button>
            <button
              className={activeButtons.age === "19세 이상" ? "active" : ""}
              onClick={() => handleButtonClick("age", "19세 이상")}
            >
              19세 이상
            </button>
          </div>
        </div>
      </div>
      <div className="omit-or-regist">
        <button className="omit" onClick={goRegistFinish}>
          예약 건너뛰기
        </button>
        <button className="regist" onClick={goReservationRegist}>
          예약 정보 등록
        </button>
      </div>
    </div>
  );
}

export default RegistPopOptional;
