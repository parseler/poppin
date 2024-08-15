import "@css/Category.css";
import { Link, useParams } from "react-router-dom";
import categories from "@utils/get-category-image";
import PopupSmall from "@components/Home/PopupSmall";
import { useEffect, useState } from "react";
import { getPopupByCategory, PopupProps } from "@api/category";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const numericCategoryId = categoryId ? parseInt(categoryId, 10) : null;
  const category = numericCategoryId
    ? categories.find((c) => c.id === numericCategoryId)
    : null;

  const [popups, setPopups] = useState<PopupProps[]>([]);

  useEffect(() => {
    if (numericCategoryId) {
      getPopupByCategory(numericCategoryId)
        .then((data) => {
          console.log("Fetched data:", data);
          setPopups(data);
        })
        .catch((error) => {
          console.error("Error fetching popups:", error);
        });
    }
  }, [numericCategoryId]);

  return (
    <div id="category">
      <div className="category-title">
        <img src={category?.image} alt={category?.text} />
        <h1>{category?.text}</h1>
      </div>
      {/* 카테고리별 팝업 목록 데이터 받아서 띄우기 */}
      <div className="category-contents">
        {popups.map((popup) => (
          <Link to={"/popupdetail/${popup.popupId}"}>
            <PopupSmall
              key={popup.popupId}
              image={popup.images[0]} // 첫 번째 이미지만 표시, 필요에 따라 수정 가능
              text={popup.name}
              date={`${popup.startDate} - ${popup.endDate}`}
            />
          </Link>
        ))}
      </div>

      {/* 팝업 받으면 페이징 처리 하기 */}
      <div className="page"></div>
    </div>
  );
};

export default Category;
