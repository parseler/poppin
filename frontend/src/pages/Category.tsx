import "@css/Category.css";
import { useParams } from "react-router-dom";
import categories from "@utils/get-category-image";
import banners from "@utils/get-banner-image";
import PopupSmall from "@components/Home/PopupSmall";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);

  return (
    <div id="category">
      <div className="category-title">
        <img src={category?.image} alt={category?.text} />
        <h1>{category?.text}</h1>
      </div>
      {/* 카테고리별 팝업 목록 데이터 받아서 띄우기 */}
      <div className="category-contents">
        {banners.map((banner, index) => (
          <PopupSmall
          key={index}
          image={banner.image}
          text={banner.text}
          date={banner.date}
          />
        ))}
      </div>

      {/* 팝업 받으면 페이징 처리 하기 */}
      <div className="page"></div>
    </div>
  );
};

export default Category;
