import "@css/Home.css";
import { Link } from "react-router-dom";
import categories from "@utils/get-category-image";
import Banner from "@components/Home/Banner";
import banners from "@utils/get-banner-image";
import CategoryButton from "@components/Home/CategoryButton";
import PopupBig from "@components/Home/PopupBig";
import PopupSmall from "@components/Home/PopupSmall";

const Home = () => {
  return (
    <div id="home">
      {/* 후순위 */}
      <section id="banner-section">
        <Banner banners={banners} />
      </section>

      <section id="category-section">
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            id={category.id}
            image={category.image}
            text={category.text}
          />
        ))}
      </section>

      {/* 데이터 받아와서 수정해야 함 */}
      <section id="best-section">
        <div className="best-title">
          <h1>오늘 가장 인기있는 팝업</h1>
          <Link to={`/rank`}>더보기</Link>
        </div>
        <div className="best-content">
          {banners.map((banner, index) => (
            <PopupBig
              key={index}
              image={banner.image}
              text={banner.text}
              date={banner.date}
            />
          ))}
        </div>
      </section>

      {/* 데이터 받아와서 수정해야 함 */}
      <section id="open-section">
        <div className="open-title">
          <h1>곧 오픈 예정인 팝업</h1>
          <Link to={`/open`}>더보기</Link>
        </div>
        <div className="open-content">
          {banners.map((banner, index) => (
            <PopupBig
              key={index}
              image={banner.image}
              text={banner.text}
              date={banner.date}
            />
          ))}
        </div>
      </section>
      <section id="recommend-section">
        {/* 비로그인이면 담당자 픽 & 로그인이면 닉네임 추천 픽 */}
        <h1>담당자 픽 추천 팝업</h1>
        <div className="recommend-content">
          {banners.map((banner, index) => (
            <PopupSmall
              key={index}
              image={banner.image}
              text={banner.text}
              date={banner.date}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
