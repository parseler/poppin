import "@css/Home.css";
import categories from "@utils/get-category-image";
import Banner from "@components/Home/Banner";
import banners from "@utils/get-banner-image";
import CategoryButton from "@components/Home/CategoryButton";
import PopupBig from "@components/Home/PopupBig";

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
            image={category.image}
            text={category.text}
          />
        ))}
      </section>

      {/* 데이터 받아와서 수정해야 함 */}
      <section id="best-section">
        <div className="best-title">
          <h1>오늘 가장 인기있는 팝업</h1>
          <a>더보기</a>
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
          <a>더보기</a>
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
      <section id="recommend-section"></section>
    </div>
  );
};

export default Home;
