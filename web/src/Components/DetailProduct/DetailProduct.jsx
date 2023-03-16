import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";

import product from "../../image/product.jpg";

const DetailProduct = () => {
  const location = useLocation();
  const id = location.pathname.replace("/product/", "");
  const {
    productState: { productSelect, productLoading, product, productRecommend },
    getSingleProduct,
    getRecommendProduct
  } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  let body = null;
  let recommend = null;

  useEffect(() => {
    getSingleProduct(id);
    getRecommendProduct(id);
  }, [productLoading]);

  const addProduct = () => {
    const items = JSON.parse(localStorage.getItem("items")) || {};
    const keys = Object.keys(items);
    if (keys.includes(id)) {
      items[id] = items[id] + quantity;
    } else {
      items[id] = quantity;
    }
    localStorage.setItem("items", JSON.stringify(items));
    setQuantity(1);
  };
  getData();

  getRecommendData();

  async function getRecommendData() {
    if (productLoading) {
      recommend = <></>;
    } else {
      if (product == null || product == undefined) {
        recommend = <></>;
      } else {
        recommend = (
          <>
            <section className="Recommend-List">
              {productRecommend.map((products, idx) => {
                let img = products.image.replace("\\", "/");
                return (
                  <>
                    <div className="Recommend-Card-Wrapper" key={products._id}>
                      <div className="Recommend-Card">
                        <Link
                          to={"/product/" + products._id}
                          style={{
                            backgroundImage: `url("http://localhost:5000/${img}")`,
                          }}
                          className="Recommend-Card-Thumb"
                        >
                          <button className="Recommend-CardBtn">
                            Xem sản phẩm
                          </button>
                        </Link>
                        <h3 className="Recommend-Title">
                          <Link to={"/products/" + products._id}>
                            {products.title}
                          </Link>
                        </h3>
                        <div className="Recommend-Price">
                          {products.oldPrice ? (
                            <span className="Recommend-Price-old">
                              {products.oldPrice}$
                            </span>
                          ) : (
                            <></>
                          )}
                          <span className="Recommend-Price-new">
                            {products.price}$
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </section>
          </>
        );
      }
    }
  }
  async function getData() {
    if (productLoading) {
      body = (
        <div>
          <h2>No Product Found.</h2>
        </div>
      );
    } else {
      if (product == null || product == undefined) {
        body = (
          <div>
            <h2>No Product Found.</h2>
          </div>
        );
      } else {
        body = (
          <>
            <div className="Product-Title">
              <h1>{product[0].title}</h1>
            </div>
            <div className="Product-Body clearfix">
              <div className="Product-Left">
                <div className="img-fluid">
                  <img
                    src={"http://localhost:5000/" + product[0].image}
                    className="img-fluid"
                    alt="Whey Protein"
                  />
                </div>
              </div>
              <div className="Product-Right">
                <div className="price">
                  <div className="price-new">{product[0].price}$</div>
                  {product[0].oldPrice ? (
                    <div className="price-old">2.499.000$</div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="d-flex align-items-center">
                  <div className="text">Số lượng</div>
                  <div className="d-flex align-items-center">
                    <div style={{ marginRight: "15px" }}>
                      <div className="Quantity-Wrapper d-flex align-items-center">
                        <button
                          className="Quantity-IconButton"
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity(quantity - 1);
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
                          onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                          }}
                        />
                        <button
                          className="Quantity-IconButton"
                          onClick={() => {
                            setQuantity(quantity + 1);
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
                    <div>66184 sản phẩm có sẵn</div>
                  </div>
                </div>
                <div style={{ margintop: "15px" }}>
                  <button
                    type="button"
                    className="btn btn-tinted btn--l d-flex"
                    aria-disabled="false"
                  >
                    <svg
                      enable-background="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x="0"
                      y="0"
                      className="shopee-svg-icon tDviDD icon-add-to-cart"
                    >
                      <g>
                        <g>
                          <polyline
                            fill="none"
                            points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                          ></polyline>
                          <circle cx="6" cy="13.5" r="1" stroke="none"></circle>
                          <circle
                            cx="11.5"
                            cy="13.5"
                            r="1"
                            stroke="none"
                          ></circle>
                        </g>
                        <line
                          fill="none"
                          stroke-linecap="round"
                          stroke-miterlimit="10"
                          x1="7.5"
                          x2="10.5"
                          y1="7"
                          y2="7"
                        ></line>
                        <line
                          fill="none"
                          stroke-linecap="round"
                          stroke-miterlimit="10"
                          x1="9"
                          x2="9"
                          y1="8.5"
                          y2="5.5"
                        ></line>
                      </g>
                    </svg>
                    <span onClick={addProduct}>thêm vào giỏ hàng</span>
                  </button>
                </div>
                <div style={{ margintop: "15px" }}>
                  <h1>Mô tả sản phẩm</h1>
                  <p style={{ textAlign: "start" }}>{product[0].description}</p>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  }

  return <>{body}{recommend}</>;
};

export default DetailProduct;
