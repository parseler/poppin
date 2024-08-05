import axiosInstance from "./axiosInstance";

// 후기 목록 조회
export const getReviewListData = async () => {
  const response = await axiosInstance.get("/api/reviews");
  return response.data;
}

// 후기 상세 조회
export const getReviewData = async (reviewId: number) => {
  const response = await axiosInstance.get(`/api/reviews/${reviewId}`)
  return response.data;
}

// 후기 생성

// 후기 삭제

// 후기 수정