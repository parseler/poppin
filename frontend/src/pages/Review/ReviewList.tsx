import "@css/Review.css";
import ReviewMedium from "@components/Review/ReviewMedium";
import CreateButton from "@components/CreateButton";
import banners from "@utils/get-banner-image";

const Review = () => {
  return (
    <div id="reviews">
      {/*  데이터 받아와서 수정해야 함 */}
      <div className="review-content">
        {banners.map((banner, index) => (
          <ReviewMedium
            key={index}
            image={banner.image}
            title={banner.text}
          />
        ))}
      </div>
      <CreateButton />
    </div>
  );
};

export default Review;
