import React, { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BillContext } from "../../contexts/BillContext";
// import deBounce from "../../utils/deBounce";
// import { AuthContext } from "../../Context/AuthContext";
// import { ProductContext } from "../../Context/ProductContext";
import Logo from "../../image/logo.png";
import deBounce from "../../utils/deBounce";

const Header = () => {
  const { getBills } = useContext(BillContext);

  const [query, setQuery] = useState("");

  const updateDebounce = useCallback(
    deBounce((text) => {
      getBills()
      // if (text.length !== 0) filterProducts(text);
      // else getProducts();
    }, 250),
    []
  );

  const onChange = (event) => {
    setQuery(event.target.value);
    updateDebounce(event.target.value);
  };
  const {
    authState: { authLoading, isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);
  return (
    <div className="App-header">
      <div className="Header-Logo">
        <a href="/">
          <img src={Logo} alt="F8" />
        </a>
        <h4 className="Header-LogoHeading">Shop Uy Tín</h4>
      </div>
      <div className="Header-Body d-flex-center">
        <div>
          <div className="Search-Wrapper d-flex-center" aria-expanded="false">
            <div className="Search-Icon"></div>
            <input
              className="Search-Input"
              spellcheck="false"
              placeholder="Tìm kiếm đơn hàng, ..."
              value={query}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className="Header-Action">
        <div id="header-actions-portal"></div>
        {isAuthenticated ? (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.username}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className="dropdown-item"
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
          <Link
            to={"/login"}
            className="Header-Loginbtn"
            style={{ textDecoration: "none" }}
          >
            Đăng nhập
          </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
