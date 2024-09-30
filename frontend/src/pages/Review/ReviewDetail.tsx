import "@css/Review.css";
import { getReviewData } from "@api/reviews";
import ReviewComment from "@components/Review/ReviewComment";
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
          // Convert image URL strings to File objects
          const imgFile = await urlToFile(reviewData.img, "profile.jpg");
          const thumbnailFile = await urlToFile(reviewData.thumbnail, "thumbnail.jpg");

          setReview({
            ...reviewData,
            img: imgFile,
            thumbnail: thumbnailFile,
          });
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    })();
  }, [reviewId]);

  // Helper function to convert URL to File
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: data.type });
  };

  return (
    <div id="review-detail">
      <div className="review-detail-title">
        {review?.thumbnail && (
          <img
            src={URL.createObjectURL(review.thumbnail)}
            alt="리뷰 게시물 썸네일"
          />
        )}
        <div className="thumbnail-black"></div>
        <h1>{review?.title}</h1>
        <div className="review-writer">
          <div className="writer-image">
            {review?.img && (
              <img
                src={URL.createObjectURL(review.img)}
                alt="작성자 프로필 사진"
              />
            )}
          </div>
          <div className="writer-info">
            <p className="writer-name">{review?.nickname}</p>
            <p className="writer-date">{review?.createdAt}</p>
          </div>
        </div>
      </div>
      <div className="review-detail-content">
        <div dangerouslySetInnerHTML={{ __html: review?.content || "" }} />
      </div>
      <ReviewComment commentList={review?.commentDtoList || []} />
    </div>
  );
};

export default ReviewDetail;