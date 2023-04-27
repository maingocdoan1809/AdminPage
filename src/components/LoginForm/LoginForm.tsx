import React, { useEffect, useState } from "react";
import LabeledInput from "../ValidInput/LabeledInput";
import style from "./loginform.module.css";
import { BACKEND_URL } from "../../env";
import { Navigate, redirect, useNavigate } from "react-router";
import sha256 from "crypto-js/sha256";
export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [isLogginFail, setIsLogginFail] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token;
    if (token) {
      fetch(BACKEND_URL + `/login?token=${token}`, {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isAuthenticated) {
            navigate("/");
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            setIsLoggedIn(false);
          }
        });
      return;
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <>
      {isLoggedIn == false && (
        <div className={`${style.login}`}>
          <h2>Login</h2>
          <div>
            <LabeledInput
              identifier="username"
              placeholder="Username"
              type="text"
              callBack={(value) => {
                setIsLogginFail(false);
                setUsername(value);
              }}
              className={[style["top-border"]]}
              delay={0}
            />
            <LabeledInput
              identifier="password"
              placeholder="Password"
              type="password"
              callBack={(value) => {
                setIsLogginFail(false);

                setPassword(value);
              }}
              className={[style["bottom-border"]]}
              delay={0}
            />
          </div>

          {isLogginFail && (
            <div className="alert alert-warning">
              Your username or password is not correct
            </div>
          )}
          <div className="d-flex justify-content-between">
            <span>Forgot your password?</span>
            <span>
              <a href="">change</a>
            </span>
          </div>
          <button
            onClick={onLogging(
              username,
              password,
              () => {
                navigate("/");
              },
              setIsLogginFail
            )}
            className="btn btn-primary"
          >
            Login
          </button>
          <a href="/register" className="btn btn-outline-secondary">
            Or Sign up
          </a>
          <div className="text-secondary">
            @copyright: {new Date().getFullYear()}
          </div>
        </div>
      )}
      {isLoggedIn == undefined && <p>Authenticating</p>}
    </>
  );
}

function onLogging(
  username: string,
  password: string,
  navigae: () => void,
  fallBack: (param: any) => void
) {
  return (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    fetch(BACKEND_URL + "/login", {
      method: "POST",
      body: JSON.stringify({
        username: sha256(username).toString(),
        password: sha256(password).toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          localStorage.setItem("user", JSON.stringify(data));
          navigae();
        } else {
          fallBack(true);
        }
      });
  };
}
