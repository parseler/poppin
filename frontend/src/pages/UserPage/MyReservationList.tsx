import OnsiteReservationList from "@components/mypage/OnsiteReservationList";
import PreReservationList from "@components/mypage/PreReservationList";
import VisitCompletionList from "@components/mypage/VisitCompleltionList";
import { useState } from "react";

const MyReservationList = () => {
  const [activeTab, setActiveTab] = useState<string | null>("pre");

  const onTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div id="my-reservation-list">
      <h1>내가 예약한 팝업</h1>
      <div className="reservation-tab">
        <div
          onClick={() => onTabClick("pre")}
          className={activeTab === "pre" ? "active" : ""}
        >
          사전예약
        </div>
        <div
          onClick={() => onTabClick("onsite")}
          className={activeTab === "onsite" ? "active" : ""}
        >
          현장예약
        </div>
        <div
          onClick={() => onTabClick("visit")}
          className={activeTab === "visit" ? "active" : ""}
        >
          방문완료
        </div>
      </div>
      <div className="reservation-content">
        {activeTab === "pre" && <PreReservationList />}
        {activeTab === "onsite" && <OnsiteReservationList />}
        {activeTab === "visit" && <VisitCompletionList />}
      </div>
    </div>
  );
}

export default MyReservationList;