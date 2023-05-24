import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div>
      {/* 페이지로 돌아가기 위한 링크 */}
      <Link to="/">홈으로 돌아가기</Link>
      <h2>마이페이지</h2>
      <p>마이페이지입니다.</p>
    </div>
  );
};

export default MyPage;