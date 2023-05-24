import React from 'react';
import { Link } from 'react-router-dom';

const Notice = () => {
  return (
    <div>
      {/* 페이지로 돌아가기 위한 링크 */}
      <Link to="/">홈으로 돌아가기</Link>
      {/* 공지사항 페이지 내용 */}
      <h2>공지사항 페이지</h2>
      <p>공지사항 내용입니다.</p>
    </div>
  );
};

export default Notice;