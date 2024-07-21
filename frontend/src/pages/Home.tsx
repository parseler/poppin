import "@css/Home.css";
import categories from "@utils/get-category-image";
import CategoryButton from "@components/Home/CategoryButton";

const Home = () => {
  return (
    <div id="home">
      <section id="banner-section"></section>
      <section id="category-section">
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            image={category.image}
            text={category.text}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
