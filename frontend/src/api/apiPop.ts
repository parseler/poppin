import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/popups";

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
  lat: number;
  lon: number;
  images: string[];
  preReservationOpenAt: string;
  term: number;
  maxPeoplePerSession: number;
  maxReservationsPerPerson: number;
  warning: string;
}

export const createPopup = async (popupDto: PopupRequestDTO) => {
  try {
    const formData = new FormData();
    formData.append("name", popupDto.name);
    formData.append("description", popupDto.description);
    formData.append("startDate", popupDto.startDate);
    formData.append("endDate", popupDto.endDate);
    formData.append("hours", popupDto.hours);
    if (popupDto.snsUrl) formData.append("snsUrl", popupDto.snsUrl);
    if (popupDto.pageUrl) formData.append("pageUrl", popupDto.pageUrl);
    formData.append("content", popupDto.content);
    formData.append("lat", popupDto.lat.toString());
    formData.append("lon", popupDto.lon.toString());
    popupDto.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("preReservationOpenAt", popupDto.preReservationOpenAt);
    formData.append("term", popupDto.term.toString());
    formData.append("maxPeoplePerSession", popupDto.maxPeoplePerSession.toString());
    formData.append("maxReservationsPerPerson", popupDto.maxReservationsPerPerson.toString());
    formData.append("warning", popupDto.warning);

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating popup:", error);
    throw error;
  }
};
