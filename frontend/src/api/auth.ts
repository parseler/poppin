import { getCookie, setCookie } from "@utils/get-user-cookie";
import axiosInstance from "./axiosInstance"

export const loginWithKakao = async (code: string) => {
  const response = await axiosInstance.post('/auth/kakao', { code });
  setCookie('refresh', response.data.refresh_token);
  return response.data;
}

export const logintWithNaver = async (code: string) => {
  const response = await axiosInstance.post('/auth/naver', { code });
  setCookie('refresh', response.data.refresh_token);
  return response.data;
}

export const refreshToken = async () => {
  const refresh_token = getCookie('refresh');
  const response = await axiosInstance.post('/auth/refresh-token', { refresh_token });
  setCookie('Authorization', response.data.access_token);
  return response.data;
}