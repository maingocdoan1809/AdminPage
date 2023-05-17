import SearchBar from "../../components/Navbar/Search/Search";
import ToggleLoginBtn from "./ToggleLoginBtn";
import styles from "./navbar.module.css";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { ProductProps } from "../../type/ProductProps";

const Navbar: React.FC = () => {

  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    navigate('/checkout');
  }

  return (
    <nav
      className={`${styles.nav} shadow-sm navbar bg-body-tertiary sticky-top navbar-expand-sm`}
    >
      <div className="container-fluid">
        <div className={`position-relative ${styles["flex-end"]}`}>
          <a
            className="navbar-toggler navbar-brand"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            Menu
          </a>
        </div>
        <div
          className="offcanvas  offcanvas-end "
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 d-flex justify-content-between">
              <li className="nav-item">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      aria-current="page"
                      onClick={(e) => {
                        e.stopPropagation();
                        redirect("/");
                      }}
                    >
                      All
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Men
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Woman
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className={`d-flex justify-content-center align-items-center ${styles["menu-2"]}`}>
          <div className={`${styles["search-bar"]}`}>
            <SearchBar />
          </div>
          <div className={`d-flex justify-content-center align-items-center ${styles["menu-2"]}`}>
            <a href="" className="w-50 h-50 me-3" onClick={handleCheckoutClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bag w-75 h-75"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </a>
            {/* <a className={`fa-solid fa-cart-shopping fa-lg ${styles["shopping-cart"]}`} style={{ color: "#000000" }} onClick={handleCheckoutClick}></a> */}
            <ToggleLoginBtn />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
