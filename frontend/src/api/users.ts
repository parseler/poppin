import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

// 닉네임 중복 확인

// 유저 개인 프로필 조회
export const getUserData = async () => {
  try {
    const response = await axiosInstance.get("/api/users/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      return null; // 404 에러일 때 null 반환
    }
    throw error;
  }
};
