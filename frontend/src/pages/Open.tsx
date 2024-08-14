import "@css/Open.css";
import PopMedium02 from "@components/Home/PopMedium02";
import { useEffect, useState } from "react";
import { getPopupByOpen, PopupProps } from "@api/home";
import { differenceInDays, parse, format } from "date-fns";

// ExtendedPopupProps 타입 정의
interface ExtendedPopupProps extends Omit<PopupProps, 'startDate' | 'endDate'> {
  startDate: Date;
  endDate: Date;
  daysDiff: number;
}

const Open = () => {
  const [openPopups, setOpenPopups] = useState<ExtendedPopupProps[]>([]);

  useEffect(() => {
    getPopupByOpen()
      .then((data) => {
        const today = new Date();
        const processedData = data.map((popup) => {
          // startDate와 endDate를 Date 객체로 변환
          const startDate = parse(popup.startDate, 'yyyy.MM.dd', new Date());
          const endDate = parse(popup.endDate, 'yyyy.MM.dd', new Date());
          const daysDiff = differenceInDays(startDate, today);
          
          return {
            ...popup,
            startDate,
            endDate,
            daysDiff,
          };
        }) as ExtendedPopupProps[];
        setOpenPopups(processedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            date={`${format(popup.startDate, 'yyyy.MM.dd')} - ${format(popup.endDate, 'yyyy.MM.dd')}`}
            daysDiff={popup.daysDiff} // 날짜 차이를 직접 전달
          />
        ))}
      </div>
      <div id="page"></div>
    </div>
  );
};

export default Open;
