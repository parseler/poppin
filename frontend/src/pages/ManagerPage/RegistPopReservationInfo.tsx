import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@css/ManagerPage/RegistPopReservationInfo.css";

import thirdStep from "@assets/thirdStep.svg";

function RegistPopReservationInfo() {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeHour, setSelectedTimeHour] = useState<string>("");
  const [selectedTimeMinute, setSelectedTimeMinute] = useState<string>("");
  const [selectedOpenTimeHour, setSelectedOpenTimeHour] = useState<string>("");
  const [selectedOpenTimeMinute, setSelectedOpenTimeMinute] =
    useState<string>("");
  const [timeSlots, setTimeSlots] = useState<{ day: string; time: string }[]>(
    []
  );
  const [reservationOpenDate, setReservationOpenDate] = useState<Date | null>(
    null
  );
  const [intervalTime, setIntervalTime] = useState<string>("");
  const [isOnsiteChecked, setIsOnsiteChecked] = useState<boolean>(false);
  const [isAdvanceChecked, setIsAdvanceChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAddTimeSlot = () => {
    const time = `${selectedTimeHour}:${selectedTimeMinute}`;

    if (selectedDays.length > 0 && selectedTimeHour && selectedTimeMinute) {
      setTimeSlots([
        ...timeSlots,
        { day: selectedDays[selectedDays.length - 1], time },
      ]);
      setSelectedTimeHour("");
      setSelectedTimeMinute("");
    }
  };

  const renderCustomHeader = ({
    date,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="custom-header">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <span className="custom-header__date">
        {date.toLocaleString("ko", { month: "long" })}
      </span>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  );

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDays([...selectedDays, event.target.value]);
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => (
    <option key={i} value={i < 10 ? `0${i}` : i}>
      {i < 10 ? `0${i}` : i}
    </option>
  ));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => (
    <option key={i} value={i < 10 ? `0${i}` : i}>
      {i < 10 ? `0${i}` : i}
    </option>
  ));

  const goRegistFinish = () => {
    navigate("/regist-pop-fin");
  };

  return (
    <div id="regist-pop-reservation">
      <div className="regist-pop-reservation-title">팝업스토어 예약 정보</div>
      <div className="step-three">
        <img src={thirdStep} />
      </div>
      <div className="select-reservation-type">
        <div className="select-type-title">예약 유형(중복 선택 가능)</div>
        <div className="select-type">
          <div>
            <input
              type="checkbox"
              id="onsite"
              checked={isOnsiteChecked}
              onChange={(e) => setIsOnsiteChecked(e.target.checked)}
            />
            <label htmlFor="onsite">현장 예약</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="advance"
              checked={isAdvanceChecked}
              onChange={(e) => setIsAdvanceChecked(e.target.checked)}
            />
            <label htmlFor="advance">사전 예약</label>
          </div>
        </div>
      </div>
      {isOnsiteChecked && (
        <div className="setting-onsite-reservation">
          <div className="onsite-reservation-title">현장 예약 설정</div>
          <div className="onsite-reservation-content">
            <div className="onsite-reservation-schedule-title">
              현장 예약 일정
            </div>
            <div className="onsite-reservation-schedule">
              <div>요일</div>
              <select onChange={handleDayChange}>
                <option value="">-</option>
                <option value="월요일">월</option>
                <option value="화요일">화</option>
                <option value="수요일">수</option>
                <option value="목요일">목</option>
                <option value="금요일">금</option>
                <option value="토요일">토</option>
                <option value="일요일">일</option>
              </select>
              <div>시작 시간</div>
              <div className="time-input-group">
                <select
                  value={selectedTimeHour}
                  onChange={(e) => setSelectedTimeHour(e.target.value)}
                  className="time-picker"
                >
                  <option value="">--</option>
                  {hourOptions}
                </select>
                <span className="time-colon">:</span>
                <select
                  value={selectedTimeMinute}
                  onChange={(e) => setSelectedTimeMinute(e.target.value)}
                  className="time-picker"
                >
                  <option value="">--</option>
                  {minuteOptions}
                </select>
              </div>
              <button onClick={handleAddTimeSlot}>+</button>
            </div>
            <div className="added-time">
              {timeSlots.map((slot, index) => (
                <div key={index} className="added-time-detail">
                  {slot.day} {slot.time}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isAdvanceChecked && (
        <div className="setting-advance-reservation">
          <div className="advance-reservation-title">사전 예약 설정</div>
          <div className="advance-reservation-content">
            <div className="reservation-open-date">
              <div className="reservation-open-title">사전 예약 오픈일</div>
              <div className="select-open-date">
                <div className="date-term">
                  <DatePicker
                    className="open-date-input"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="연. 월. 일"
                    dateFormat="Y. M. d." // 날짜 형식 설정
                    locale="ko" // 로케일 설정
                    renderCustomHeader={renderCustomHeader} // 커스텀 헤더 설정
                  />
                </div>
                <div className="reservation-open-time-input">
                  <div className="time-input-group">
                    <select
                      value={selectedOpenTimeHour}
                      onChange={(e) => setSelectedOpenTimeHour(e.target.value)}
                      className="time-picker"
                    >
                      <option value="">--</option>
                      {hourOptions}
                    </select>
                    <span className="time-colon">:</span>
                    <select
                      value={selectedOpenTimeMinute}
                      onChange={(e) =>
                        setSelectedOpenTimeMinute(e.target.value)
                      }
                      className="time-picker"
                    >
                      <option value="">--</option>
                      {minuteOptions}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="time-term">
              <div>회차 간격</div>
              <div className="interval-input">
                <input
                  type="number"
                  value={intervalTime}
                  onChange={(e) => setIntervalTime(e.target.value)}
                />
                분 단위
              </div>
            </div>
            <div className="max-count">
              <div className="max-count-title">회차별 최대 인원</div>
              <div>
                <input type="number" />명
              </div>
            </div>
            <div className="max-reservation-per-person">
              <div>1인 최대 예약 가능 수</div>
              <div>
                <input type="number" />명
              </div>
            </div>
            <div className="caution">
              <div>예약시 주의사항</div>
              <textarea placeholder="추가적으로 안내할 사항을 입력하세요." />
            </div>
          </div>
        </div>
      )}
      <div className="regist-finish">
        <button onClick={goRegistFinish}>예약 등록 완료</button>
      </div>
    </div>
  );
}

export default RegistPopReservationInfo;
