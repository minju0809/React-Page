import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
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

// // 로컬 스토리지 사용
// const handleFavorite = (productId) => {
//   setFavorites((prevFavorites) => {
//     const isFavorite = prevFavorites.includes(productId);
//     let updatedFavorites;

//     if (isFavorite) {
//       // 이미 즐겨찾기에 있는 상품인 경우 제거
//       updatedFavorites = prevFavorites.filter((id) => id !== productId);
//     } else {
//       // 현재 즐겨찾기에 없는 상품인 경우 추가
//       updatedFavorites = [...prevFavorites, productId];
//     }

//     setFavorites(updatedFavorites);

//     // 로컬 스토리지에 즐겨찾기 목록 저장
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   });
// };

// 백엔드 사용 시 //
  // const handleFavorite = async (productId) => {
  //   const isFavorite = favorites.includes(productId);
  //   let updatedFavorites;

  //   if (isFavorite) {
  //     // 이미 즐겨찾기에 있는 상품인 경우 제거
  //     updatedFavorites = favorites.filter((id) => id !== productId);
  //   } else {
  //     // 현재 즐겨찾기에 없는 상품인 경우 추가
  //     updatedFavorites = [...favorites, productId];
  //   }

  //   setFavorites(updatedFavorites);

  //   try {
  //     // 즐겨찾기 목록 업데이트
  //     await axios.post("/api/favorites", { favorites: updatedFavorites });
  //   } catch (error) {
  //     console.error("Failed to update favorites:", error);
  //   }
  // };

  // const fetchFavorites = async () => {
  //   try {
  //     // 서버에서 즐겨찾기 목록 가져오기
  //     const response = await axios.get("/api/favorites");
  //     const favoritesData = response.data.favorites;
  //     setFavorites(favoritesData);
  //   } catch (error) {
  //     console.error("Failed to fetch favorites:", error);
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
    즐겨찾기: (product) => favorites.includes(product.id), // '즐겨찾기' 상품
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

// // 로컬 스토리지
//   useEffect(() => {
//     // 로컬 스토리지에서 이전에 저장한 즐겨찾기 목록 가져오기
//     const storedFavorites = localStorage.getItem("favorites");
//     if (storedFavorites) {
//       setFavorites(JSON.parse(storedFavorites));
//     }
//   }, []);

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
          {filterByCategory === "favorites"
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
