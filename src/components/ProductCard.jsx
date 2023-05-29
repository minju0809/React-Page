import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleFavorite, isFavorite }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    handleFavorite(product.id);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/Shop/products/${product.id}`}>
        <div>
          <img src={product.image} alt="상품 이미지" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">{product.price}</p>
        </div>
      </Link>
      {hovered && (
        <div className="product-actions">
          <button className="favorite-button" onClick={handleFavoriteClick}>
            {isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
          <button className="preview-button">미리보기</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
