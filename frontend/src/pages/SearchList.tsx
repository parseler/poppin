import "@css/Open.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PopupProps } from "@api/home";
import { search } from "@api/search";
import PopMedium03 from "@components/mypage/PopMedium03";

const SearchList = () => {
  const [searchPopups, setSearchPopips] = useState<PopupProps[]>([]);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    if (keyword) {
      search(keyword).then((data) => {
        setSearchPopips(data);
      }).catch((error) => {
        console.error(error);
      })
    }
  }, [keyword]);

  return (
    <div id="open">
      <div className="open-title">
        <h1>팝업 검색 결과</h1>
        <p>검색한 팝업의 상세 정보를 확인하세요.</p>
      </div>
      <div className="open-contents">
        {searchPopups.map((popup) => (
          <PopMedium03
          key={popup.popupId}
          image={popup.images[0]} // 첫 번째 이미지만 표시, 필요에 따라 수정 가능
          text={popup.name}
          date={`${popup.startDate} - ${popup.endDate}`}
          children={""}
          />
        ))}
      </div>
      <div id="page">
        
      </div>
    </div>
  );
};

export default SearchList;
