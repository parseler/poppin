import "@css/Home.css";
import categories from "@utils/get-category-image";
import Banner from "@components/Home/Banner";
import banners from "@utils/get-banner-image";
import CategoryButton from "@components/Home/CategoryButton";

const Home = () => {
  return (
    <div id="home">
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
      <section id="best-section">

      </section>
      <section id="open-section">

      </section>
      <section id="recommend-section">
        
      </section>
    </div>
  );
};

export default Home;
