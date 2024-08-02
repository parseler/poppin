import axiosInstance from "./axiosInstance";

// 닉네임 중복 확인

// 유저 개인 프로필 조회
export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get("/api/users/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
