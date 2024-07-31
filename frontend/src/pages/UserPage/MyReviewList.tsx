import { Link } from "react-router-dom";
import ReviewMedium from "@components/Review/ReviewMedium";
import banners from "@utils/get-banner-image";

const MyReviewList = () => {
  return (
    <div id="my-review-list">
      <h1>내가 작성한 팝업 후기</h1>
      <div className="review-content">
        {banners.map((banner, index) => (
          <Link key={index} to={`/review/${index}`}>
            <ReviewMedium
              reviewId={index}
              image={banner.image}
              title={banner.text}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyReviewList;
