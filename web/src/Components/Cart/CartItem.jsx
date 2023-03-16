import React, { useEffect, useState } from "react";

const CartItem = ({ product, setProductList }) => {
  const img = product.image.replace("\\", "/");
  const items = JSON.parse(localStorage.getItem("items")) || {};
  console.log(items);
  const [quantity, setQuantity] = useState(items[product._id]);

  return (
    <div
      className="mt-3 px-5 pb-5 pt-3 d-flex"
      style={{ borderBottom: "1px solid #dee2e6" }}
    >
      <div
        className="d-flex"
        style={{
          width: "29.03811%",
          boxSizing: "border-box",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <div className="d-flex">
          <a href="#">
            <div
              className="Cart-Img"
              style={{ backgroundImage: `url("http://localhost:5000/${img}")` }}
            ></div>
          </a>
          <div
            className="pt-3 pl-4 pr-5 d-flex flex-column"
            style={{
              fontSize: "14px",
              overflow: "hidden",
              lineHeight: "16px",
            }}
          >
            <span className="Cart-Title">{product.title}</span>
          </div>
        </div>
      </div>
      <div className="dqCy3J"></div>
      <div className="_52vwcs">
        <div>
          <span className="d6HZlA">${product.price}</span>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <div style={{ marginRight: "15px" }}>
            <div className="Quantity-Wrapper d-flex align-items-center">
              <button
                className="Quantity-IconButton"
                onClick={() => {
                  if (quantity > 1) {
                    items[product._id] = quantity - 1;
                    setQuantity(quantity - 1);
                    localStorage.setItem("items", JSON.stringify(items));
                  }
                }}
              >
                <svg
                  enable-background="new 0 0 10 10"
                  viewBox="0 0 10 10"
                  x="0"
                  y="0"
                  className="Quantity-IconSvg"
                >
                  <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                </svg>
              </button>
              <input
                className="Quantity-IconButton Quantity-Input"
                type="number"
                role="spinbutton"
                value={quantity}
                disabled
              />
              <button
                className="Quantity-IconButton"
                onClick={() => {
                  items[product._id] = quantity + 1;
                  setQuantity(quantity + 1);
                  localStorage.setItem("items", JSON.stringify(items));
                }}
              >
                <svg
                  enable-background="new 0 0 10 10"
                  viewBox="0 0 10 10"
                  x="0"
                  y="0"
                  className="Quantity-IconSvg icon-plus-sign"
                >
                  <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="V9JZ">
        <span>${product.price * items[product._id]}</span>
      </div>
      <div className="X4A4">
        <button
          className="btn btn-warning"
          onClick={() => {
            delete items[product._id];
            localStorage.setItem("items", JSON.stringify(items));
            setProductList([]);
          }}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
