import { removeCookie } from "@utils/get-user-cookie";
import axiosInstance from "./axiosInstance"

export const logout = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
  removeCookie('refresh');
  window.location.href = '/';
}