import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Cart from "../Cart/Cart";
import DetailProduct from "../DetailProduct/DetailProduct";
import Error from "../Error/Error";
import History from "../History/History";
import Auth from "../Auth/Auth";
import Home from "../Home/Home";
import Sidebar from "../Sidebar/Sidebar";
import Rating from "../Rating/Rating";
import Payment from "../Payment/Payment";

const RouteList = () => {
  const location = useLocation();
  const router = [
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/product/:id",
      element: <DetailProduct />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/history",
      element: <History />,
    },
    {
      path: "/login",
      element: <Auth authRoute="login" />,
    },
    {
      path: "/register",
      element: <Auth authRoute="register" />,
    },
    {
      path: "/rating",
      element: <Rating />,
    },
    {
      path: "/success",
      element: <Payment />,
    },
  ];

  return (
    <>
      <div className="App-Body">
        <Sidebar />
        <div
          className="App-Content"
          style={
            ["/login", "/register"].includes(location.pathname)
              ? {
                  display: "flex",
                  justifyContent: "center",
                }
              : {}
          }
        >
          <div
            className="Content-Wrap"
            style={
              ["/login", "/register"].includes(location.pathname)
                ? {
                    display: "flex",
                    justifyContent: "center",
                  }
                : {}
            }
          >
            <Routes location={location} key={location.key}>
              {router.map((route, idx) => {
                return <Route path={route.path} element={route.element} />;
              })}
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteList;
