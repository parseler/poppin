import axios from "axios";
import { getCookie } from "@utils/get-user-cookie";
import { logout } from "./auth";

// const DEV_URL = "";
// const TEST_URL = "";
const LOCAL_URL = "http://localhost/api";

const axiosInstance = axios.create({
  baseURL: LOCAL_URL,
  timeout: 3000,
  withCredentials: true, // CORS 요청에 자격 증명을 포함
});

// 토큰 만료 시간 확임
const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const refreshToken = getCookie("refresh");
    if (refreshToken && isTokenExpired(refreshToken)) {
      try {
        const response = await axiosInstance.post("/auth/reissue", {
          refreshToken,
        });
        const { accessToken } = response.data;

        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        console.error(error);
        logout();
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refresh");
      if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          const response = await axiosInstance.post("/auth/reissue", {
            refreshToken,
          });
          const { accessToken } = response.data;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (reissueError) {
          console.error("Failed to reissue access token", reissueError);
          logout();
          return Promise.reject(reissueError);
        }
      } else {
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
