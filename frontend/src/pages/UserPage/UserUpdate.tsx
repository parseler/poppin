import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProps } from "@interface/users";
import { checkNickname, getUserData, updateUserData } from "@api/users";
import profile from "@assets/user/profile.png";
import Header from "@components/common/Header";
import Menu from "@components/common/Menu";
import useAuthStore from "@store/useAuthStore";

const UserUpdate: React.FC = () => {
  const [user, setUser] = useState<UserProps>({
    userTsid: 0,
    nickname: "",
    email: "",
    phoneNumber: "",
    categoryList: [],
    agreementDto: {
      marketing_consent: false,
      marketing_updated_at: "",
      service_push_consent: false,
      service_updated_at: "",
    },
    role: "",
    img: "",
  });

  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const { accessToken, userTsid, userRole } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData()
      .then((data) => {
        console.log(data);
        if (data) {
          setUser((prevUser) => ({
            ...prevUser,
            userTsid: userTsid !== null ? Number(userTsid) : prevUser.userTsid,
            nickname: data.nickname ?? prevUser.nickname,
            email: data.email,
            phoneNumber: data.phoneNumber,
            categoryList: data.userCategories
              ? data.userCategories.map((cate: any) => cate.category.name)
              : prevUser.categoryList,
            agreementDto: {
              marketing_consent:
                data.userConsents?.marketingConsent ??
                prevUser.agreementDto.marketing_consent,
              marketing_updated_at: prevUser.agreementDto.marketing_updated_at,
              service_push_consent:
                data.userConsents?.servicePushConsent ??
                prevUser.agreementDto.service_push_consent,
              service_updated_at: prevUser.agreementDto.service_updated_at,
            },
            img: data.img ?? prevUser.img,
            role: userRole ?? prevUser.role, // userRole이 null인 경우 기존 role을 유지
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userTsid, userRole]);

  const userChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setUser((prevUser) => {
      if (type === "checkbox") {
        return {
          ...prevUser,
          agreementDto: {
            ...prevUser.agreementDto,
            [name]: checked, // 체크박스의 값을 agreementDto의 해당 속성에 할당
          },
        };
      } else {
        return {
          ...prevUser,
          [name]: value, // 일반 input 필드의 경우 값을 직접 설정
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          img: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
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

  const handleCategoryClick = (category: string) => {
    setUser((prevUser) => {
      let newCategories = [...prevUser.categoryList];
      if (newCategories.includes(category)) {
        newCategories = newCategories.filter((cat) => cat !== category);
      } else if (newCategories.length < 3) {
        newCategories.push(category);
      }
      return {
        ...prevUser,
        categoryList: newCategories,
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
        console.log("Submitting user data:", user); // 디버깅을 위한 콘솔 출력
        const updatedUserData: UserProps = {
          userTsid: Number(user.userTsid),
          nickname: user.nickname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          categoryList: user.categoryList,
          agreementDto: {
            marketing_consent: user.agreementDto.marketing_consent,
            marketing_updated_at: user.agreementDto.marketing_updated_at,
            service_push_consent: user.agreementDto.service_push_consent,
            service_updated_at: user.agreementDto.service_updated_at,
          },
          img: user.img,
          role: user.role,
        };

        console.log("아이디", updatedUserData.userTsid)

        await updateUserData(updatedUserData); // API 호출
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
            src={user.img === "IMG_URL" ? profile : user.img || profile}
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
                  user.categoryList.includes(category) ? "selected" : ""
                }
                disabled={
                  user.categoryList.length >= 3 &&
                  !user.categoryList.includes(category)
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
                name="marketing_consent"
                checked={user.agreementDto.marketing_consent}
                onChange={userChange}
              />
              <label htmlFor="marketing">마케팅 수신 동의</label>
            </div>
            <p>(동의: {user.agreementDto.marketing_updated_at})</p>

            <div className="update-push">
              <input
                type="checkbox"
                id="push"
                name="service_push_consent"
                checked={user.agreementDto.service_push_consent}
                onChange={userChange}
              />
              <label htmlFor="push">이벤트성 푸쉬 알림 수신 동의</label>
            </div>
            <p>(동의: {user.agreementDto.service_updated_at})</p>
          </div>
        </div>
      </div>

      <Menu />
    </>
  );
};

export default UserUpdate;
