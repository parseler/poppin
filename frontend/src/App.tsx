import { Route, Routes } from "react-router-dom";
import Layout01 from "@components/common/Layout01";
import Layout02 from "@components/common/Layout02";
import Layout03 from "@components/common/Layout03";

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

function App() {

  return (
    <div className="App">
      <Routes>
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
      </Routes>
      {/* <PopDetail /> */}
    </div>
  )
}

export default App;
