import { axiosInstance } from "./axiosInstance";

export interface ReservationRequestDTO {
  popupId: number;
  userTsid: string;
  date: string;
  time: string;
  peopleCount: number;
}

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

// 날짜별 사전 예약 정보 조회
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

// 사전 예약 생성
export interface PreReservationRequestDTO {
  userTsid: string;
  popupId: number;
  reservationDate: string;
  reservationTime: string;
  reservationCount: number;
  reservationStatementId?: number;
}

// 사전 예약 하기
export const createPreReservation = async (popupId: number, data: PreReservationRequestDTO) => {
  const response = await axiosInstance.post<PreReservationResponseDTO>(
    `/popups/${popupId}/pre-reservations`,
    data
  );
  return response.data;
};