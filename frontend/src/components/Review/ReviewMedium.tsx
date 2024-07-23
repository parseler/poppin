interface ReveiwProps {
  image: string;
  title: string;
}

const ReviewMedium = ({image, title} : ReveiwProps) => {
  return (
    <div id="review-medium">
      <img src={image} alt={title} />
      <div className="review-gradiant"></div>
      <p className="review-title">{title}</p>
    </div>
  );
}

export default ReviewMedium;