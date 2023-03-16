import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const TestNavbar = ({ activate }) => {
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Nav.Link
              className="nav-link active"
              as={Link}
              to="/productmanage"
              active={activate === "productmanage" ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              className="nav-link active"
              as={Link}
              to="/bills"
              active={activate === "bills" ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-file"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              Orders
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              className="nav-link active"
              as={Link}
              to="/view"
              active={activate === "view" ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-file-text"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Revenue
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              className="nav-link active"
              as={Link}
              to="/users"
              active={activate === "users" ? true : false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{width: '24px', height: '24px', filter: 'invert(78%) sepia(29%) saturate(431%) hue-rotate(112deg) brightness(88%) contrast(83%)'}} viewBox="0 0 24 24">
                <g id="user-edit">
                  <path d="M10.56,11.87a3.75,3.75,0,1,1,3.75-3.75A3.76,3.76,0,0,1,10.56,11.87Zm0-6a2.25,2.25,0,1,0,2.25,2.25A2.25,2.25,0,0,0,10.56,5.87Z"/>
                  <path d="M3.56,18.87a.75.75,0,0,1-.75-.75c0-4.75,5.43-4.75,7.75-4.75.72,0,1.36,0,1.94.07a.75.75,0,0,1,.69.8.76.76,0,0,1-.81.69c-.54,0-1.14-.06-1.82-.06-5.18,0-6.25,1.3-6.25,3.25A.74.74,0,0,1,3.56,18.87Z"/><path d="M12.67,19.63a.75.75,0,0,1-.53-.22.72.72,0,0,1-.22-.59l.16-1.92a.75.75,0,0,1,.21-.47l5.52-5.52a2.06,2.06,0,0,1,2.8,0,2,2,0,0,1,.58,1.44,1.86,1.86,0,0,1-.53,1.33l-5.52,5.52a.74.74,0,0,1-.46.22l-1.94.18Zm1.94-.93h0Zm-1.06-1.41-.06.76.78-.07,5.33-5.33a.39.39,0,0,0,.09-.27.59.59,0,0,0-.14-.38.57.57,0,0,0-.68,0Z"/>
                </g>
              </svg>
              Users
            </Nav.Link>
          </li>
          <li className="nav-item">
            <Nav.Link
              className="nav-link active"
              as={Link}
              to="/staffs"
              active={activate === "staffs" ? true : false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{width: '24px', height: '24px', filter: 'invert(78%) sepia(29%) saturate(431%) hue-rotate(112deg) brightness(88%) contrast(83%)'}} viewBox="0 0 24 24">
                <g id="user-edit">
                  <path d="M10.56,11.87a3.75,3.75,0,1,1,3.75-3.75A3.76,3.76,0,0,1,10.56,11.87Zm0-6a2.25,2.25,0,1,0,2.25,2.25A2.25,2.25,0,0,0,10.56,5.87Z"/>
                  <path d="M3.56,18.87a.75.75,0,0,1-.75-.75c0-4.75,5.43-4.75,7.75-4.75.72,0,1.36,0,1.94.07a.75.75,0,0,1,.69.8.76.76,0,0,1-.81.69c-.54,0-1.14-.06-1.82-.06-5.18,0-6.25,1.3-6.25,3.25A.74.74,0,0,1,3.56,18.87Z"/><path d="M12.67,19.63a.75.75,0,0,1-.53-.22.72.72,0,0,1-.22-.59l.16-1.92a.75.75,0,0,1,.21-.47l5.52-5.52a2.06,2.06,0,0,1,2.8,0,2,2,0,0,1,.58,1.44,1.86,1.86,0,0,1-.53,1.33l-5.52,5.52a.74.74,0,0,1-.46.22l-1.94.18Zm1.94-.93h0Zm-1.06-1.41-.06.76.78-.07,5.33-5.33a.39.39,0,0,0,.09-.27.59.59,0,0,0-.14-.38.57.57,0,0,0-.68,0Z"/>
                </g>
              </svg>
              Staffs
            </Nav.Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>User {user && user.username} Experience</span>
          <a className="d-flex align-items-center text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-plus-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-file-text"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TestNavbar;
