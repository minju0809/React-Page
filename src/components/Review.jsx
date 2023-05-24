import React from "react";
import { Link } from "react-router-dom";

const Review = () => {
  return (
    <div>
      {/* 페이지로 돌아가기 위한 링크 */}
      <Link to="/">홈으로 돌아가기</Link>
      <h2>리뷰</h2>
      <p>리뷰 페이지입니다.</p>
    </div>
  );
};

export default Review;
