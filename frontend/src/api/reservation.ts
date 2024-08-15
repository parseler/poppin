import { axiosInstance } from "./axiosInstance";

export interface ReservationRequestDTO {
  popupId: number;
  userTsid: string;
  date: string;
  time: string;
  peopleCount: number;
}

export const createReservation = async (data: ReservationRequestDTO) => {
  const response = await axiosInstance.post("/reservations", data);
  return response.data;
};

export const getPreReservations = async (managerTsid: string) => {
  const response = await axiosInstance.get(`/managers/${managerTsid}/pre-reservations`);
  return response.data;
};