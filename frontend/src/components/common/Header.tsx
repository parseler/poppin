import { useState } from "react";
import "@css/Header.css";
import logo from "@assets/poppin_gradiant.svg";
import getIcon from "@utils/get-header-icon";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import backButton from "@assets/header/back_icon.svg";
import reserveIcon from "@assets/header/notificationReservation.svg";
import commentIcon from "@assets/header/notificationComment.svg";
import advertisementIcon from "@assets/header/notificationAd.svg";

interface IconProps {
  leftIcon: string;
  rightIcon: string;
}

const notifications = [
  { type: "reserve", title: "예약 알림", content: "예약이 완료되었습니다.", date: "24. 7. 29.", icon: reserveIcon },
  { type: "comment", title: "댓글 알림", content: "새로운 댓글이 달렸습니다.", date: "24. 7. 29.", icon: commentIcon },
  { type: "advertisement", title: "광고", content: "새로운 광고가 도착했습니다.", date: "24. 7. 29.", icon: advertisementIcon },
];

const Header = ({ leftIcon, rightIcon }: IconProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleBackIcon = () => {
    navigate(-1);
  };

  const handleIconClick = (icon: string) => {
    if (icon === getIcon("notification") || icon === "notification") {
      setModalOpen(true);
    } else if (
      icon === getIcon("back") ||
      icon === "취소" ||
      icon === "back" ||
      icon === "취소"
    ) {
      handleBackIcon();
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const isImage = (icon: string) => {
    return /\.(jpg|jpeg|png|svg|gif)$/.test(icon);
  };

  return (
    <div id="header">
      <div className="left-icon">
        {isImage(leftIcon) ? (
          <img
            src={leftIcon}
            alt="Left"
            onClick={() => handleIconClick(leftIcon)}
          />
        ) : (
          <span onClick={() => handleIconClick(leftIcon)}>{leftIcon}</span>
        )}
      </div>
      <div className="logo">
        <img src={logo} alt="poppin_logo" />
      </div>
      <div className="right-icon">
        {isImage(rightIcon) ? (
          <img src={rightIcon} alt="Right" />
        ) : (
          <span>{rightIcon}</span>
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box className="modal-paper-notification">
          <div className="notification-header">
            <img src={backButton} alt="Back" onClick={handleClose} />
            <div className="title">알림 목록</div>
          </div>
          <div className="notification-list">
            {notifications.map((notification, index) => (
              <div key={index} className={`notification-item ${notification.type}`}>
                <div className="header">
                  <img src={notification.icon} alt={notification.title} className="icon" />
                  <div className="title">{notification.title}</div>
                  <div className="date">{notification.date}</div>
                </div>
                <div className="content">{notification.content}</div>
              </div>
            ))}
          </div>
          <div className="notification-footer">
            알림은 14일 후 순차적으로 지워집니다
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
