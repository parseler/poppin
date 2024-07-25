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
import photoIcon from "@assets/popService/feeIcon.svg";
import ageLimitIcon from "@assets/popService/petIcon.svg";
import noParkingIcon from "@assets/popService/parkingIcon.svg";
import noFeeIcon from "@assets/popService/feeIcon.svg";
import noPetIcon from "@assets/popService/petIcon.svg";
import noFoodIcon from "@assets/popService/parkingIcon.svg";
import noPhotoIcon from "@assets/popService/noPhotoIcon.svg";
import noAgeLimitIcon from "@assets/popService/petIcon.svg";
import image1 from "@assets/image1.svg";
import image2 from "@assets/sponge2.jpg";
import image3 from "@assets/sponge.jpg";

const scheduleData: { [key: string]: string } = {
  일: "10:00~18:00",
  월: "11:00~18:00",
  화: "10:00~18:00",
  수: "10:00~18:00",
  목: "10:00~18:00",
  금: "10:00~18:00",
  토: "10:00~18:00",
};

const homepageLink: { [key: string]: string } = {
  link: "https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp",
};

const instaLink: { [key: string]: string } = {
  link: "https://www.instagram.com/bebe_the_ori/",
};

const service: { [key: string]: any } = {
  parking: true,
  fee: true,
  pet: true,
  food: undefined,
  photo: false,
  ageLimit: undefined,
};

const serviceIcons = {
  parking: { true: parkingIcon, false: noParkingIcon },
  fee: { true: feeIcon, false: noFeeIcon },
  pet: { true: petIcon, false: noPetIcon },
  food: { true: foodIcon, false: noFoodIcon },
  photo: { true: photoIcon, false: noPhotoIcon },
  ageLimit: { true: ageLimitIcon, false: noAgeLimitIcon },
};

const introduceContent = `
베베와 멜롱이가 라인프렌즈 스퀘어에 두둥등장💫🔥!!

🌏Bebe the World 팝업
🗓️2024.7.5 - 2024.7.18 KST
📍라인프렌즈 스퀘어 성수

🎁베베 더 월드 팝업 Special Gifts

-베베 더 오리 스티커 1개 증정
*베베 더 월드 팝업 스토어 방문 고객 전원

-베레모 베베 부채 1개 증정
*베베 더 오리 상품 1만원 이상 구매 시

-베베 더 오리 리유저블백 1개 증정
*베베 더 오리 상품 7만원 이상 구매 시

*한정 수량 선착순 증정, 소진 시 별도 고지없이 종료
`;

const relatedPopups = [
  {
    image: image1,
    text: "팝업 스토어 1",
    date: "2024.7.5 - 2024.7.18",
  },
  {
    image: image2,
    text: "팝업 스토어 2",
    date: "2024.7.19 - 2024.8.1",
  },
  {
    image: image3,
    text: "팝업 스토어 3",
    date: "2024.8.2 - 2024.8.15",
  },
];

const Info = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [introduce, setIntroduce] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDayName = dayNames[now.getDay()];
    setCurrentDay(currentDayName);

    const businessHours = scheduleData[currentDayName].split("~");
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
    setIntroduce(introduceContent.split("\n"));
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=c306f7459b9ef7c16b36d8fea7076bb1&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new kakao.maps.LatLng(37.544579, 127.055831), // 팝업스토어 위치 좌표
          level: 3, // 확대 수준
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new kakao.maps.LatLng(37.544579, 127.055831);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  }, []);

  const toggleSchedule = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <div id="pop-detail-info">
      <div className="locate">
        <img src={locateIcon} alt="위치 아이콘" />
        서울특별시 성동구 성수이로 77 라인프렌즈 스퀘어 성수
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
        {isToggleOpen && (
          <div className="schedule-detail">
            {Object.entries(scheduleData).map(([day, time]) => (
              <div
                key={day}
                style={{
                  fontWeight: currentDay === day ? "bold" : "normal",
                }}
              >
                {day}:{time}
              </div>
            ))}
          </div>
        )}
        {!isToggleOpen && (
          <div className="schedule-detail">
            {currentDay}: {scheduleData[currentDay]}
          </div>
        )}
      </div>
      <div className="homepage">
        <img src={homepageIcon} />
        <a
          href={homepageLink ? homepageLink.link : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {homepageLink ? homepageLink.link : "-"}
        </a>
      </div>
      <div className="insta">
        <img src={insta} />
        <a
          href={instaLink ? instaLink.link : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {instaLink ? instaLink.link : "-"}
        </a>
      </div>
      <div className="service">
        <div className="service-icons">
          {Object.entries(service).map(
            ([key, value]) =>
              value !== undefined && (
                <div key={key} className="service-icon">
                  <img src={serviceIcons[key][value]} />
                  {value ? "가능" : "불가능"}
                </div>
              )
          )}
        </div>
      </div>
      <div className="introduce">
        <div className="introduce-title">팝업 스토어 소개</div>
        {introduce.map((line, index) => (
          <p key={index} className="introduce-content">
            {line.trim() === "" ? <br /> : line}
          </p>
        ))}
      </div>
      <div className="map-location">
        <div className="map-title">팝업 스토어 위치</div>
        <div
          id="map"
          style={{ width: "100%", height: "250px", marginBottom: "30px" }}
        ></div>
      </div>
        <div className="rel-pop-title">유사한 팝업 스토어</div>
      <div className="related-popups">
        {relatedPopups.map((popup, index) => (
          <div key={index} className="popup-item">
            <img
              src={popup.image}
              alt={`팝업 스토어 ${index + 1}`}
              style={{ width: "200px", height: "200px" }}
            />
            <div className="rel-pop-info">
              <p>{popup.text}</p>
              <p>{popup.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
