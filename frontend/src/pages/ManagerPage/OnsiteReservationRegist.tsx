const OnsiteReservationRegist = () => {
  return (
    <div id="onsite-reservation-regist">
      {/* 팝업아이디, 이름, 폰넘버, 방문날짜, 예약상태아이디?가뭐임?, 몇명가는지, 대기번호 */}

      <div className="content">
        <h3>현장 예약 정보</h3>

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
      </div>
    </div>
  );
};

export default OnsiteReservationRegist;
