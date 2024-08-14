import { axiosInstance } from "./axiosInstance";

export interface PopupProps {
  popupId: number;
  name: string;
  startDate: string;
  endDate: string;
  content: string;
  heart: number;
  hit: number;
  rating: number;
  deleted: boolean;
  images: string[];
}

// 오픈 예정 팝업 조회
export const getPopupByOpen = async () => {
  const response = await axiosInstance.get<PopupProps[]>(`/popups/open`);
  return response.data;
}

// 최신 팝업 조회 (비로그인시 추천 팝업)
export const getPopupByNew = async () => {
  const response = await axiosInstance.get<PopupProps[]>(`/popups`);
  return response.data;
}

// 추천 팝업 조회
export const getPopupByRecommend = async () => {
  const response = await axiosInstance.get<PopupProps[]>(`/popups/recommendation`);
  return response.data;
}