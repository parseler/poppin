import { BannerProps } from "@utils/get-banner-image";
import { differenceInDays, parse } from "date-fns";

const PopMedium02 = ({image, text, date} : BannerProps) => {
  const today = new Date();
  const startDate = parse(date.split(' ')[0], 'yy.MM.dd', new Date());
  const daysDiff = differenceInDays(startDate, today);

  return (
    <div id="pop-up-medium">
      {/* 오픈 & 예약 일정 구별해야 함! */}
      <div className="pop-open">
        <h2>오픈</h2>
        <h2>{daysDiff > 0 ? `D-${daysDiff}` : '완료'}</h2>
      </div>
      <div className="medium-image">
        <img src={image} alt={text} />
      </div>
      <div className="medium-detail">
        <p className="medium-name">{text}</p>
        <p className="medium-date">{date}</p>
      </div>
    </div>
  );
}

export default PopMedium02;