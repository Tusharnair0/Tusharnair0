import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BillContext } from "../../Context/BillContext";

import ProductImage1 from ".././../image/product1.png";

const History = () => {
  const {
    billState: { billLoading, bill },
    loadBill,
  } = useContext(BillContext);

  let body = null;
  useEffect(() => {
    loadBill();
  }, [billLoading]);

  getData();
  async function getData() {
    if (billLoading) {
      body = (
        <div>
          <h2>No Bill Found.</h2>
        </div>
      );
    } else {
      if (bill == null || bill == undefined || bill.length === 0) {
        body = (
          <div>
            <h2>No Bill Found.</h2>
          </div>
        );
      } else {
        body = (
          <>
            {bill.map((bills, idx) => {
              return (
                <>
                  <div className="History-Item-Card" key={idx}>
                    {bills.products.map((product) => {
                      let img = product.product[0].image.replace("\\", "/");
                      return (
                        <>
                          <div className="px-4 pt-4 pb-3">
                            <Link to={"/product/" + product.product[0]._id}>
                              <div className="QkIuzE">
                                <div className="hDGdsD">
                                  <div className="_50XPwl">
                                    <div className="History-Wrapper">
                                      <div
                                        className="History-Image"
                                        style={{
                                          backgroundImage: `url("http://localhost:5000/${img}")`,
                                        }}
                                      >
                                        <div className="History-Image-Content"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="tODfT4">
                                    <div>
                                      <div class="QJqUaT">
                                        <span class="WVc4Oc">
                                          {product.product[0].title}
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <div
                                        class="qGisqd"
                                        style={{ fontSize: "14px" }}
                                      >
                                        x{product.quantity}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="_QRFJX">
                                    <div>
                                      <span class="ghw9hb">
                                        ${product.product[0].price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </>
                      );
                    })}
                    <div class="BAMNqz">
                      <div class="Ge6yU5">Thành tiền:</div>
                      <div class="TDMlX1">${bills.total}</div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        );
      }
    }
  }

  return body;
};

export default History;
