import "@css/Open.css";
import PopMedium02 from "@components/Home/PopMedium02";
import { useEffect, useState } from "react";
import { getPopupByOpen, PopupProps } from "@api/home";

const Open = () => {
  const [openPopups, setOpenPopups] = useState<PopupProps[]>([]);

  useEffect(() => {
    getPopupByOpen().then((data) => {
      setOpenPopups(data);
    }).catch((error) => {
      console.error(error);
    })
  })

  return (
    <div id="open">
      <div className="open-title">
        <h1>곧 오픈 예정인 팝업</h1>
        <p>오픈 예정인 팝업의 예약 일정을 확인하세요.</p>
      </div>
      <div className="open-contents">
        {openPopups.map((popup) => (
          <PopMedium02
          key={popup.popupId}
          image={popup.images[0]} // 첫 번째 이미지만 표시, 필요에 따라 수정 가능
          text={popup.name}
          date={`${popup.startDate} - ${popup.endDate}`}
          />
        ))}
      </div>
      <div id="page">
        
      </div>
    </div>
  );
};

export default Open;
