import { useState, useEffect } from "react";
import "@css/Pop/PopDetailInfo.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import locateIcon from "../../assets/locate.svg";
import clock from "@assets/clock.svg";
import scheduleOpen from "@assets/scheduleOpen.svg";
import scheduleClose from "@assets/scheduleClose.svg";
import homepageIcon from "@assets/homepageIcon.svg";
import insta from "@assets/insta.svg";
import parkingIcon from "@assets/popService/parkingIcon.svg";
import feeIcon from "@assets/popService/feeIcon.svg";
import petIcon from "@assets/popService/petIcon.svg";
import foodIcon from "@assets/popService/parkingIcon.svg";
import photoIcon from "@assets/popService/parkingIcon.svg";
import ageLimitIcon from "@assets/popService/parkingIcon.svg";
import noParkingIcon from "@assets/popService/parkingIcon.svg";
import noFeeIcon from "@assets/popService/parkingIcon.svg";
import noPetIcon from "@assets/popService/parkingIcon.svg";
import noFoodIcon from "@assets/popService/parkingIcon.svg";
import noPhotoIcon from "@assets/popService/noPhotoIcon.svg";
import noAgeLimitIcon from "@assets/popService/parkingIcon.svg";

type Category = "parking" | "fee" | "pet" | "food" | "photo" | "ageLimit";

interface InfoProps {
  isEditing: boolean;
  location: string;
  hours: string;
  website: string;
  instagram: string;
  content: string;
  description: string;
  lat: number;
  lon: number;
  onLocationChange: (location: string) => void;
  onHoursChange: (hours: string) => void;
  onWebsiteChange: (website: string) => void;
  onInstagramChange: (instagram: string) => void;
  onContentChange: (content: string) => void;
  onDescriptionChange: (description: string) => void;
  onSave: () => void;
}

const serviceIcons: Record<Category, { true: string; false: string }> = {
  parking: { true: parkingIcon, false: noParkingIcon },
  fee: { true: feeIcon, false: noFeeIcon },
  pet: { true: petIcon, false: noPetIcon },
  food: { true: foodIcon, false: noFoodIcon },
  photo: { true: photoIcon, false: noPhotoIcon },
  ageLimit: { true: ageLimitIcon, false: noAgeLimitIcon },
};

const Info: React.FC<InfoProps> = ({
  isEditing,
  location,
  hours,
  website,
  instagram,
  content,
  description,
  lat,
  lon,
  onLocationChange,
  onWebsiteChange,
  onInstagramChange,
  onContentChange,
  onDescriptionChange,
}) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [parsedHours, setParsedHours] = useState<Record<string, string>>({});
  const [parsedContent, setParsedContent] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    try {
      const now = new Date();
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
      const currentDayName = dayNames[now.getDay()];
      setCurrentDay(currentDayName);

      if (hours) {
        const hoursObj = JSON.parse(hours);
        setParsedHours(hoursObj);

        const businessHours = hoursObj[currentDayName]?.split("~");
        if (businessHours && businessHours.length === 2) {
          const openTime = new Date();
          const closeTime = new Date();

          openTime.setHours(
            parseInt(businessHours[0].split(":")[0]),
            parseInt(businessHours[0].split(":")[1])
          );
          closeTime.setHours(
            parseInt(businessHours[1].split(":")[0]),
            parseInt(businessHours[1].split(":")[1])
          );

          if (now >= openTime && now <= closeTime) {
            setIsBusinessOpen(true);
          } else {
            setIsBusinessOpen(false);
          }
        }
      }
    } catch (error) {
      console.error("Error parsing hours:", error);
    }
  }, [hours]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=c306f7459b9ef7c16b36d8fea7076bb1&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          const mapOption = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 3,
          };
          const map = new kakao.maps.Map(mapContainer, mapOption);

          const markerPosition = new kakao.maps.LatLng(lat, lon);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        } else {
          console.error("Map container element not found");
        }
      });
    };
  }, [lat, lon]);

  useEffect(() => {
    try {
      if (content) {
        const parseContent = (content: string) => {
          const pairs = content.slice(1, -1).split(",");
          const result: Record<string, string> = {};
          pairs.forEach((pair) => {
            const [key, value] = pair.split(":");
            if (key && value) {
              result[key.trim().replace(/"/g, "")] = value
                .trim()
                .replace(/"/g, "");
            }
          });
          return result;
        };

        setParsedContent(parseContent(content));
      }
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }, [content]);

  const isChecked = (value: string, checkValue: string[]): boolean => {
    return checkValue.includes(value);
  };

  const toggleSchedule = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <div id="pop-detail-info">
      <div className="locate">
        <img src={locateIcon} alt="위치 아이콘" />
        {isEditing ? (
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="edit-input"
          />
        ) : (
          location
        )}
      </div>
      <div className="schedule">
        <div className="schedule-isToggleOpen">
          <img src={clock} />
          {isBusinessOpen ? "영업 중" : "영업 종료"}
          <button onClick={toggleSchedule}>
            {isToggleOpen ? (
              <img src={scheduleClose} />
            ) : (
              <img src={scheduleOpen} />
            )}
          </button>
        </div>
        {isToggleOpen ? (
          <div className="schedule-detail">
            {Object.entries(parsedHours).map(([day, time]) => (
              <div
                key={day}
                className={day === currentDay ? "current-day" : ""}
              >
                {day}: {time}
              </div>
            ))}
          </div>
        ) : (
          <div className="schedule-detail">
            {currentDay}: {parsedHours[currentDay]}
          </div>
        )}
      </div>
      <div className="homepage">
        <img src={homepageIcon} />
        {isEditing ? (
          <input
            type="text"
            value={website}
            onChange={(e) => onWebsiteChange(e.target.value)}
            className="edit-input"
          />
        ) : (
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        )}
      </div>
      <div className="insta">
        <img src={insta} />
        {isEditing ? (
          <input
            type="text"
            value={instagram}
            onChange={(e) => onInstagramChange(e.target.value)}
            className="edit-input"
          />
        ) : (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            {instagram}
          </a>
        )}
      </div>
      <div className="service">
        <div className="service-icons">
          {Object.entries(parsedContent).map(
            ([key, value]) =>
              value && ( // 값이 존재하는 항목만 표시
                <div key={key} className="service-icon">
                  <img
                    src={
                      serviceIcons[key as Category][
                        isChecked(value, ["가능", "무료", "없음"]) ? "true" : "false"
                      ]
                    }
                  />
                  {value}
                  {isEditing && (
                    <input
                      type="checkbox"
                      checked={isChecked(value, ["가능", "무료", "없음"])}
                      onChange={(e) =>
                        onContentChange(
                          JSON.stringify({
                            ...parsedContent,
                            [key]: e.target.checked ? "가능" : "불가능",
                          })
                        )
                      }
                      className="edit-checkbox"
                    />
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <div className="introduce">
        <div className="introduce-title">팝업 스토어 소개</div>
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="edit-textarea"
          />
        ) : (
          description.split("\n").map((line, index) => (
            <p key={index} className="introduce-content">
              {line.trim() === "" ? <br /> : line}
            </p>
          ))
        )}
      </div>
      <div className="map-location">
        <div className="map-title">팝업 스토어 위치</div>
        <div
          id="map"
          style={{ width: "100%", height: "250px", marginBottom: "30px" }}
        ></div>
      </div>
    </div>
  );
};

export default Info;
