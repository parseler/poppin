import { BannerProps } from "@utils/get-banner-image";

interface PopMediumProps extends BannerProps {
  rank: number;
  change: number;
}

const PopMedium = ({image, text, date, rank, change} : PopMediumProps) => {
  const formatRank = rank < 10 ? `0${rank}` : rank;
  const changeGrade = change > 0 ? `▲ ${change}` : change < 0 ? `▼ ${Math.abs(change)}` : '-';
  const changeColor = change > 0 ? '#D4145A' : change < 0 ? '#FBB03B' : 'black';

  return (
    <div id="pop-up-medium">
      <div className="pop-rank">
        <h1>{formatRank}</h1>
        <span style={{color: changeColor}}>{changeGrade}</span>
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

export default PopMedium;