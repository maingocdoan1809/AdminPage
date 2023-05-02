import Search from "./Search/Search";
import ToggleLoginBtn from "./ToggleLoginBtn";
import styles from "./navbar.module.css";

import { useState } from "react";

function Navbar() {
  return (
    <nav
      className={`${styles.nav} shadow-sm navbar bg-body-tertiary sticky-top navbar-expand-sm`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Menu
        </a>
        <div className="position-relative">
          <button className={`btn btn-primary ${styles["cart-btn"]}`}>
            Your Cart
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
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
                    <a className="nav-link active" aria-current="page" href="#">
                      All
                    </a>
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
                    <Search />
                  </li>
                  <ToggleLoginBtn />
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
