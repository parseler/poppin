import { useEffect, useState } from "react";
import "@css/Map.css";

import openMarker from "@assets/map/openMarker.svg";
import upcomingMarker from "@assets/map/upcomingMarker.svg";
import likeMarker from "@assets/map/likeMarker.svg";
import reservationMarker from "@assets/map/reservationMarker.svg";
import currentLocation from "@assets/map/currentLocation.svg";
import image from "@assets/profile.svg";

const markerImages = {
  open: openMarker,
  upcoming: upcomingMarker,
  like: likeMarker,
  reservation: reservationMarker,
};

interface PopupStore {
  position: kakao.maps.LatLng;
  image: string;
  title: string;
  schedule: string;
  businessHours: string;
  markerType: "open" | "upcoming" | "like" | "reservation";
}

const popupStores: PopupStore[] = [
  {
    position: new kakao.maps.LatLng(37.543199503368335, 127.05694800077909),
    image: image,
    title: "팝업스토어 Addddddddddddddddddddddddddddd",
    schedule: "2024.07.10 - 2024.07.26",
    businessHours: "10:00 - 22:00",
    markerType: "open",
  },
  {
    position: new kakao.maps.LatLng(37.5432241605263, 127.05719696023701),
    image: image,
    title: "팝업스토어 B",
    schedule: "2024.08.01 - 2024.08.15",
    businessHours: "09:00 - 21:00",
    markerType: "upcoming",
  },
  {
    position: new kakao.maps.LatLng(37.54417374879818, 127.05447627667286),
    image: image,
    title: "팝업스토어 C",
    schedule: "2024.08.10 - 2024.08.20",
    businessHours: "11:00 - 23:00",
    markerType: "like",
  },
  {
    position: new kakao.maps.LatLng(37.543519985087194, 127.0556328140451),
    image: image,
    title: "팝업스토어 D",
    schedule: "2024.09.01 - 2024.09.10",
    businessHours: "10:00 - 20:00",
    markerType: "reservation",
  },
];

const Map = () => {
  const [activeButton, setActiveButton] = useState<string>("all");
  const [selectedStore, setSelectedStore] = useState<PopupStore | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=c306f7459b9ef7c16b36d8fea7076bb1&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (container) {
          const options = {
            center: new kakao.maps.LatLng(37.54460323028253, 127.0560692732618),
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);
          setMap(map);

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const locPosition = new kakao.maps.LatLng(lat, lon);

              map.setCenter(locPosition);

              const marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
              });

              marker.setMap(map);
            });
          }
        } else {
          console.error("Map container not found");
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => marker.setMap(null));

      const filteredMarkers = popupStores
        .filter(
          (store) => activeButton === "all" || store.markerType === activeButton
        )
        .map((store) => {
          const markerImage = new kakao.maps.MarkerImage(
            markerImages[store.markerType],
            new kakao.maps.Size(32, 32)
          );

          const marker = new kakao.maps.Marker({
            map: map,
            position: store.position,
            title: store.title,
            image: markerImage,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            setSelectedStore(store);
          });

          return marker;
        });

      setMarkers(filteredMarkers);
    }
  }, [map, activeButton, markers]);

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    setSelectedStore(null);
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);

        if (map) {
          map.setCenter(locPosition);
        }
      });
    }
  };

  const handleMapClick = () => {
    setSelectedStore(null);
  };

  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, "click", handleMapClick);
    }

    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, "click", handleMapClick);
      }
    };
  }, [map]);

  const isOpen = (store: PopupStore) => {
    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0];

    const [startDate, endDate] = store.schedule
      .split(" - ")
      .map((dateStr) => new Date(dateStr.replace(/\./g, "-")));
    const [openTime, closeTime] = store.businessHours.split(" - ");

    const isWithinDateRange = now >= startDate && now <= endDate;
    const isWithinTimeRange =
      currentTime >= openTime && currentTime <= closeTime;

    return isWithinDateRange && isWithinTimeRange;
  };

  return (
    <div id="mappage">
      <div className="title">내 주변 팝업</div>
      <div className="buttons">
        <button
          className={`button ${activeButton === "all" ? "active" : ""}`}
          onClick={() => handleButtonClick("all")}
        >
          전체
        </button>
        <button
          className={`button ${activeButton === "like" ? "active" : ""}`}
          onClick={() => handleButtonClick("like")}
        >
          좋아요
        </button>
        <button
          className={`button ${activeButton === "reservation" ? "active" : ""}`}
          onClick={() => handleButtonClick("reservation")}
        >
          내 예약
        </button>
      </div>
      <div id="map" className="map"></div>
      <div>
        <button
          className="current-location"
          onClick={handleCurrentLocationClick}
          style={{ bottom: selectedStore ? "130px" : "20px" }}
        >
          <img src={currentLocation} />
        </button>
        <div className="info">
          {selectedStore && (
            <div className="store-info">
              <img src={selectedStore.image} alt={selectedStore.title} />
              <div className="store-details">
                <h2>{selectedStore.title}</h2>
                <p>{selectedStore.schedule}</p>
                <p className={isOpen(selectedStore) ? "open" : "upcoming"}>
                  {isOpen(selectedStore) ? "영업중" : "오픈 예정"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
