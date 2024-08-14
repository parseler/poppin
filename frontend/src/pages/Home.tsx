import "@css/Home.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import categories from "@utils/get-category-image";
import banners from "@utils/get-banner-image";
import Banner from "@components/Home/Banner";
import CategoryButton from "@components/Home/CategoryButton";
import PopupBig from "@components/Home/PopupBig";
import PopupSmall from "@components/Home/PopupSmall";
import { getUserData } from "@api/users";
import { getTokenInfo } from "@api/axiosInstance";
import useAuthStore from "@store/useAuthStore";
import { getPopupByOpen, getPopupByRecommend } from "@api/home";
import { PopupProps } from "@api/category";

const Home = () => {
  const { accessToken, userTsid, userRole } = useAuthStore();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  const [openPopups, setOpenPopups] = useState<PopupProps[]>([]);
  const [recommendPopups, setRecommendPopups] = useState<PopupProps[]>([]);

  useEffect(() => {
    if (accessToken) {
      const tokenInfo = getTokenInfo(accessToken);

      if (tokenInfo.userTsid && tokenInfo.userRole) {
        getUserData()
          .then((data) => {
            if (data && data.nickname) {
              setNickname(data.nickname);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
          });
      }
    }

    // 인기 데이터

    // // 오픈 예정 데이터
    getPopupByOpen()
      .then((data) => {
        setOpenPopups(data);
      })
      .catch((error) => {
        console.error(error);
      });

    // 추천 데이터
    getPopupByRecommend()
      .then((data) => {
        setRecommendPopups(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken, userTsid, userRole]);

  const goPopDetail = () => {
    navigate("/popdetail");
  };

  return (
    <div id="home">
      {/* 후순위 */}
      <section id="banner-section">
        <Banner banners={banners} />
      </section>

      <section id="category-section">
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            id={category.id}
            image={category.image}
            text={category.text}
          />
        ))}
      </section>

      {/* 데이터 받아와서 수정해야 함 */}
      <section id="best-section">
        <div className="best-title">
          <h1>오늘 가장 인기있는 팝업</h1>
          <Link to={`/rank`}>더보기</Link>
        </div>
        <div className="best-content">
          {banners.map((banner, index) => (
            <div key={index} onClick={index === 0 ? goPopDetail : undefined}>
              <PopupBig
                key={index}
                image={banner.image}
                text={banner.text}
                date={banner.date}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 데이터 받아와서 수정해야 함 */}
      <section id="open-section">
        <div className="open-title">
          <h1>곧 오픈 예정인 팝업</h1>
          <Link to={`/open`}>더보기</Link>
        </div>
        <div className="open-content">
          {openPopups.map((popup) => (
            <PopupBig
              key={popup.popupId}
              image={popup.images[0]} // 첫 번째 이미지만 표시, 필요에 따라 수정 가능
              text={popup.name}
              date={`${popup.startDate} - ${popup.endDate}`}
            />
          ))}
        </div>
      </section>
      <section id="recommend-section">
        {/* 비로그인이면 담당자 픽 & 로그인이면 닉네임 추천 픽 */}
        <h1>
          {nickname ? `${nickname}님을 위한 추천 팝업` : "담당자 픽 추천 팝업"}
        </h1>
        <div className="recommend-content">
          {recommendPopups.map((popup) => (
            <PopupSmall
              key={popup.popupId}
              image={popup.images[0]} // 첫 번째 이미지만 표시, 필요에 따라 수정 가능
              text={popup.name}
              date={`${popup.startDate} - ${popup.endDate}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
