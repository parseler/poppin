import { axiosInstance } from "./axiosInstance";

export interface PreReservationResponseDTO {
  preReservationId: number;
  userTsid: string;
  popupId: number;
  reservationDate: string;
  reservationTime: string;
  reservationCount: number;
  createdAt: string;
  reservationStatementId: number;
}

// 날짜별 사전 예약자 정보 조회
export const getPreReservations = async (popupId: number, reservationDate: string) => {
  const response = await axiosInstance.get<PreReservationResponseDTO[]>(
    `/popups/${popupId}/pre-reservations`,
    {
      params: {
        reservationDate: reservationDate,
      },
    }
  );
  return response.data;
};