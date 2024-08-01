import "@css/Review.css";
import ReviewMedium from "@components/Review/ReviewMedium";
import CreateButton from "@components/CreateButton";
import banners from "@utils/get-banner-image";
import { Link } from "react-router-dom";

const ReviewList = () => {
  return (
    <div id="reviews">
      {/*  데이터 받아와서 수정해야 함 */}
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
      <Link to={`/review/write`}>
        <CreateButton onClick={()=>{}} />
      </Link>
    </div>
  );
};

export default ReviewList;
