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
// import Favorites from "./components/ShopDetail/ShopFavorites"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/products/:productId" element={<ShopDetail />} />
        {/* <Route path="/shop/favorites" element={<Favorites />} /> */}
        <Route path="/review" element={<Review />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
