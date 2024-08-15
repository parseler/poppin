import { axiosInstance } from "./axiosInstance";

interface PushProps {
  title: string;
  body: string;
  scheduledTime: number; // 유닉스 타임스탬프 형식의 예약된 시간
}

// 푸쉬 토큰 처리
export const sendTokenToServer = async (
  token: string,
  username: string
): Promise<void> => {
  try {
    const response = await axiosInstance.post("/notice/save-token", {token,username});
    if (response.status === 200) {
      console.log("Token sent to server successfully");
    }
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

// 푸쉬 요청
export const sendPush = async (push: PushProps) => {
  try {
    const response = await axiosInstance.post("/notice/advertisement", push);
    return response.data;
    if (response.status === 200) {
      console.log("Token sent to server successfully");
    }
  } catch (error) {
  console.error(error);
  }
}
