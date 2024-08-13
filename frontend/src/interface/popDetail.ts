export interface PopupDetail {
  managerTsId: string;
  popupId: number;
  images: string[];
  name: string;
  startDate: string;
  endDate: string;
  hours: string;
  address: string;
  lat: number;
  lon: number;
  description: string;
  snsUrl: string;
  pageUrl: string;
  content: string;
  heart: number;
  hit: number;
  rating: number;
  deleted: boolean;
  checkPreReservation: boolean;
  preReservationOpenAt?: string;
  term?: number;
  maxPeoplePerSession?: number;
  maxReservationsPerPerson?: number;
  warning?: string;
}
