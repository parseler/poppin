import create from "zustand";

interface PopupState {
  storeName: string;
  storeDescription: string;
  selectedImages: string[];
  startDate: string | null;
  endDate: string | null;
  selectedDays: string[];
  timeSlots: { [key: string]: string };
  hours: string;
  address: string;
  detailedAddress: string;
  lat: number | null;
  lon: number | null;
  snsUrl?: string;
  pageUrl?: string;
  serviceCategories: { [key: string]: string };
  preReservationOpenAt: Date | null;
  term: number;
  maxPeoplePerSession: number;
  maxReservationsPerPerson: number;
  warning: string;
  categories: string[];
  setStoreName: (name: string) => void;
  setStoreDescription: (description: string) => void;
  setSelectedImages: (images: string[]) => void;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  setAddress: (address: string) => void;
  setDetailedAddress: (address: string) => void;
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
  setPopupData: (data: Partial<PopupState>) => void;
  setServiceCategory: (category: string, value: string) => void;
  setSelectedDays: (days: string[]) => void;
  setTimeSlots: (slots: { [key: string]: string }) => void;
  setHours: (hours: string) => void;
  setPreReservationOpenAt: (date: Date | null) => void;
  setTerm: (term: number) => void;
  setMaxPeoplePerSession: (maxPeople: number) => void;
  setMaxReservationsPerPerson: (maxReservations: number) => void;
  setWarning: (warning: string) => void;
  setCategories: (categories: string[]) => void;
}

const usePopupStore = create<PopupState>((set) => ({
  storeName: "",
  storeDescription: "",
  selectedImages: [],
  startDate: null,
  endDate: null,
  selectedDays: [],
  timeSlots: {},
  hours: "",
  address: "",
  detailedAddress: "",
  lat: null,
  lon: null,
  snsUrl: "",
  pageUrl: "",
  serviceCategories: {
    parking: "",
    fee: "",
    pet: "",
    food: "",
    photo: "",
    age: "",
  },
  preReservationOpenAt: null,
  term: 0,
  maxPeoplePerSession: 0,
  maxReservationsPerPerson: 0,
  warning: "",
  categories: [],
  setStoreName: (name) => set(() => ({ storeName: name })),
  setStoreDescription: (description) =>
    set(() => ({ storeDescription: description })),
  setStartDate: (date) => set(() => ({ startDate: date })),
  setEndDate: (date) => set(() => ({ endDate: date })),
  setAddress: (address) => set(() => ({ address: address })),
  setDetailedAddress: (address) => set(() => ({ detailedAddress: address })),
  setLat: (lat) => set(() => ({ lat: lat })),
  setLon: (lon) => set(() => ({ lon: lon })),
  setPopupData: (data) => set((state) => ({ ...state, ...data })),
  setServiceCategory: (category, value) =>
    set((state) => ({
      serviceCategories: {
        ...state.serviceCategories,
        [category]: state.serviceCategories[category] === value ? "" : value,
      },
    })),
  setSelectedDays: (days) => set(() => ({ selectedDays: days })),
  setTimeSlots: (slots) => set(() => ({ timeSlots: slots })),
  setSelectedImages: (images) => set(() => ({ selectedImages: images })),
  setHours: (hours) => set(() => ({ hours })),
  setPreReservationOpenAt: (date) => set(() => ({ preReservationOpenAt: date })),
  setTerm: (term) => set(() => ({ term })),
  setMaxPeoplePerSession: (maxPeople) => set(() => ({ maxPeoplePerSession: maxPeople })),
  setMaxReservationsPerPerson: (maxReservations) => set(() => ({ maxReservationsPerPerson: maxReservations })),
  setWarning: (warning) => set(() => ({ warning })),
  setCategories: (categories) => set(() => ({ categories })),
}));

export default usePopupStore;
