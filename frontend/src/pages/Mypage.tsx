import "@css/Mypage.css";
import { Link } from "react-router-dom";

import { useState } from "react";
import { Box, Modal } from "@mui/material";
import loginBefore from "@assets/mypage/loginBefore.svg";
import nextButton from "@assets/mypage/nextButton.svg";
import profileUpdate from "@assets/mypage/profileUpdateButton.svg";

// 임시 사용자 데이터
const user = {
  isLoggedIn: true, // 로그인 여부
  role: 'manager', // 'user', 'manager', 'admin'
  nickname: '터지는 커비', // 유저 닉네임
  profileImage: 'https://i.pinimg.com/564x/ac/53/e9/ac53e9b1cbb1069713a4b8b78986b5cd.jpg', // 유저 프로필 이미지
};

const Mypage: React.FC = () => {
  const { isLoggedIn, role, nickname, profileImage } = user;
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div id="my-page">
      {!isLoggedIn ? (
        <div className="login-section">
          {/* 로그인 전 */}
          <Link to="/login">
            <img
              src={loginBefore}
              className="login-before"
              alt="로그인 전 아이콘"
            />
            <span>로그인 해주세요</span>
            <img src={nextButton} alt="다음 버튼" />
          </Link>
        </div>
      ) : (
        <div className="login-section">
          {/* 로그인 후 */}
          <div className="login-wrap">
            <div className="mypage-profile">
              <div className="mypage-profile-image">
                <img src={profileImage} alt="프로필 사진" />
              </div>
              <span className="mypage-nickname">{nickname}</span>님
              <Link to="/mypage/update" className="profile-update">
                <img src={profileUpdate} alt="프로필 수정 아이콘" />
              </Link>
            </div>
            <Link to="" className="logout">
              로그아웃
            </Link>
          </div>
        </div>
      )}

      <div className="mypage-menu-section">
        <ul>
          {role === "manager" ? (
            <>
              <li>
                <Link to="/regist-pop">
                  <p>팝업 등록</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="/mypage/my-popups">
                  <p>내가 등록한 팝업</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="/mypage/reservation-management">
                  <p>예약자 현황 관리</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
            </>
          ) : role === "admin" ? (
            <>
              <li>
                <Link to="/admin/manage-code">
                  <p>매니저 코드 관리</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <p>배너 관리</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="/admin/notification">
                  <p>알림 관리</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <p>신고 관리</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/mypage/review">
                  <p>내가 작성한 팝업 후기</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="/mypage/like">
                  <p>내가 좋아요한 팝업</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="/mypage/reservation">
                  <p>내가 예약한 팝업</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
              <li>
                <Link to="/mypage/cancel">
                  <p>예약이 취소된 팝업</p>
                  <img src={nextButton} alt="다음 버튼" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="notice-section">
        <ul>
          <li>
            <Link to="">
              <p>공지사항</p>
              <img src={nextButton} alt="다음 버튼" />
            </Link>
          </li>
          <li>
            <Link to="">
              <p>FAQ</p>
              <img src={nextButton} alt="다음 버튼" />
            </Link>
          </li>
          {role === "user" && (
            <li>
              <Link to="" onClick={openModal}>
                <p>회원 탈퇴</p>
                <img src={nextButton} alt="다음 버튼" />
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="etc-section">
        <span>개인정보처리방침</span>
        <span> | </span>
        <span>서비스이용약관</span>
        <span> | </span>
        <span>v.1.0.0</span>
      </div>

      {/* 회원탈퇴 모달창 */}
      <Modal open={isModal} onClose={closeModal}>
          <Box
            id="user-withdrawal-modal-box"
            onClick={(e) => e.stopPropagation()}>
            <div className="modal-overlay">
              <p className="withdraw-title">회원 탈퇴를 진행하시겠습니까?</p>
              <p className="withdraw-message">(작성한 후기와 댓글은 삭제되지 않습니다.)</p>
              <div className="buttons">
                <button onClick={closeModal}>취소</button>
                <button>탈퇴</button>
              </div>
            </div>
          </Box>
        </Modal>
    </div>
  );
};

export default Mypage;
