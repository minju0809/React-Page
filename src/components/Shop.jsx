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
    handleClick(category); // 클릭한 글자 처리
    setShowAllItem(category === "전체상품" ? !showAllItem : false);
    setFilterByCategory(category);
  };

  // 카테고리와 필터 조건을 정의한 객체
  const categoryFilters = {
    전체상품: () => true, // 모든 상품
    라켓: (product) => product.title.includes("라켓"), // '라켓'이 들어간 상품
    의류: (product) => product.title.includes("의류"), // '의류'가 들어간 상품
    가방: (product) => product.title.includes("가방"), // '가방'이 들어간 상품
    신발: (product) => product.title.includes("신발"), // '신발'이 들어간 상품
    셔틀콕: (product) => product.title.includes("셔틀콕"), // '셔틀콕'이 들어간 상품
    용품: (product) => product.title.includes("용품"), // '용품'이 들어간 상품
    즐겨찾기: (product) => favorites.includes(product.id), // '즐겨찾기' 상품
  };

  const getFilteredProducts = () => {
    const filterCondition = categoryFilters[filterByCategory];
    return shopData.filter(filterCondition);
  };

  const handleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      const newFavorites = isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <header>
        {/* 페이지로 돌아가기 위한 링크 */}
        <Link to="/">Home</Link>
        <h2>Shop</h2>
        <input></input>
        <button>Search</button>
      </header>
      <nav id="Shop_navbar">
        <ul className="nav-list">
          {Object.keys(categoryFilters).map((category) => (
            <li
              key={category}
              className="nav-item"
              onClick={() => handleFilter(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>
      <main className="main">
        <h2 className="section-title">{clickedText}</h2>
        <section className="product-list">
          {getFilteredProducts().map((product) => (
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
