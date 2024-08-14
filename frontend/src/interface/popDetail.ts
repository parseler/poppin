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
  content: string;
  snsUrl: string;
  pageUrl: string;
  description: string;
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
