import Search from "./Search/Search";
import ToggleLoginBtn from "./ToggleLoginBtn";
import styles from "./navbar.module.css";

import { useState } from "react";

function Navbar() {
  const [visble, setVisble] = useState(true);
  const show = () => setVisble(true);
  const hide = () => setVisble(false);

  return (
    <nav
      className={`${styles.nav} shadow-sm navbar bg-body-tertiary fixed-top navbar-expand-sm`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
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
        <div
          className="offcanvas  offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Offcanvas
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
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Link
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
