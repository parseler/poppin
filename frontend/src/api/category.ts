import { axiosInstance } from "./axiosInstance";

// 카테고리별 팝업 조회
export const getPopupByCategory = async (category: string) => {
  const response = await axiosInstance.get<PopupProps[]>(`/category/${category}`);
  return response.data;
}