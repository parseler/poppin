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
  images: File[];
  managerTsid: number;
  preReservationOpenAt?: string;
  term?: number;
  maxPeoplePerSession?: number;
  maxReservationsPerPerson?: number;
  warning?: string;
}

const api = axios.create({
  baseURL: "http://localhost/api",
});

// `PopupRequestDTO`를 `FormData`로 변환하는 함수
const toFormData = (popupDto: PopupRequestDTO): FormData => {
  const formData = new FormData();
  formData.append("name", popupDto.name);
  formData.append("description", popupDto.description);
  formData.append("startDate", popupDto.startDate);
  formData.append("endDate", popupDto.endDate);
  formData.append("hours", popupDto.hours);
  formData.append("snsUrl", popupDto.snsUrl || "");
  formData.append("pageUrl", popupDto.pageUrl || "");
  formData.append("content", popupDto.content);
  formData.append("address", popupDto.address);
  formData.append("lat", String(popupDto.lat));
  formData.append("lon", String(popupDto.lon));
  formData.append("managerTsid", String(popupDto.managerTsid));
  if (popupDto.preReservationOpenAt) {
    formData.append("preReservationOpenAt", popupDto.preReservationOpenAt);
  }
  if (popupDto.term) {
    formData.append("term", String(popupDto.term));
  }
  if (popupDto.maxPeoplePerSession) {
    formData.append(
      "maxPeoplePerSession",
      String(popupDto.maxPeoplePerSession)
    );
  }
  if (popupDto.maxReservationsPerPerson) {
    formData.append(
      "maxReservationsPerPerson",
      String(popupDto.maxReservationsPerPerson)
    );
  }
  if (popupDto.warning) {
    formData.append("warning", popupDto.warning);
  }

  popupDto.images.forEach((image) => {
    formData.append("images", image);
  });

  return formData;
};

// 팝업 등록
export const createPopup = async (data: {
  url: string;
  popupDto: PopupRequestDTO;
}) => {
  const formData = toFormData(data.popupDto);
  const response = await api.post(data.url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 팝업 전체 조회
export const getPopupList = async () => {
  const response = await api.get("/popups");
  return response.data;
};

// 팝업 상세 조회
export const getPopupDetail = async (popupId: number) => {
  const response = await api.get(`/popups/${popupId}`);
  console.log(response.data);
  return response.data;
};
