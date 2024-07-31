import "@css/Rank.css";
import banners from "@utils/get-banner-image";
import PopMedium01 from "@components/Home/PopMedium01";

const Rank = () => {
  const repeat = Array.from(
    { length: 30 },
    (_, i) => banners[i % banners.length]
  );

  return (
    <div id="rank">
      <div className="rank-title">
        <h1>오늘 가장 인기있는 팝업</h1>
        <p>순위는 매일 오후 12시에 갱신됩니다.</p>
      </div>
      <div className="rank-contents">
        {repeat.map((banner, index) => (
          <PopMedium01
            key={index}
            rank={index + 1}
            change={index % 2 === 0 ? 1 : -1} // 임시 등락
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

export default Rank;
