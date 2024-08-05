import axiosInstance from "./axiosInstance";
import { UserData } from "@interface/users";


// 사용자 정보 조회
export const getUserData = async () => {
  const response = await axiosInstance.get("/api/users/me");
  return response.data;
};

// 사용자 정보 수정
export const updateUserData = async (userData: UserData) => {
  const response = await axiosInstance.put("/api/users/me", userData);
  return response.data;
}

// 닉네임 중복 확인
export const checkNickname = async (nickname: string) => {
  const response = await axiosInstance.get(`/api/users/${nickname}/check`);
  return response.status !== 404;
}

// 사용자 정보 탈퇴
export const deleteUserData = async () => {
  await axiosInstance.delete("/api/users/me");
}