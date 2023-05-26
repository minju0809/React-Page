import React from "react";
import { useParams } from "react-router-dom";
import shopData from "../../data/shopData";

const ShopDetail = () => {
  const { productId } = useParams();
  const product = shopData.find((item) => item.id === parseInt(productId));

  return (
    <div>
      {/* 상세 페이지 내용 */}
      {/* <h2>상품 ID: {productId}</h2> */}
      <section>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </section>
      <p>가격: {product.price}</p>

      {product.options.map((option, index) => {
        if (
          option.values &&
          Array.isArray(option.values) &&
          option.values.length > 0
        ) {
          return (
            <div key={index}>
              {/* 옵션 드롭다운 메뉴 */}
              <select>
                <option value="">{option.type} 선택</option>
                {option.values.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ShopDetail;
