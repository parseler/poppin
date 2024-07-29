import { Route, Routes } from "react-router-dom";
import Layout01 from "@components/common/Layout01";
import Layout02 from "@components/common/Layout02";
import Layout03 from "@components/common/Layout03";
import Layout04 from "@components/common/Layout04";

import Splash from "@pages/Splash";
import Login from "@pages/Login";
import Home from "@pages/Home";
import CalendarPage from "@pages/Calendar";
import Map from "@pages/Map";
import ReviewList from "@pages/Review/ReviewList";
import Mypage from "@pages/Mypage";
import Category from "@pages/Category";
import Rank from "@pages/Rank";
import Open from "@pages/Open";
import ReviewWrite from "@pages/Review/ReviewWrite";
import ReviewDetail from "@pages/Review/ReviewDetail";
import PopDetail from "@pages/Pop/PopDetail";
import PopReservationCheck from "@pages/Pop/PopReservationCheck";
import PopReservationFin from "@pages/Pop/PopReservationFin";
import Waiting from "@pages/Waiting";
import RegistPop from "@pages/ManagerPage/RegistPop";
import RegistPopOptional from "@pages/ManagerPage/RegistPopOptional";
import RegistFin from "@pages/ManagerPage/RegistFin";
import RegistPopReservationInfo from "@pages/ManagerPage/RegistPopReservationInfo";

import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? <Splash/> : ''}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout01><Home /></Layout01>} />
        <Route path="/calendar" element={<Layout01><CalendarPage /></Layout01>} />
        <Route path="/map" element={<Layout01><Map /></Layout01>} />
        <Route path="/review" element={<Layout01><ReviewList /></Layout01>} />
        <Route path="/review/write" element={<Layout03><ReviewWrite /></Layout03>} />
        <Route path="/review/:reviewId" element={<Layout02><ReviewDetail /></Layout02>} />
        <Route path="/mypage" element={<Layout01><Mypage /></Layout01>} />
        <Route path="/:categoryId" element={<Layout02><Category /></Layout02>} />
        <Route path="/rank" element={<Layout02><Rank /></Layout02>} />
        <Route path="/open" element={<Layout02><Open /></Layout02>} />
        <Route path="/popdetail" element={<PopDetail />} />
        <Route path="/reservation-check" element={<Layout04><PopReservationCheck /></Layout04>} />
        <Route path="/reservation-check/finish" element={<Layout04><PopReservationFin /></Layout04>} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/regist-pop" element={<Layout04><RegistPop /></Layout04>} />
        <Route path="/regist-pop-optional" element={<Layout04><RegistPopOptional /></Layout04>} />
        <Route path="/regist-pop-fin" element={<Layout04><RegistFin /></Layout04>} />
        <Route path="/regist-pop-reservation" element={<Layout04><RegistPopReservationInfo /></Layout04>} />
      </Routes>
    </div>
  )
}

export default App;
