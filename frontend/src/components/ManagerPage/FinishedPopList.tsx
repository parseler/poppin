import banners from "@utils/get-banner-image";
import { Link } from "react-router-dom";
import PopMedium03 from "@components/mypage/PopMedium03";

import nextButton from "@assets/mypage/nextButton.svg";
import none from "@assets/none.svg";

function FinishedPopList() {
  return (
    <div id="finished-pop-list">
      {banners.length > 0 ? (
        banners.map((banner, index) => (
          <Link to="/popdetail" key={index}>
            <PopMedium03
              image={banner.image}
              text={banner.text}
              date={banner.date}
            >
              <div className="go-detail-page">
                상세 페이지로 이동
                <img src={nextButton} />
              </div>
            </PopMedium03>
          </Link>
        ))
      ) : (
        <div className="none-registed-contents">
          <img src={none} />
          <p>아직 등록한 팝업이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default FinishedPopList;
