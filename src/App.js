import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Notice from "./components/Notice";
import Photo from "./components/Photo";
import Gym from "./components/Gym";
import Shop from "./components/Shop";
import Review from "./components/Review";
import MyPage from "./components/MyPage";
import ShopDetail from "./components/ShopDetail/ShopDetail"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Photo" element={<Photo />} />
        <Route path="/Gym" element={<Gym />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Shop/products/:productId" element={<ShopDetail />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
