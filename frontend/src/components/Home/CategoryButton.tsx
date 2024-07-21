import { Category } from "@utils/get-category-image";

const CategoryButton = ({ image, text }: Category) => {
  return (
    <div className="category-button">
      <div className="category-image">
        <img src={image} alt={text} />
      </div>
      <span className="category-text">{text}</span>
    </div>
  );
};

export default CategoryButton;
