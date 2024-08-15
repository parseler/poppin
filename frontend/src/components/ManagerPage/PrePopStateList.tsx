import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPreReservations } from "@api/reservation";
import { getMyPopups } from "@api/apiPop"; // 매니저의 팝업 스토어 목록을 가져오는 API
import useAuthStore from "@store/useAuthStore"; // managerTsid를 가져오기 위해 zustand 스토어 사용

import nextButton from "@assets/mypage/nextButton.svg";
import none from "@assets/none.svg";

const PrePopStateList = () => {
  const { userTsid: managerTsid } = useAuthStore(); // zustand에서 managerTsid 가져오기
  const [preReservations, setPreReservations] = useState([]);
  const [myPopups, setMyPopups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!managerTsid) return;

      try {
        const reservations = await getPreReservations(managerTsid); // 사전예약 정보 가져오기
        setPreReservations(reservations);

        const popups = await getMyPopups(managerTsid); // 매니저의 팝업 스토어 정보 가져오기
        setMyPopups(popups);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [managerTsid]);

  return (
    <div id="pre-pop-list">
      {preReservations.length > 0 && myPopups.length > 0 ? (
        preReservations.map((reservation, index) => {
          const popup = myPopups.find(popup => popup.popupId === reservation.popupId);

          return (
            popup && (
              <Link to={`/mypage/pre-reservation-management/${popup.popupId}`} key={index}>
                <PopMedium03
                  image={popup.image} // 팝업 이미지
                  text={popup.name} // 팝업 이름
                  date={reservation.reservationDate} // 예약 날짜
                >
                  <div className="go-detail-page">
                    상세 페이지로 이동
                    <img src={nextButton} />
                  </div>
                </PopMedium03>
              </Link>
            )
          );
        })
      ) : (
        <div className="none-registed-contents">
          <img src={none} />
          <p>아직 등록한 사전예약이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default PrePopStateList;
