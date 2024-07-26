import { useNavigate } from "react-router-dom";
import "@css/ManagerPage/RegistPop2.css";

function RegistPop2() {
  const navigate = useNavigate();

  const goReservationRegist = () => {
    navigate("/");
  }
  
  const goReservationRegist = () => {
    navigate("/");
  }

  return (
    <div id="regist-pop2">
      <div className="omit-or-regist">
        <button>예약 건너뛰기</button>
        <button onClick={goReservationRegist}>예약 정보 등록</button>
      </div>
    </div>
  );
}

export default RegistPop2;
