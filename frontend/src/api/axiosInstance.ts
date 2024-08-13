import axios from "axios";
import Cookies from "js-cookie";
import { getTokenInfo } from "@utils/get-decoding";
import useAuthStore from "@store/useAuthStore";

const LOCAL_URL = "http://localhost/api";

const axiosInstance = axios.create({
  baseURL: LOCAL_URL,
  timeout: 3000,
  withCredentials: true, // CORS 요청에 자격 증명을 포함
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken, userTsid, userRole } = useAuthStore.getState();
    console.log("요청아이디: ", userTsid);
    console.log("요청역할: ", userRole);

    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }
    if (userTsid && userRole) {
      config.headers["userTsid"] = userTsid.toString();
      config.headers["role"] = userRole;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);

    // 리디렉션 URL이 포함된 응답 처리
    if (response.data && response.data.redirectUrl) {
      window.location.href = response.data.redirectUrl;
    }

    return response;
  },
  async (error) => {
    console.log("Error in response interceptor:", error);
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 쿠키에서 refreshToken 읽기
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          console.log("Sending token reissue request...");
          // 토큰 재발급 요청
          const responseAgain = await axios.post(
            `${LOCAL_URL}/auth/reissue`,
            { refreshToken },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const { accessToken: newAccessToken } = responseAgain.data;
          const tokenInfo = getTokenInfo(newAccessToken);

          // 전역 상태 업데이트
          useAuthStore.getState().setTokens(
            newAccessToken,
            tokenInfo.userTsid,
            tokenInfo.userRole,
          );

          // 요청에 새로운 토큰 설정
          originalRequest.headers["Authorization"] = `${newAccessToken}`;
          originalRequest.headers["userTsid"] = tokenInfo.userTsid;
          originalRequest.headers["role"] = tokenInfo.userRole;

          console.log("Resending original request with new access token...");
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Error during reissuing token:", err);
          return Promise.reject(err);
        }
      } else {
        // refreshToken이 쿠키에 없을 경우 처리
        console.error("No refresh token available in cookies");
        // 필요한 경우, 로그아웃 처리 또는 로그인 페이지로 리디렉션할 수 있습니다.
      }
    } else {
      console.error("Non-401 error occurred:", error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, getTokenInfo };