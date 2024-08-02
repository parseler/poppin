import axiosInstance from "./axiosInstance";
import { UserData } from "@interface/users";


// 사용자 정보 조회
export const getUserData = async () => {
  try {
    const response = await axiosInstance.get("/api/users/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 정보 수정
export const updateUserData = async (userData: UserData) => {
  try {
    const response = await axiosInstance.put("/api/user/me", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 닉네임 중복 확인
export const checkNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.get(`/api/${nickname}/check`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}