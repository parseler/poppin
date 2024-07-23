import { useState } from "react";
import Calendar from "react-calendar";
import "@css/Pop/PopDetailReservation.css";
import "react-calendar/dist/Calendar.css";

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState(0);

  const times = ["9시", "10시", "11시", "12시", "14시", "15시"];
  const caution = `예약시간 10분 경과시, 자동 취소 됩니다.
  팝업 스토어 이용 시간은 30분입니다.
  스페셜 기프트는 선착순으로 증정됩니다.`;

  const onTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const onClickPlus = () => {
    setPeopleCount((prev) => prev + 1);
  };

  const onClickMinus = () => {
    setPeopleCount((prev) => (prev > 0 ? prev - 1 : 0));
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

  return (
    <div>
      <div className="calendar">
        <div className="content-title">
          예약 날짜
        </div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          calendarType="gregory"
          formatDay={(locale, date) => date.getDate().toString()}
          tileClassName={({ date, view }) =>
            view === "month" &&
            date.toDateString() === selectedDate.toDateString()
              ? "selected-date"
              : getTileClassName({ date, view })
          }
          prevLabel={<button>{'<'}</button>} // 이전 버튼 커스터마이징
          nextLabel={<button>{'>'}</button>} // 다음 버튼 커스터마이징
          prev2Label={<button>{'<<'}</button>}
          next2Label={<button>{'>>'}</button>}
          navigationLabel={({ label }) => (
            <div className="nav-label">{label}</div>
          )} // 네비게이션 라벨 커스터마이징
        />
      </div>
      <div className="res-time">
        <div className="content-title">예약 시간</div>
        <div className="time-buttons">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => onTimeClick(time)}
              className={selectedTime === time ? "selected-time" : ""}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="content-title">예약 인원</div>
        <div className="counter">
          <div className="people-counter">
            <button onClick={onClickMinus}>-</button>
            <span>{peopleCount}명</span>
            <button onClick={onClickPlus}>+</button>
          </div>
        </div>
      </div>
      <div>
        <div className="content-title">주의사항</div>
        <div className="caution">
          {caution.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="next">
        <button>다음 단계로 이동</button>
      </div>
    </div>
  );
};

export default Reservation;
