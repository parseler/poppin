import "@css/Pop/PopReservationFin.css";

import finishCheck from "@assets/finishCheck.svg";

function ReservationFin() {
  return (
    <div id="pop-reservation-finish">
      <img src={finishCheck} />
      <div className="finish-ment">팝업스토어 예약이 확정되었습니다.</div>
      <div className="check-ment">
        마이페이지에서 예약 내역을 확인하실 수 있습니다.
      </div>
      <div className="reservation-fin">
        <button>예약 확인하기</button>
      </div>
    </div>
  );
}

export default ReservationFin;
