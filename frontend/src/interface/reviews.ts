export interface ReviewListProps {
  reviewId: number;
  rating: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

export interface ReviewProps {
  reviewId: number;
  rating: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  nickname: string; // 작성자 정보
  img: string; // 작성자 정본
  commentDtoList: string; // 댓글 인터페이스 추가되면 수정
}