import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shopData from "../data/shopData";
import ProductCard from "./ProductCard";

const Shop = () => {
  const [clickedText, setClickedText] = useState(""); // 클릭한 글자 상태
  const [showAllItem, setShowAllItem] = useState(false); // 첫 화면에서는 전체 상품 보이도록 설정
  const [filterByCategory, setFilterByCategory] = useState("전체상품"); // 카테고리 필터 상태
  const [favorites, setFavorites] = useState([]); // 즐겨찾기 목록을 저장할 배열

  const handleClick = (text) => {
    setClickedText(text); // 클릭한 글자를 상태에 저장
  };

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

  const handleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      if (isFavorite) {
        // 이미 즐겨찾기에 있는 상품인 경우 제거
        return prevFavorites.filter((id) => id !== productId);
      } else {
        // 현재 즐겨찾기에 없는 상품인 경우 추가
        return [...prevFavorites, productId];
      }
    });
  };

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

  const getFilteredProducts = () => {
    const filterCondition = categoryFilters[filterByCategory] || (() => false);
    return shopData.filter(filterCondition);
  };

  const getFavoriteProducts = () => {
    const filterCondition = categoryFilters[filterByCategory] || (() => false);
    const filteredProducts = shopData.filter(filterCondition);

    if (filterByCategory === "즐겨찾기") {
      return filteredProducts.filter((product) =>
        favorites.includes(product.id)
      );
    }

    return filteredProducts;
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    console.log("favorites", favorites);
    if (favorites.length !== 0)
      localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
          <li className="nav-item" onClick={() => handleFilter("즐겨찾기")}>
            즐겨찾기
          </li>
        </ul>
      </nav>

      <main className="main">
        <h2 className="section-title">{clickedText}</h2>
        <section className="product-list">
          {filterByCategory === "즐겨찾기"
            ? getFavoriteProducts().map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleFavorite={handleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))
            : getFilteredProducts().map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleFavorite={handleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
        </section>
      </main>
    </div>
  );
};

export default Shop;
