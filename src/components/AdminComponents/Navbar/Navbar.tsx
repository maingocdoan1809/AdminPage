import { useRef } from "react";
import style from "./navbar.module.css";
import ToggleLoginBtn from "../../Navbar/ToggleLoginBtn";
function Navbar() {
  const ulRef = useRef<HTMLUListElement>(null!);
  return (
    <>
      <div className={`${style.nav} d-flex flex-shrink-0 text-bg-dark`}>
        <span
          onClick={() => {
            ulRef.current.classList.remove(style["fade-custom"]);
            ulRef.current.classList.add(style["show-custom"]);
          }}
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <span className="fs-4">Sidebar</span>
        </span>
        <hr />
        <ul
          className={`nav nav-pills flex-column mb-auto ${style.ul}`}
          ref={ulRef}
        >
          <li className={`nav-item d-flex w-100 justify-content-end`}>
            <span
              className={`${style["btn-toggle"]} mb-5 text-end`}
              onClick={(e) => {
                ulRef.current.classList.remove(style["show-custom"]);
                ulRef.current.classList.add(style["fade-custom"]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2" />
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#table" />
              </svg>
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-layout-wtf me-2"
                viewBox="0 0 16 16"
              >
                <path d="M5 1v8H1V1h4zM1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm13 2v5H9V2h5zM9 1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9zM5 13v2H3v-2h2zm-2-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3zm12-1v2H9v-2h6zm-6-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9z" />
              </svg>
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle" />
              </svg>
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <ToggleLoginBtn />
      </div>
    </>
  );
}

export default Navbar;
