import React from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  return (
    <div>
      <h2>상점</h2>
      <p>상점 페이지입니다.</p>
      {/* 페이지로 돌아가기 위한 링크 */}
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default Shop;