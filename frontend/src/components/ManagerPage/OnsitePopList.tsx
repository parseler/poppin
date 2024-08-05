import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPopupList } from "@api/apiPop";

import nextButton from "@assets/mypage/nextButton.svg";
import none from "@assets/none.svg";

interface Popup {
  images: string[];
  name: string;
  startDate: string;
  endDate: string;
  managerTsid: number;
}

function OnsitePopList() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const managerTsid = 1;

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await getPopupList();
        const currentDateTime = new Date();
        const onsitePopups = response.filter((popup: Popup) => {
          const startDate = new Date(popup.startDate);
          const endDate = new Date(popup.endDate);
          return (
            popup.managerTsid === managerTsid &&
            startDate <= currentDateTime &&
            currentDateTime <= endDate
          );
        });
        setPopups(onsitePopups);
      } catch (error) {
        console.error("Error fetching popups:", error);
      }
    };
    fetchPopups();
  }, []);

  return (
    <div id="onsite-registed-list">
      {popups.length > 0 ? (
        popups.map((popup, index) => (
          <Link to="/popdetail" key={index} className="popup-card">
            <div className="popup-image">
              <img src={popup.images[0]} alt={popup.name} />
            </div>
            <div className="popup-details">
              <p className="popup-name">{popup.name}</p>
              <p className="popup-date">{`${popup.startDate} ~ ${popup.endDate}`}</p>
              <div className="go-detail-page">
                상세 페이지로 이동
                <img src={nextButton} />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="none-registed-contents">
          <img src={none} />
          <p>아직 등록한 팝업이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default OnsitePopList;
