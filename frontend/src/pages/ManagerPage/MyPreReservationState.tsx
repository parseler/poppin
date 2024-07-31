import React, { useState } from "react";
import Calendar from "react-calendar";
import "@css/ManagerPage/MyPreReservationState.css";
import search from "@assets/search.svg";

interface ReservationInfo {
  date: Date;
  name: string;
  phone: string;
  time: string;
}

const dummyData: ReservationInfo[] = [
  {
    date: new Date(2024, 6, 31),
    name: "김철수",
    phone: "010-1234-5678",
    time: "10:00",
  },
  {
    date: new Date(2024, 6, 31),
    name: "이영희",
    phone: "010-8765-4321",
    time: "11:00",
  },
  {
    date: new Date(2024, 6, 31),
    name: "박민수",
    phone: "010-5678-1234",
    time: "10:00",
  },
  {
    date: new Date(2024, 6, 31),
    name: "최지은",
    phone: "010-4321-8765",
    time: "12:00",
  },
  {
    date: new Date(2024, 7, 1),
    name: "최지은",
    phone: "010-4321-8765",
    time: "12:00",
  },
];

const times = ["10:00", "11:00", "12:00", "13:00", "14:00"];

function MyPreReservationState() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalData, setModalData] = useState<{
    name: string;
    date: Date;
    time: string;
  } | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxClick = (name: string, date: Date, time: string) => {
    setModalData({ name, date, time });
  };

  const handleModalConfirm = () => {
    if (modalData) {
      const key = `${modalData.name}-${modalData.date.toDateString()}-${
        modalData.time
      }`;
      setCheckedItems((prev) => ({ ...prev, [key]: true }));
      setModalData(null);
    }
  };

  const handleModalCancel = () => {
    setModalData(null);
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/-/g, "");
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDay();
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return "today";
      } else if (day === 0) {
        return "sunday";
      } else if (day === 6) {
        return "saturday";
      } else {
        return "";
      }
    }
    return "";
  };

  const filteredData = dummyData.filter((item) => {
    const isDateMatch =
      selectedDate && item.date.toDateString() === selectedDate.toDateString();
    const isTimeMatch = !selectedTime || item.time === selectedTime;
    const isSearchMatch =
      item.name.includes(searchTerm) ||
      formatPhone(item.phone).includes(searchTerm.replace(/-/g, ""));
    return isDateMatch && isTimeMatch && isSearchMatch;
  });

  return (
    <div id="my-pre-reservation-state">
      <div className="title">뉴진스 How Sweet 팝업스토어</div>
      <div className="reservation-calendar">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          calendarType="gregory"
          formatDay={(locale, date) => date.getDate().toString()}
          tileClassName={({ date, view }) =>
            view === "month" &&
            date.toDateString() ===
              (selectedDate && selectedDate.toDateString())
              ? "selected-date"
              : getTileClassName({ date, view })
          }
          prevLabel={<button>{"<"}</button>}
          nextLabel={<button>{">"}</button>}
          navigationLabel={({ label }) => (
            <div className="nav-label">{label}</div>
          )}
        />
      </div>
      <div className="search">
        <input
          placeholder="사용자 이름 혹은 연락처를 검색해주세요."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img src={search} alt="검색" />
      </div>
      <div className="list">
        <div className="list-title">
          <div className="name">이름</div>
          <div className="number">연락처</div>
          <div className="time">
            <select onChange={handleTimeChange} value={selectedTime || ""}>
              <option value="">시간</option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="is-enter">입장여부</div>
        </div>
        {filteredData.map((item, index) => {
          const key = `${item.name}-${item.date.toDateString()}-${item.time}`;
          return (
            <div key={index} className="list-content">
              <div className="name">{item.name}</div>
              <div className="number">{item.phone}</div>
              <div className="time">{item.time}</div>
              <div className="is-enter">
                <input
                  type="checkbox"
                  checked={checkedItems[key] || false}
                  onChange={() =>
                    handleCheckboxClick(item.name, item.date, item.time)
                  }
                  disabled={checkedItems[key] || false} // 체크 후 상태 변경 불가
                />
              </div>
            </div>
          );
        })}
      </div>
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalData.name}님을 입장 처리 하시겠습니까?</p>
            <div>(처리 이후에는 수정이 불가능합니다.)</div>
            <div className="buttons">
              <button className="cancel" onClick={handleModalCancel}>
                취소
              </button>
              <button className="ok" onClick={handleModalConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPreReservationState;
