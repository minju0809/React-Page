import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const toggleNav = () => {
    document.body.classList.toggle("open-nav");
  };
  
  return (
    <>
      <header>
        <h1 id="logo">로고</h1>
        <button id="toggleBtn" onClick={toggleNav}>
          &#9776;
        </button>
        <nav id="navbar">
          <ul>
            <li>
              <Link to="/notice">공지사항</Link>
            </li>
            <li>
              <Link to="/photo">사진</Link>
            </li>
            <li>
              <Link to="/gym">체육관 찾기</Link>
            </li>
            <li>
              <Link to="/shop">상점</Link>
            </li>
            <li>
              <Link to="/review">리뷰</Link>
            </li>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>소개</h2>
          <p>웹사이트 소개 내용입니다.</p>
        </section>
        <section>
          <h2>서비스</h2>
          <ul>
            <li>서비스 1</li>
            <li>서비스 2</li>
            <li>서비스 3</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>© 2023 기본 웹사이트. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
