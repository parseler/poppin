import "@css/Login.css";
import { Link } from "react-router-dom";
import logo from "@assets/poppin_gradiant.svg";
import kakao from "@assets/login/icon_kakao.png";
import naver from "@assets/login/icon_naver.png";

const Login = () => {
  return (
    <div id="login">
      <img className="logo" src={logo} alt="logo" />
      <button className="kakao-login">
        <img src={kakao} alt="카카오 로그인" />
        카카오톡으로 시작하기
      </button>
      <button className="naver-login">
        <img src={naver} alt="네이버 로그인" />
        네이버로 시작하기
      </button>
      <div className="login-etc">
        <Link to={"/"}>그냥 둘러볼래요</Link>
      </div>
    </div>
  );
};

export default Login;
