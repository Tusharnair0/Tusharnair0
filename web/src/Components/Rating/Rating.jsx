import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { ProductContext } from "../../Context/ProductContext";

const Rating = () => {
  const {
    productState: { productLoading, productRating },
    getNotRatingProduct,
    ratingProduct,
  } = useContext(ProductContext);

  let body = null;
  useEffect(() => {
    getNotRatingProduct();
  }, [productLoading]);

  const ratingChanged = (newRating, id) => {
    ratingProduct(newRating, id);
  };

  getData();
  async function getData() {
    if (productLoading) {
      body = (
        <div>
          <h2>No Product Found.</h2>
        </div>
      );
    } else {
      if (
        productRating == null ||
        productRating == undefined ||
        productRating.length === 0
      ) {
        body = (
          <div>
            <h2>No Product Found.</h2>
          </div>
        );
      } else {
        body = (
          <section className="Recommend-List">
            {productRating.map((products, idx) => {
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
                        <ReactStars
                          count={5}
                          size={24}
                          onChange={(e) => {
                            ratingChanged(products._id, e);
                          }}
                          activeColor="#ffd700"
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </section>
        );
      }
    }
  }

  return (
    <div className="Home-Wrapper">
      <div className="ScrollList-Vertical">
        <div>
          <div className="ScrollList-heading-wrap">
            <h2 className="ScrollList-heading">
              <span rel="noreferrer" target="_self">
                Sản Phẩm Chưa Được Đánh Giá
                <span className="ScrollList-Label">Rating</span>
              </span>
            </h2>
          </div>
        </div>
        <div className="ScrollList-body">{body}</div>
      </div>
    </div>
  );
};

export default Rating;
