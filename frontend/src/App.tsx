import { Route, Routes } from "react-router-dom";
import Layout from "@components/common/Layout";

import Home from "@pages/Home";
import PopDetail from "@pages/Pop/PopDetail";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
      </Routes>
    </div>
    // <PopDetail />
  )
}

export default App;
