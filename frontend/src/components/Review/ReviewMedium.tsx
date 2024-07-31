interface ReveiwProps {
  reviewId: number;
  image: string;
  title: string;
}

const ReviewMedium = ({reviewId, image, title} : ReveiwProps) => {
  return (
    <div id="review-medium" data-id={reviewId}>
      <img src={image} alt={title} />
      <div className="review-gradiant"></div>
      <p className="review-title">{title}</p>
    </div>
  );
}

export default ReviewMedium;