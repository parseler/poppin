import { useNavigate } from "react-router-dom";
import "@css/Waiting.css";

import poppinWhite from "@assets/poppin_white.svg";
import image1 from "@assets/image1.svg";

function Waiting() {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

  return (
    <div id="waiting">
      <img src={poppinWhite} />

      <div className="content">
        <div className="pop-image">
          <img src={image1} />
        </div>
        <div className="pop-title">베베 더 월드 팝업스토어</div>
        <div className="turn-title">현재 나의 순서</div>
        <div className="turn-info">
          <div className="turn">67</div>
          <div>번째</div>
        </div>
        <div className="person-info">
          <div className="person-name">
            <div className="person-name-title">예약자 명</div>
            <div className="person-name-info">name</div>
          </div>
          <div className="person-number">
            <div className="person-number-title">연락처</div>
            <div className="person-number-info">number</div>
          </div>
          <div className="person-count">
            <div className="person-count-title">예약인원</div>
            <div className="person-count-info">count</div>
          </div>
        </div>
        <button onClick={onClickHome}>
          더 많은 팝업 스토어를 보고 싶다면?
        </button>
      </div>
    </div>
  );
}

export default Waiting;
