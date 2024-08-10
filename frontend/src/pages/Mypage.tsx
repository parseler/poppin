import "@css/Mypage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { getUserData } from "@api/users";
import { axiosInstance } from "@api/axiosInstance";
import { UserProps } from "@interface/users";
import Cookies from "js-cookie";

import profile from "@assets/user/profile.png";
import loginBefore from "@assets/mypage/loginBefore.svg";
import nextButton from "@assets/mypage/nextButton.svg";
import profileUpdate from "@assets/mypage/profileUpdateButton.svg";
import useAuthStore from "@store/useAuthStore";

const Mypage: React.FC = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { accessToken, userTsid, userRole } = useAuthStore();

  // 사용자 정보 유무 확인
  useEffect(() => {
    if (accessToken) {
      getUserData()
        .then((data) => {
          console.log(data);
          if (data) {
            setUser({
              userTsid: userTsid !== null ? Number(userTsid) : 0,
              nickname: data.nickname ?? "",
              email: data.email ?? "",
              phoneNumber: data.phoneNumber ?? "",
              categoryList: data.userCategories
                ? data.userCategories.map((cate: any) => cate.category.name)
                : [],
              agreementDto: {
                marketing_consent: data.userConsents?.marketingConsent ?? false,
                marketing_updated_at:
                  data.userConsents?.marketing_updated_at ?? "",
                service_push_consent:
                  data.userConsents?.servicePushConsent ?? false,
                service_updated_at: data.userConsents?.service_updated_at ?? "",
              },
              img: data.img ?? "",
              role: userRole ?? "", // userRole이 null인 경우 빈 문자열로 설정
            });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    } else {
      setUser(null);
    }
  }, [accessToken, userTsid, userRole, setUser]);

  // 로그아웃
  const handleLogout = () => {
    try {
      useAuthStore.getState().clearTokens(); // 상태에서 토큰 및 사용자 정보 초기화
      Cookies.remove("refresh"); // 만약 refreshToken이 쿠키에 저장되어 있는 경우 삭제
      // axiosInstance의 Authorization 헤더 초기화
      delete axiosInstance.defaults.headers.common["Authorization"];
      delete axiosInstance.defaults.headers.common["userTsid"];
      delete axiosInstance.defaults.headers.common["role"];
      // 사용자 상태 초기화
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자 탈퇴
  const deleteUserData = async () => {
    try {
      await deleteUserData();
    } catch (error) {
      console.error(error);
    }
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
                {user.img === null ||
                user.img === undefined ||
                user.img === "IMG_URL" ? (
                  <img src={profile} alt="프로필 사진" />
                ) : (
                  <img src={user.img} alt="프로필 사진" />
                )}
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
              <button onClick={deleteUserData}>탈퇴</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Mypage;
