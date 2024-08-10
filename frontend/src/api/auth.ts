
import { axiosInstance } from "./axiosInstance"

export const logout = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
  window.location.href = '/';
}