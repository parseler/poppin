import { Route, Routes } from "react-router-dom";
import Layout from "@components/common/Layout";

import Home from "@pages/Home";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
      </Routes>
    </div>
  )
}

export default App;
