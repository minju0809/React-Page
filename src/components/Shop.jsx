import React, { useState } from "react";
import { Link } from "react-router-dom";
import shopData from "../data/shopData";

const Shop = () => {
  const [clickedText, setClickedText] = useState(""); // 클릭한 글자 상태
  const [showAllItem, setShowAllItem] = useState(false); // 첫 화면에서는 전체 상품 보이도록 설정
  const [filterByCategory, setFilterByCategory] = useState("전체상품"); // 카테고리 필터 상태

  const handleClick = (text) => {
    setClickedText(text); // 클릭한 글자를 상태에 저장
  };

  // const toggleShowAllItem = () => {
  //   setShowAllItem(!showAllItem);
  //   setFilterByCategory("전체상품"); // 필터 초기화
  // };

  // const handleCategoryFilter = (category) => {
  //   setShowAllItem(false);
  //   setFilterByCategory(category);
  // };

  const handleFilter = (category) => {
    if (category === "전체상품") {
      handleClick(category); // 클릭한 글자 처리
      setShowAllItem(!showAllItem);
      setFilterByCategory("전체상품"); // 필터 초기화
    } else {
      handleClick(category); // 클릭한 글자 처리
      setShowAllItem(false);
      setFilterByCategory(category);
    }
  };

  // // 카테고리로 필터된 상품 목록 생성 함수
  // const getFilteredProducts = () => {
  //   if (showAllItem || filterByCategory === "전체 상품") {
  //     return shopData; // 전체 상품
  //   } else if (filterByCategory === "라켓") {
  //     return shopData.filter((product) => product.title.includes("라켓")); // '라켓'이 들어간 상품
  //   } else if (filterByCategory === "의류") {
  //     return shopData.filter((product) => product.title.includes("의류")); // '의류'가 들어간 상품
  //   } else {
  //     return []; // 필터된 상품 없음
  //   }
  // };

  // 카테고리와 필터 조건을 정의한 객체
  const categoryFilters = {
    전체상품: () => true, // 모든 상품
    라켓: (product) => product.title.includes("라켓"), // '라켓'이 들어간 상품
    의류: (product) => product.title.includes("의류"), // '의류'가 들어간 상품
    가방: (product) => product.title.includes("가방"), // '가방'아 들어간 상품
    신발: (product) => product.title.includes("신발"), // '신발'이 들어간 상품
    셔틀콕: (product) => product.title.includes("셔틀콕"), // '셔틀콕'이 들어간 상품
    용품: (product) => product.title.includes("용품"), // '용품'이 들어간 상품
  };

  // 카테고리로 필터된 상품 목록 생성 함수
  const getFilteredProducts = () => {
    const filterCondition = categoryFilters[filterByCategory] || (() => false); // 선택된 카테고리에 해당하는 필터 함수
    return shopData.filter(filterCondition);
  };

  return (
    <div>
      <header>
        {/* 페이지로 돌아가기 위한 링크 */}
        <Link to="/">홈으로</Link>
        <h2>상점</h2>
        <input></input>
        <button>검색</button>
      </header>
      <nav id="Shop_navbar">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => handleFilter("전체상품")}>
            전체상품
          </li>
          <li className="nav-item" onClick={() => handleFilter("라켓")}>
            라켓
          </li>
          <li className="nav-item" onClick={() => handleFilter("의류")}>
            의류
          </li>
          <li className="nav-item" onClick={() => handleFilter("가방")}>
            가방
          </li>
          <li className="nav-item" onClick={() => handleFilter("신발")}>
            신발
          </li>
          <li className="nav-item" onClick={() => handleFilter("셔틀콕")}>
            셔틀콕
          </li>
          <li className="nav-item" onClick={() => handleFilter("용품")}>
            용품
          </li>
        </ul>
      </nav>

      <main className="main">
        <h2 className="section-title">{clickedText}</h2>
        <section className="product-list">
          {getFilteredProducts().length > 0 ? (
            getFilteredProducts().map((product, i) => (
              <div key={i} className="product-card">
                <img src={product.image} alt="상품 이미지" />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            ))
          ) : (
            <p>필터된 상품이 없습니다.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Shop;
