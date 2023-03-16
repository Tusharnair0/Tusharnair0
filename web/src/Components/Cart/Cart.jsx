import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillContext } from "../../Context/BillContext";
import { ProductContext } from "../../Context/ProductContext";

import CartItem from "./CartItem";

const Cart = () => {
  const navigator = useNavigate();
  const {
    productState: { productSelect, productLoading, cart },
    getCartProduct,
    removeCart,
  } = useContext(ProductContext);

  const { createBill } = useContext(BillContext);
  let body = null;
  const items = JSON.parse(localStorage.getItem("items")) || {};

  const [productList, setProductList] = useState(cart || []);

  let total = 0;

  const orderCart = async () => {
    const products = cart.map((value, index) => {
      return {
        ...value,
        quantity: items[value._id],
      };
    });
    const response = await createBill(products, total);
    if (response.success) {
      removeCart();
      navigator("/", { replace: true });
    }
  };

  useEffect(() => {
    const items_keys = Object.keys(items);
    console.log(items);
    if (items_keys.length !== 0) {
      getCartProduct(items_keys);
    }
  }, [productLoading, productList]);


  getData();

  async function getData() {
    if (productLoading) {
      body = (
        <div>
          <h2>No Product Found.</h2>
        </div>
      );
    } else {
      if (cart == null || cart == undefined || cart.length === 0) {
        body = (
          <div>
            <h2>No Product Found.</h2>
          </div>
        );
      } else {
        total = cart.reduce((sum, ele) => {
          return sum + ele.price * parseInt(items[ele._id]);
        }, 0);
        body = (
          <>
            {cart == null || cart == undefined ? (
              <></>
            ) : cart.length == 0 ? (
              <h2>Empty cart</h2>
            ) : (
              cart.map((products, idx) => {
                return (
                  <CartItem
                    product={products}
                    setProductList={setProductList}
                  />
                );
              })
            )}
            <div className="d-flex flex-row-reverse mt-4">
              <button className="btn btn-success" onClick={orderCart}>
                Mua Hàng
              </button>
              <div className="V9JZ" style={{ fontSize: "20px" }}>
                <span>${total}</span>
              </div>
            </div>
          </>
        );
      }
    }
  }
  return (
    <>
      <div className="Product-Title">
        <h1>Your Cart</h1>
      </div>
      {body}
    </>
  );
};

export default Cart;
