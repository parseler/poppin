import '@css/ManagerPage/ManagerLogin.css';
import logo from "@assets/poppin_gradiant.svg";
import { Link } from 'react-router-dom';

const ManagerLogin = () => {
  return (
    <div id="manager-login">
      <img className="logo" src={logo} alt="logo" />
      <div className="manager-input">
        <input type="text" placeholder="아이디를 입력하세요" />
        <input type="password" placeholder="패스워드를 입력하세요" />
      </div>
      <button>매니저 로그인</button>
      <div className="login-etc">
        <Link to={"/"}>그냥 둘러볼래요</Link>
      </div>
    </div>
  );
}

export default ManagerLogin;