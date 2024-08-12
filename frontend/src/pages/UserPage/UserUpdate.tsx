import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProps } from "@interface/users";
import { checkNickname, getUserData, updateUserData } from "@api/users";
import Header from "@components/common/Header";
import Menu from "@components/common/Menu";
import useAuthStore from "@store/useAuthStore";

const UserUpdate: React.FC = () => {
  const [user, setUser] = useState<UserProps>({
    userTsid: "",
    nickname: "",
    email: "",
    phoneNumber: "",
    userCategories: [],
    userConsents: {
      marketingConsent: false,
      marketingUpdatedAt: "",
      servicePushConsent: false,
      serviceUpdatedAt: "",
    },
    role: "",
    img: null,
  });

  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const { userTsid, userRole } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        console.log("Fetched user data:", data);
        if (data) {
          setUser((prevUser) => {
            const updatedUser = {
              ...prevUser,
              ...data,
              userConsents: {
                ...prevUser.userConsents,
                ...data.userConsents,
              },
              userCategories: data.userCategories
                  ? data.userCategories.map((cate: any) => ({
                    name: cate.name,
                  }))
                  : prevUser.userCategories,
              role: userRole ?? prevUser.role,
            };
            console.log("Updated user state:", updatedUser);
            return updatedUser;
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userTsid, userRole]);

  const userChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setUser((prevUser) => {
      if (name === "nickname") {
        return {
          ...prevUser,
          nickname: value, // 닉네임 필드를 직접 업데이트
        };
      } else if (name === "marketingConsent" || name === "servicePushConsent") {
        // userConsents 내의 체크박스 필드를 업데이트
        return {
          ...prevUser,
          userConsents: {
            ...prevUser.userConsents,
            [name]: type === "checkbox" ? checked : value,
            [`${name}UpdatedAt`]: new Date().toISOString(),
          },
        };
      } else {
        return {
          ...prevUser,
          [name]: value, // 기타 다른 일반 input 필드의 경우 값을 직접 설정
        };
      }
    });

    if (name === "nickname") {
      setNicknameCheck(false);
      setNicknameMsg("");
    }
  };

  const handleNicknameCheck = async () => {
    if (user?.nickname) {
      try {
        const result = await checkNickname(user.nickname);
        if (result) {
          setNicknameMsg("사용 가능한 닉네임입니다.");
          setNicknameCheck(true);
        } else {
          setNicknameMsg("중복된 닉네임입니다.");
          setNicknameCheck(false);
        }
      } catch (error) {
        setNicknameMsg("중복된 닉네임입니다.");
        setNicknameCheck(false);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUser((prevUser) => ({
        ...prevUser, // 이전 상태의 모든 필드를 복사
        img: file, // img 필드만 File 객체로 덮어씀
      }));
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById(
      "profileImageInput"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setUser((prevUser) => {
      const categoryExists = prevUser.userCategories.some(
        (cat) => cat.name === categoryName // 기존 카테고리의 이름과 비교
      );

      const newCategories = categoryExists
        ? prevUser.userCategories.filter(
            (cat) => cat.name !== categoryName // 카테고리에서 삭제
          )
        : prevUser.userCategories.length < 3
        ? [...prevUser.userCategories, { name: categoryName }] // 새로운 카테고리 추가
        : prevUser.userCategories;

      return {
        ...prevUser,
        userCategories: newCategories,
      };
    });
  };

  const submit = async () => {
    if (!nicknameCheck) {
      setNicknameMsg("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (user) {
      console.log("User data exists:", user);
      try {
        const formData = new FormData();

        // userConsents의 날짜 필드를 Date 객체로 변환
        const marketingUpdatedAt = user.userConsents.marketingUpdatedAt ? new Date(user.userConsents.marketingUpdatedAt).toISOString().slice(0, 19) : null;
        const serviceUpdatedAt = user.userConsents.serviceUpdatedAt ? new Date(user.userConsents.serviceUpdatedAt).toISOString().slice(0, 19) : null;

        const userData = {
          userTsid: user.userTsid,
          nickname: user.nickname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userCategories: user.userCategories,
          userConsents: {
            marketingConsent: user.userConsents.marketingConsent,
            marketingUpdatedAt: marketingUpdatedAt ? marketingUpdatedAt : '',
            servicePushConsent: user.userConsents.servicePushConsent,
            serviceUpdatedAt: serviceUpdatedAt ? serviceUpdatedAt : ''
          },
          role: user.role
        };
  
        formData.append("userData", JSON.stringify(userData));
        // 이미지 파일이 있으면 FormData에 추가
        if (user.img) {
          formData.append("img", user.img);
        }
  
        // FormData를 서버로 전송
        const updatedData = await updateUserData(formData);

        setUser((prevUser) => ({
          ...prevUser,
          ...updatedData,
          userConsents: {
            ...prevUser.userConsents,
            ...updatedData.userConsents,
          },
        }));

        navigate("/mypage"); // 업데이트 후 페이지 이동
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  return (
    <>
      <Header leftIcon="취소" rightIcon="완료" onRightClick={submit} />

      <div id="user-update">
        <div className="update-image">
          <div className="profile-black" onClick={handleImageClick}></div>
          <img
            src={user.img instanceof File ? URL.createObjectURL(user.img) : ""}
            alt="profile"
            onClick={handleImageClick}
          />
          <input
            type="file"
            id="profileImageInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="update-profile">
          <div className="update-nickname">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={user.nickname}
              onChange={userChange}
            />
            <button onClick={handleNicknameCheck}>중복확인</button>
          </div>
          {nicknameMsg && (
            <p
              className={`nickname-check ${
                nicknameCheck ? "success" : "error"
              }`}
            >
              {nicknameMsg}
            </p>
          )}
          <div className="update-email">
            <label htmlFor="email">게정 정보</label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={userChange}
              readOnly
            />
          </div>
          <div className="update-phone-number">
            <label htmlFor="phone-number">연락처</label>
            <input
              type="text"
              id="phone-number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={userChange}
              readOnly
            />
          </div>
          <div className="update-category">
            <h3>선호하는 카테고리</h3>
            {[
              "뷰티",
              "패션",
              "음식/음료",
              "캐릭터",
              "리빙/금융",
              "연예",
              "게임",
              "가전/디지털",
              "콘텐츠",
              "취미/여가",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={
                  user.userCategories.some(
                    (cat) => cat.name === category // 기존 카테고리와 비교
                  )
                    ? "selected"
                    : ""
                }
                disabled={
                  user.userCategories.length >= 3 &&
                  !user.userCategories.some(
                    (cat) => cat.name === category
                  )
                }
              >
                {category}
              </button>
            ))}
          </div>
          <div className="update-agree">
            <h3>마케팅 수신 동의</h3>
            <div className="update-marketing">
              <input
                  type="checkbox"
                  id="marketing"
                  name="marketingConsent"
                  checked={user.userConsents.marketingConsent}
                  onChange={userChange}
              />
              <label htmlFor="marketing">마케팅 수신 동의</label>
            </div>
            <p>(동의: {user.userConsents.marketingUpdatedAt})</p>

            <div className="update-push">
              <input
                  type="checkbox"
                  id="push"
                  name="servicePushConsent"
                  checked={user.userConsents.servicePushConsent}
                  onChange={userChange}
              />
              <label htmlFor="push">이벤트성 푸쉬 알림 수신 동의</label>
            </div>
            <p>(동의: {user.userConsents.serviceUpdatedAt})</p>
          </div>
        </div>
      </div>

      <Menu/>
    </>
  );
};

export default UserUpdate;