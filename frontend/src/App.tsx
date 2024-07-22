import { Route, Routes } from "react-router-dom";
import Layout01 from "@components/common/Layout01";
import Layout02 from "@components/common/Layout02";

import Home from "@pages/Home";
import Rank from "@pages/Rank";
import Category from "@pages/Category";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout01><Home /></Layout01>} />
        <Route path="/rank" element={<Layout02><Rank /></Layout02>} />
        <Route path="/:categoryId" element={<Layout02><Category /></Layout02>} />
      </Routes>
    </div>
  )
}

export default App;
