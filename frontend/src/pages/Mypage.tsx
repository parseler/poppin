import "@css/Mypage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { getUserData } from "api/users";
import axiosInstance from "api/axiosInstance";

import loginBefore from "@assets/mypage/loginBefore.svg";
import nextButton from "@assets/mypage/nextButton.svg";
import profileUpdate from "@assets/mypage/profileUpdateButton.svg";

interface User {
  nickname: string;
  email: string;
  phoneNumber: string;
  categoryList: string[];
  agreementDto: boolean;
  role: string;
  img: string;
}

const Mypage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);

  // 사용자 정보 유무 확인
  useEffect(() => {
    getUserData()
      .then((userData) => {
        if (userData) {
          setUser({
            nickname: userData.nickname,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            categoryList: userData.categoryList,
            agreementDto: userData.agreementDto,
            img: userData.img,
            role: userData.role,
          });
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 로그아웃
  const handleLogout = () => {
    axiosInstance.defaults.headers.common['Authorization'] = '';
    setUser(null);
  };

  // 모달창 열기 & 닫기
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
      {!user ? (
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
                <img src={user.img} alt="프로필 사진" />
              </div>
              <span className="mypage-nickname">{user.nickname}</span>님
              <Link to="/mypage/update" className="profile-update">
                <img src={profileUpdate} alt="프로필 수정 아이콘" />
              </Link>
            </div>
            <Link to="" className="logout" onClick={handleLogout}>
              로그아웃
            </Link>
          </div>
        </div>
      )}

      <div className="mypage-menu-section">
        <ul>
          {user?.role === "manager" ? (
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
          ) : user?.role === "admin" ? (
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
          {user?.role === "user" && (
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
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-overlay">
            <p className="withdraw-title">회원 탈퇴를 진행하시겠습니까?</p>
            <p className="withdraw-message">
              (작성한 후기와 댓글은 삭제되지 않습니다.)
            </p>
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
