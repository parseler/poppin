import "@css/Header.css";
import logo from "@assets/poppin_gradiant.svg";
import getIncon from "@utils/get-header-icon";
import { useNavigate } from "react-router-dom";

interface IconProps {
  leftIcon: string;
  rightIcon: string;
}

const Header = ({ leftIcon, rightIcon }: IconProps) => {
  const navigate = useNavigate();

  const handleBackIcon = () => {
    if (leftIcon === getIncon("back") || leftIcon === "취소") navigate(-1);
  };

  const isImage = (icon: string) => {
    return /\.(jpg|jpeg|png|svg|gif)$/.test(icon);
  };

  return (
    <div id="header">
      <div className="left-icon">
        {isImage(leftIcon) ? (
          <img src={leftIcon} alt="Left" onClick={handleBackIcon} />
        ) : (
          <span onClick={handleBackIcon}>{leftIcon}</span>
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
    </div>
  );
};

export default Header;
