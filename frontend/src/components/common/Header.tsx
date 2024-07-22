import "@css/Header.css";
import logo from "@assets/poppin_gradiant.svg";
import getIncon from "@utils/get-header-icon";
import { useNavigate } from "react-router-dom";

interface IconProps {
  leftIcon: string;
  rightIcon: string;
}

const Header = ({leftIcon, rightIcon} : IconProps) => {
  const navigate = useNavigate();
  const haandleBackIcon = () => {
    if (leftIcon === getIncon("back")) navigate(-1);
  }

  return (
    <div id="header">
      <div className="left-icon">
        <img src={leftIcon} alt="Left" onClick={haandleBackIcon} />
      </div>
      <div className="logo">
        <img src={logo} alt="poppin_logo" />
      </div>
      <div className="right-icon">
        <img src={rightIcon} alt="Right" />
      </div>
    </div>
  );
};

export default Header;
