import "@css/Open.css";
import banners from "@utils/get-banner-image";
import PopMedium02 from "@components/Home/PopMedium02";

const Open = () => {
  return (
    <div id="open">
      <div className="open-title">
        <h1>곧 오픈 예정인 팝업</h1>
        <p>오픈 예정인 팝업의 예약 일정을 확인하세요.</p>
      </div>
      <div className="open-contents">
        {banners.map((banner, index) => (
          <PopMedium02
            key={index}
            image={banner.image}
            text={banner.text}
            date={banner.date}
          />
        ))}
      </div>
      <div id="page">
        
      </div>
    </div>
  );
};

export default Open;
