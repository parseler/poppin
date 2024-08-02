import create from "zustand";

interface PopupState {
  storeName: string;
  storeDescription: string;
  selectedImages: string[];
  startDate: Date | null;
  endDate: Date | null;
  selectedDays: string[];
  timeSlots: { day: string; startTime: string; endTime: string }[];
  hours: string;
  address: string;
  detailedAddress: string;
  lat: number | null;
  lon: number | null;
  snsUrl?: string;
  pageUrl?: string;
  serviceCategories: { [key: string]: string };
  preReservationOpenAt: Date | null; // 추가된 필드
  term: number; // 추가된 필드
  maxPeoplePerSession: number; // 추가된 필드
  maxReservationsPerPerson: number; // 추가된 필드
  warning: string; // 추가된 필드
  categories: string[]; // 추가된 필드
  setStoreName: (name: string) => void;
  setStoreDescription: (description: string) => void;
  setSelectedImages: (images: string[]) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setAddress: (address: string) => void;
  setDetailedAddress: (address: string) => void;
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
  setPopupData: (data: Partial<PopupState>) => void;
  setServiceCategory: (category: string, value: string) => void;
  setSelectedDays: (days: string[]) => void;
  setTimeSlots: (
    slots: { day: string; startTime: string; endTime: string }[]
  ) => void;
  setHours: (hours: string) => void;
  setPreReservationOpenAt: (date: Date | null) => void; // 추가된 메서드
  setTerm: (term: number) => void; // 추가된 메서드
  setMaxPeoplePerSession: (maxPeople: number) => void; // 추가된 메서드
  setMaxReservationsPerPerson: (maxReservations: number) => void; // 추가된 메서드
  setWarning: (warning: string) => void; // 추가된 메서드
  setCategories: (categories: string[]) => void; // 추가된 메서드
}

const usePopupStore = create<PopupState>((set) => ({
  storeName: "",
  storeDescription: "",
  selectedImages: [],
  startDate: null,
  endDate: null,
  selectedDays: [],
  timeSlots: [],
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
  preReservationOpenAt: null, // 초기값 설정
  term: 0, // 초기값 설정
  maxPeoplePerSession: 0, // 초기값 설정
  maxReservationsPerPerson: 0, // 초기값 설정
  warning: "", // 초기값 설정
  categories: [], // 초기값 설정
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
  setPreReservationOpenAt: (date) => set(() => ({ preReservationOpenAt: date })), // 수정된 메서드
  setTerm: (term) => set(() => ({ term })), // 수정된 메서드
  setMaxPeoplePerSession: (maxPeople) => set(() => ({ maxPeoplePerSession: maxPeople })), // 수정된 메서드
  setMaxReservationsPerPerson: (maxReservations) => set(() => ({ maxReservationsPerPerson: maxReservations })), // 수정된 메서드
  setWarning: (warning) => set(() => ({ warning })), // 수정된 메서드
  setCategories: (categories) => set(() => ({ categories })), // 추가된 메서드
}));

export default usePopupStore;
