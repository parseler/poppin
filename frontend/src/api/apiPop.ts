import axios from "axios";

export interface PopupDTO {
  id: number;
  name: string;
}

export interface PopupRequestDTO {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  hours: string;
  snsUrl?: string;
  pageUrl?: string;
  content: string;
  address: string;
  lat: number;
  lon: number;
  images: string[];
  managerTsid: number;
  preReservationOpenAt?: string;
  term?: number;
  maxPeoplePerSession?: number;
  maxReservationsPerPerson?: number;
  warning?: string;
}

const api = axios.create({
  baseURL: "http://localhost/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 팝업 등록
export const createPopup = async (data: {
  url: string;
  popupDto: PopupRequestDTO;
}) => {
  const response = await api.post(data.url, data.popupDto);
  return response.data;
};

// 팝업 조회
export const getPopupList = async () => {
  const response = await api.get("/popups");
  return response.data;
};
