import '@css/OnsiteReservationRegist.css';
import poppinWhite from "@assets/poppin_white.svg";
import { Link } from 'react-router-dom';

const OnsiteReservationRegist = () => {
  return (
    <div id="onsite-reservation-regist">
      {/* 팝업아이디, 이름, 폰넘버, 방문날짜, 예약상태아이디?가뭐임?, 몇명가는지, 대기번호 */}
      <div className='logo'>
        <img src={poppinWhite} />
      </div>

      <div className="content">
        <h3>현장 예약 정보 입력</h3>
        <div className="pop-title">베베 더 월드 팝업스토어 망그러진 곰돌곰돌 끼요오오오오오옷</div>

        <div className="content-input">
            <div className="reservation-name">
                <label htmlFor="">예약자명</label>
                <input type="text" placeholder="예약자명을 입력하세요" />
            </div>
            <div className="reservation-phone-number">
                <label htmlFor="">예약자 연락처</label>
                <input type="text" placeholder="예약자 연락처를 입력하세요" />
            </div>
            <div className="reservation-date">
                <label htmlFor="">방문 날짜</label>
                <input type="date" placeholder="방문 날짜를 입력하세요" />
            </div>
            <div className="reservation-member">
                <label htmlFor="">방문 인원</label>
                <input type="number" placeholder="방문 인원을 입력하세요" />
            </div>
        </div>

        <button>현장 예약 등록하기</button>
        <Link to='/mypage'>팝핀으로 이동하기</Link>
      </div>
    </div>
  );
};

export default OnsiteReservationRegist;
