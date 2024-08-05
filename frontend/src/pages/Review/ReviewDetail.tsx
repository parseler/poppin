import { getReviewData } from "@api/reviews";
import ReviewComment from "@components/Review/ReviewComment";
import "@css/Review.css";
import { ReviewProps } from "@interface/reviews";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewDetail = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<ReviewProps | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (reviewId) {
          const reviewData = await getReviewData(parseInt(reviewId));
          setReview(reviewData);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reviewId]);

  return (
    <div id="review-detail">
      {/* 리뷰 아이디마다 데이터 연결이 필요함 */}
      <div className="review-detail-title">
        <img
          src={review?.thumbnail}
          alt="리뷰 게시물 썸네일"
        />
        <div className="thumbnail-black"></div>
        <h1>{review?.title}</h1>
        <div className="review-writer">
          <div className="writer-image">
            <img
              src={review?.img}
              alt="작성자 프로필 사진"
            />
          </div>
          <div className="writer-info">
            <p className="writer-name">{review?.nickname}</p>
            <p className="writer-date">{review?.createdAt}</p>
          </div>
        </div>
      </div>
      <div className="review-detail-content">
        {review?.content}
      </div>
      <ReviewComment/>
    </div>
  );
};

export default ReviewDetail;
