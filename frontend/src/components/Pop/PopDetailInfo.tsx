import locateIcon from '../../assets/locate.svg'

const Info = () => {
     return (
        <div>
            <div className="locate">
                <img src={locateIcon} alt="위치 아이콘" />
                위치
            </div>
            <div className="schedule">
                영업일정
            </div>
            <div className="homepage">
                홈페이지 링크
            </div>
            <div className="insta">
                인스타 링크
            </div>
            <div className="service">
                서비스 제공 정보
            </div>
            <div className="introduce">
                팝업 스토어 소개
            </div>
            <div className="map">
                팝업 스토어 위치
            </div>
            <div>
                유사한 팝업 스토어
            </div> 
        </div>
     );
} 

export default Info;