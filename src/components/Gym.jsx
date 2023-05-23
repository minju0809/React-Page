import React from 'react';
import { Link } from 'react-router-dom';

const Gym = () => {
  return (
    <div>
      <h2>체육관 찾기</h2>
      <p>체육관 찾기 페이지입니다.</p>
      {/* 페이지로 돌아가기 위한 링크 */}
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default Gym;