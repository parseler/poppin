import React, { useState } from "react";
import "@css/ManagerPage/RegistPop.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";

import registPhoto from "@assets/registPhoto.svg";

function RegistPop() {
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ day: string; startTime: string; endTime: string; }[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [address, setAddress] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(event.target.files)]);
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDays([...selectedDays, event.target.value]);
  };

  const handleAddressComplete = (data: any) => {
    setAddress(data.address);
    setShowAddressModal(false);
  };

  const handleCategoryClick = (category: string) => {
    let newCategories = [...selectedCategories];
    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((cat) => cat !== category);
    } else if (newCategories.length < 3) {
      newCategories.push(category);
    }
    setSelectedCategories(newCategories);
  };

  const handleAddTimeSlot = () => {
    if (selectedDays.length > 0 && selectedStartTime && selectedEndTime) {
      setTimeSlots([...timeSlots, { day: selectedDays[selectedDays.length - 1], startTime: selectedStartTime, endTime: selectedEndTime }]);
      setSelectedStartTime("");
      setSelectedEndTime("");
    }
  };

  return (
    <div id="regist-pop">
      <div className="essential-info-title">팝업스토어 필수 정보</div>
      <div>
        <label>팝업스토어 사진</label>
        <label htmlFor="store-images" className="regist-photo">
          <img src={registPhoto} />
          팝업스토어 사진을 등록하세요.(최대10장)
        </label>
        <input
          type="file"
          id="store-images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className="image-preview">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`popup-store-${index}`}
            />
          ))}
        </div>
      </div>
      <div className="regist-popup-name">
        <label>팝업스토어 이름</label>
        <input
          placeholder="팝업스토어 이름을 입력하세요."
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </div>
      <div>
        <label>팝업스토어 운영 일정</label>
        <div className="date-term">
          <DatePicker
            className="date-term-input"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="운영 시작일"
          />
          <div className="wave"> ~ </div>
          <DatePicker
            className="date-term-input"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="운영 종료일"
          />
        </div>
      </div>
      <div>
        <label>팝업스토어 운영 시간</label>
        <div className="inline">
          <select onChange={handleDayChange}>
            <option value="">요일 선택</option>
            <option value="월요일">월요일</option>
            <option value="화요일">화요일</option>
            <option value="수요일">수요일</option>
            <option value="목요일">목요일</option>
            <option value="금요일">금요일</option>
            <option value="토요일">토요일</option>
            <option value="일요일">일요일</option>
          </select>
          <input
            type="time"
            value={selectedStartTime}
            onChange={(e) => setSelectedStartTime(e.target.value)}
          />
          <input
            type="time"
            value={selectedEndTime}
            onChange={(e) => setSelectedEndTime(e.target.value)}
          />
          <button onClick={handleAddTimeSlot}>+</button>
        </div>
        <div className="added-time">
          {timeSlots.map((slot, index) => (
            <div key={index}  className="added-time-detail">
              {slot.day} - {slot.startTime} ~ {slot.endTime}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>주소 검색하기</label>
        <label
          className="address-search"
          onClick={() => setShowAddressModal(!showAddressModal)}
        >
          주소를 검색해주세요.
        </label>
        <div className={`address-modal ${showAddressModal ? "active" : ""}`}>
          <DaumPostcode onComplete={handleAddressComplete} />
        </div>
        <div className="added-address">{address}</div>
      </div>
      <div>
        <label>팝업스토어 소개 및 설명</label>
        <textarea
          placeholder="팝업스토어에 대한 소개 및 설명을 입력하세요"
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
        />
      </div>
      <div>
        <label>팝업스토어 카테고리 (최대 3개)</label>
        <div className="category-buttons">
          {[
            "뷰티",
            "패션",
            "음식/음료",
            "캐릭터",
            "리빙/금융",
            "연예",
            "게임",
            "가전/디지털",
            "콘텐츠",
            "취미/여가",
          ].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={
                selectedCategories.includes(category) ? "selected" : ""
              }
              disabled={
                selectedCategories.length >= 3 &&
                !selectedCategories.includes(category)
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="go-next">
        <button>다음 단계 진행</button>
      </div>
    </div>
  );
}

export default RegistPop;
