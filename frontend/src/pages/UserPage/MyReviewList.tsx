import { Link } from "react-router-dom";
import ReviewMedium from "@components/Review/ReviewMedium";
import { ReviewProps } from "@interface/reviews";
import { getMyReviews } from "@api/mypage";
import { useEffect, useState } from "react";

const MyReviewList = () => {
  const [writeReviews, setWriteReviews] = useState<ReviewProps[]>([]);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: string }>({});

  // 파일 객체를 URL로 변환하는 함수
  const convertFileToURL = (file: File): string => {
    return URL.createObjectURL(file);
  };

  // 리뷰 데이터를 불러오는 함수
  useEffect(() => {
    const fetchWriteReviews = async () => {
      try {
        const data = await getMyReviews();
        // 데이터의 타입을 ReviewProps[]로 맞추기
        const formattedData: ReviewProps[] = data.map((item: any) => ({
          reviewId: item.reviewId,
          thumbnail: item.thumbnail, // 초기 상태에서는 파일 객체를 저장
          nickname: item.nickname,
          img: item.img,
          rating: item.rating,
          title: item.title,
          content: item.content,
          createdAt: item.createdAt,
          commentDtoList: item.commentDtoList,
        }));

        // 파일 객체를 URL로 변환하여 상태에 저장
        const thumbnailUrls: { [key: number]: string } = {};
        formattedData.forEach((review) => {
          if (review.thumbnail instanceof File) {
            thumbnailUrls[review.reviewId] = convertFileToURL(review.thumbnail);
          }
        });

        setWriteReviews(formattedData);
        setThumbnails(thumbnailUrls);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchWriteReviews();

    // 컴포넌트 언마운트 시 URL 객체 해제
    return () => {
      Object.values(thumbnails).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [thumbnails]);

  return (
    <div id="my-review-list">
      <h1>내가 작성한 팝업 후기</h1>
      <div className="review-content">
        {writeReviews.map((review) => (
          <Link key={review.reviewId} to={`/review/${review.reviewId}`}>
            <ReviewMedium
              reviewId={review.reviewId}
              thumbnail={thumbnails[review.reviewId] || ''} // URL을 전달
              title={review.title}
              rating={review.rating}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyReviewList;
