import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router";
function ToggleLoginBtn() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const redirect = useNavigate();
  const [userName, setUserName] = useState("anonymous");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "{}");
    if (data.isAuthenticated) {
      setUserName(data.fullname);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  });
  return (
    <>
      <li className="nav-item dropdown dropstart ">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          User
        </a>

        <ul className={`dropdown-menu ${styles.dropdown}`}>
          {isUserLoggedIn ? (
            <>
              <li>
                <div
                  onClick={(e) => {
                    localStorage.clear();
                    redirect("/");
                  }}
                  className="dropdown-item"
                >
                  Logout
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="d-flex justify-content-center">
                <small>
                  <b>{userName}</b>
                </small>
              </li>
            </>
          ) : (
            <li>
              <div
                onClick={(e) => {
                  redirect("/login");
                }}
                className="dropdown-item"
              >
                Login
              </div>
            </li>
          )}
        </ul>
      </li>
    </>
  );
}

export default ToggleLoginBtn;
