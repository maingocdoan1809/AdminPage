import SearchBar from "../../components/Navbar/Search/Search";
import ToggleLoginBtn from "./ToggleLoginBtn";
import styles from "./navbar.module.css";
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from "react";
import Cart from "../Cart/Cart";
import { ProductProps } from "../../type/ProductProps";


const Navbar: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);

  return (
    <nav
      className={`${styles.nav} shadow-sm navbar bg-body-tertiary sticky-top navbar-expand-sm`}
    >
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">
          Menu
        </a> */}
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
          className="offcanvas  offcanvas-end"
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
          <div className="offcanvas-body ">
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
              <li className="nav-item">
                <ul className="navbar-nav">
                  <li className="nav-item">
                  <SearchBar onSearch={(query, color, minPrice, maxPrice) => console.log(query, color, minPrice, maxPrice)} />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <Cart cartItems={cartItems} />
          <ToggleLoginBtn />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
