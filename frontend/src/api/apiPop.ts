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

export const createPopup = async (data: { url: string; popupDto: PopupRequestDTO }) => {
  try {
    const response = await axios.post(data.url, data.popupDto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating popup:", error);
    throw error;
  }
};