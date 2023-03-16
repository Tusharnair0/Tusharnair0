import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";

import Slider1 from "../../image/slider1.jpg";
import Whey from "../../image/Whey.jpg"
import Gym1 from "../../image/gym1.jpg"

const Home = ({ active, setActive }) => {
  const {
    productState: { productSelect, productLoading, product },
    getProducts,
  } = useContext(ProductContext);

  let body = null;
  useEffect(() => {
    getProducts();
  }, [productLoading]);

  getData();
  async function getData() {
    if (productLoading) {
      body = (
        <div>
          <h2>No Product Found.</h2>
        </div>
      );
    } else {
      if (product == null || product === undefined || product.length === 0) {
        body = (
          <div>
            <h2>No Product Found.</h2>
          </div>
        );
      } else {
        body = (
          <section className="Recommend-List">
            {product.map((products, idx) => {
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
        );
      }
    }
  }

  return (
    <>
      <div className="Home-Slider">
        <div className="Slidershow-Wrapper">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={Slider1}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={Whey}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={Gym1}
                  alt="Third slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div className="Home-Wrapper">
        <div className="ScrollList-Vertical">
          <div>
            <div className="ScrollList-heading-wrap">
              <h2 className="ScrollList-heading">
                <span rel="noreferrer" target="_self">
                  Sản Phẩm 
                  <span className="ScrollList-Label">Hot</span>
                </span>
              </h2>
            </div>
          </div>
          <div className="ScrollList-body">{body}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
