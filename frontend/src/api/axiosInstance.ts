import axios from 'axios';
import { getCookie } from '@utils/get-user-cookie';

// const DEV_URL = "";
// const TEST_URL = "";
const LOCAL_URL = "http://70.12.247.215:8080";

const axiosInstance = axios.create({
  baseURL: LOCAL_URL, 
  timeout: 1000,
  withCredentials: true, // CORS 요청에 자격 증명을 포함
})

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('Authorization');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})

export default axiosInstance;