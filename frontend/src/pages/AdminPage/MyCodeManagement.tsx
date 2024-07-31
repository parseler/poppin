import "@css/AdminPage/MyCodeManagement.css";
import CreateButton from "@components/CreateButton";
import { useState } from "react";
import { Box, Modal } from "@mui/material";

// 매니저 코드 목록
const managers = [
  {
    id: "mangbear12",
    password: "qwer1234!",
    nickname: "망곰팝업담당자",
    popup: [
      "망그러진곰 비밀의 방 팝업스토어",
      "망그러진곰 마법사의 방 팝업스토어",
      "망그러진곰 추억이 담긴 방 팝업스토어",
    ],
  },
  {
    id: "choonbae1234",
    password: "asdf5678!",
    nickname: "춘배팝업담당자",
    popup: ["<춘배의 여름방학 with Galaxy Z Flip6> 팝업스토어"],
  },
];

const MyCodeManagement = () => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [current, setCurrent] = useState<(typeof managers)[0] | null>(null);

  const openModal = (
    type: string,
    manager: (typeof managers)[0] | null = null
  ) => {
    setModalType(type);
    setCurrent(manager);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalType(null);
    setCurrent(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div id="my-code-management">
      <h1>매니저 코드 관리</h1>
      <div className="manager-search">
        <input type="text" placeholder="닉네임 혹은 팝업 이름을 검색해주세요" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M13.3539 12.6462L10.2245 9.51749C11.1315 8.42856 11.5838 7.03186 11.4873 5.61795C11.3908 4.20404 10.7528 2.88178 9.70623 1.92622C8.65963 0.97067 7.28492 0.455399 5.86808 0.487599C4.45125 0.519799 3.10137 1.09699 2.09926 2.0991C1.09714 3.10122 0.519951 4.4511 0.487751 5.86793C0.455551 7.28477 0.970822 8.65948 1.92638 9.70608C2.88193 10.7527 4.20419 11.3906 5.6181 11.4871C7.03201 11.5837 8.42871 11.1314 9.51764 10.2244L12.6464 13.3537C12.6928 13.4002 12.748 13.437 12.8087 13.4622C12.8694 13.4873 12.9344 13.5003 13.0001 13.5003C13.0658 13.5003 13.1309 13.4873 13.1916 13.4622C13.2523 13.437 13.3074 13.4002 13.3539 13.3537C13.4003 13.3073 13.4372 13.2521 13.4623 13.1914C13.4875 13.1307 13.5004 13.0657 13.5004 13C13.5004 12.9343 13.4875 12.8692 13.4623 12.8085C13.4372 12.7478 13.4003 12.6927 13.3539 12.6462ZM1.50014 5.99999C1.50014 5.10997 1.76406 4.23995 2.25853 3.49992C2.753 2.7599 3.4558 2.18313 4.27807 1.84253C5.10034 1.50194 6.00514 1.41282 6.87805 1.58646C7.75096 1.76009 8.55279 2.18867 9.18212 2.81801C9.81146 3.44735 10.24 4.24917 10.4137 5.12208C10.5873 5.995 10.4982 6.8998 10.1576 7.72207C9.81701 8.54433 9.24023 9.24714 8.50021 9.7416C7.76019 10.2361 6.89016 10.5 6.00014 10.5C4.80708 10.4987 3.66325 10.0241 2.81962 9.18051C1.976 8.33688 1.50147 7.19306 1.50014 5.99999Z"
            fill="#8B8B8B"
          />
        </svg>
      </div>
      <div className="manager-list">
        <table>
          <thead>
            <tr>
              <th>닉네임</th>
              <th>팝업스토어</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager, index) => (
              <tr key={index}>
                <td onClick={() => openModal("view", manager)}>
                  {manager.nickname}
                </td>
                <td>
                  {manager.popup.length > 1
                    ? manager.popup[0] + " 外"
                    : manager.popup[0]}
                </td>
                <td onClick={() => openModal("delete")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H8.25C8.05109 12.75 7.86033 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86033 11.329 8.05109 11.25 8.25 11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                      fill="#D4145A"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateButton onClick={() => openModal("create")} />

      <Modal open={modalType !== null} onClose={closeModal}>
        <Box className="manager-modal">
          {/* 추가 모달 */}
          {modalType === "create" && (
            <div id="create-modal">
              <h2>매니저 코드 생성</h2>
              <div className="create-manager">
                <div>
                  <label htmlFor="">아이디</label>
                  <input type="text" placeholder="아이디 입력" />
                </div>
                <div>
                  <label htmlFor="">패스워드</label>
                  <input type="text" placeholder="패스워드 입력" />
                </div>
                <div>
                  <label htmlFor="">닉네임</label>
                  <input type="text" placeholder="닉네임 입력" />
                </div>
              </div>
              <div className="buttons">
                <button onClick={closeModal}>취소</button>
                <button>생성</button>
              </div>
            </div>
          )}
          {/* 삭제 모달 */}
          {modalType === "delete" && (
            <div id="delete-modal">
              <p>정말 삭제하시겠습니까?</p>
              <div className="buttons">
                <button onClick={closeModal}>취소</button>
                <button>삭제</button>
              </div>
            </div>
          )}
          {/* 조회 모달 */}
          {modalType === "view" && current && (
            <div id="view-modal">
              <h2>매니저 정보</h2>
              <h3>아이디</h3>
              <p className="id">{current.id}</p>
              <h3>닉네임</h3>
              <p className="nickname">{current.nickname}</p>
              <h3>등록한 팝업 정보</h3>
              <div className="pop-list">
                {current.popup.map((popup, index) => (
                  <p className="pop-item" key={index}>
                    {popup}
                  </p>
                ))}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MyCodeManagement;
