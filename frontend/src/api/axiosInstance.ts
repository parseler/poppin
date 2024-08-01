import axios from 'axios';

// const DEV_URL = "";
// const TEST_URL = "";
const LOCAL_URL = "http://70.12.247.215:8080/api/"; // 최다환 로컬

const axiosInstance = axios.create({
  baseURL: LOCAL_URL, 
  timeout: 1000,
})

export default axiosInstance;