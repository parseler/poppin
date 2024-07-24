import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "@css/Calendar.css";
import "react-calendar/dist/Calendar.css";

import image1 from "@assets/image1.svg";

interface PopupEvent {
  startDate: Date;
  endDate: Date;
  title: string;
  content: string;
  image: string;
}

const popupEvents: PopupEvent[] = [
  {
    startDate: new Date(2024, 6, 10),
    endDate: new Date(2024, 6, 12),
    title: "팝업스토어 A",
    content: "내용 A",
    image: image1,
  },
  {
    startDate: new Date(2024, 6, 24),
    endDate: new Date(2024, 6, 31),
    title: "팝업스토어 B",
    content: "내용 B",
    image: image1,
  },
  {
    startDate: new Date(2024, 6, 12),
    endDate: new Date(2024, 6, 31),
    title: "팝업스토어 C",
    content: "내용 C",
    image: image1,
  },
  {
    startDate: new Date(2024, 6, 31),
    endDate: new Date(2024, 6, 31),
    title: "팝업스토어 D",
    content: "내용 D",
    image: image1,
  },
  {
    startDate: new Date(2024, 6, 31),
    endDate: new Date(2024, 6, 31),
    title: "팝업스토어 E",
    content: "내용 E",
    image: image1,
  },
];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    setCurrentMonth(`${month}월`);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  const getTileClassName = ({ date, view }) => {
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
    const day = date.getDate();
    return `${year}. ${month}. ${day}.`;
  };

  const formatDateWithDay = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("ko-KR", options);
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month" && !selectedDate) {
      const startEvents = popupEvents.filter(
        (event) => date.toDateString() === event.startDate.toDateString()
      );
      const endEvents = popupEvents.filter(
        (event) => date.toDateString() === event.endDate.toDateString()
      );

      return (
        <div className="event-tiles">
          {startEvents.map((event, index) => (
            <div key={`start-${index}`} className="event-tile">
              <span className="event-dot"></span>
              <span className="event-title">{event.title.slice(0, 5)}</span>
            </div>
          ))}
          {endEvents.map((event, index) => (
            <div key={`end-${index}`} className="event-tile">
              <span className="event-dot end-date"></span>
              <span className="event-title">{event.title.slice(0, 5)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderPopupInfo = () => {
    if (selectedDate) {
      const events = popupEvents.filter(
        (event) =>
          selectedDate >= event.startDate && selectedDate <= event.endDate
      );

      return (
        <div>
          <div className="selected-date-info">
            {formatDateWithDay(selectedDate)}
          </div>
          {events.length > 0 ? (
            <div className="popup-info">
              {events.map((event, index) => (
                <div key={index} className="popup-info-item">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="popup-info-image"
                  />
                  <div className="popup-info-text">
                    <div className="popup-info-text-title">{event.title}</div>
                    <p className="popup-info-text-date">{`${formatDate(
                      event.startDate
                    )} ~ ${formatDate(event.endDate)}`}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="popup-info-text-none">
              선택한 날짜에는 팝업스토어 정보가 없어요.
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="calendar" className={selectedDate ? "small" : ""}>
      <div className="calendarpage-content-title">
        {currentMonth}의 팝업 일정
      </div>
      <div className="calendarpage-content">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate || new Date()}
          calendarType="gregory"
          formatDay={(locale, date) => date.getDate().toString()}
          tileClassName={({ date, view }) =>
            view === "month" &&
            date.toDateString() ===
              (selectedDate && selectedDate.toDateString())
              ? "selected-date"
              : getTileClassName({ date, view })
          }
          tileContent={renderTileContent}
          prevLabel={<button>{"<"}</button>}
          nextLabel={<button>{">"}</button>}
          prev2Label={<button>{"<<"}</button>}
          next2Label={<button>{">>"}</button>}
          navigationLabel={({ label }) => (
            <div className="nav-label">{label}</div>
          )}
        />
      </div>
      {selectedDate && (
        <div className="back-to-calendar">
          <button onClick={handleBackToCalendar}>▼</button>
          {renderPopupInfo()}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
