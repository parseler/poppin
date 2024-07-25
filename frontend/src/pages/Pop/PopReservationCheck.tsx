import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@css/Pop/PopReservationCheck.css";

import edit from "@assets/edit.svg";
import nextButton from "@assets/nextButton.svg";

function PopReservationCheck() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    title,
    selectedDate,
    selectedTime,
    peopleCount,
    name: initialName,
    contact: initialContact,
    email: initialEmail,
  } = location.state || {};

  const [name, setName] = useState(initialName || "");
  const [contact, setContact] = useState(initialContact || "");
  const [email, setEmail] = useState(initialEmail || "");

  const reservationFin = () => {
    navigate("/reservation-check/finish");
  };

  return (
    <div id="pop-reservation-check">
      <div className="check-content">
        <div>아래 내용이 맞는지 확인해주세요.</div>
      </div>
      <div className="pop-content-check">
        <div className="pop-title-check">{title}</div>
        <div className="pop-date-check">
          <div className="title">일정</div>
          <div>
            {selectedDate.toLocaleDateString("ko-KR")} {selectedTime}
          </div>
        </div>
        <div className="pop-people-check">
          <div className="title">인원</div>
          <div>{peopleCount}명</div>
        </div>
      </div>
      <div className="person-content-check">
        <div className="person-content-title">예약자 정보</div>
        <div className="person-name-check">
          <div className="title">예약자</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <img src={edit} />
        </div>
        <div className="person-number-check">
          <div className="title">연락처</div>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <img src={edit} />
        </div>
        <div className="person-email-check">
          <div className="title">이메일</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <img src={edit} />
        </div>
      </div>
      <div className="agree">
        <div className="agree-title">개인정보 수집, 제공 동의</div>
        <div className="agree-collect">
          <div>개인정보 수집 동의</div>
          <img src={nextButton} />
        </div>
        <div className="agree-offer">
          <div>개인정보 제공 동의</div>
          <img src={nextButton} />
        </div>
      </div>
      <div className="content-check-agree">
        예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공 규정을 확인하였으며
        이에 동의합니다.
      </div>
      <div className="reservation-fin">
        <button onClick={reservationFin}>예약하기</button>
      </div>
    </div>
  );
}

export default PopReservationCheck;
