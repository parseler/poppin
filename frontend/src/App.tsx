import { Route, Routes } from "react-router-dom";
import Layout01 from "@components/common/Layout01";
import Layout02 from "@components/common/Layout02";

import Home from "@pages/Home";
import Calendar from "@pages/Calender";
import Map from "@pages/Map";
import Review from "@pages/Review/Review";
import Mypage from "@pages/Mypage";
import Category from "@pages/Category";
import Rank from "@pages/Rank";
import Open from "@pages/Open";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout01><Home /></Layout01>} />
        <Route path="/calendar" element={<Layout01><Calendar /></Layout01>} />
        <Route path="/map" element={<Layout01><Map /></Layout01>} />
        <Route path="/review" element={<Layout01><Review /></Layout01>} />
        <Route path="/mypage" element={<Layout01><Mypage /></Layout01>} />
        <Route path="/:categoryId" element={<Layout02><Category /></Layout02>} />
        <Route path="/rank" element={<Layout02><Rank /></Layout02>} />
        <Route path="/open" element={<Layout02><Open /></Layout02>} />
      </Routes>
    </div>
  )
}

export default App;
