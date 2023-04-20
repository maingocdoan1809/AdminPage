import { useState } from "react";
import LabeledInput from "../ValidInput/LabeledInput";
import style from "./loginform.module.css";
export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form className={`${style.login}`}>
        <h2>Login</h2>
        <div>
          <LabeledInput
            identifier="username"
            placeholder="Username"
            type="text"
            callBack={(value) => {
              setUsername(value);
            }}
          />
          <LabeledInput
            identifier="password"
            placeholder="Password"
            type="password"
            callBack={(value) => {
              setPassword(value);
            }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <span>Forgot your password?</span>
          <span>
            <a href="">change</a>
          </span>
        </div>
        <button className="btn btn-primary">Login</button>
        <button className="btn btn-outline-secondary">Or Sign up</button>
        <div className="text-secondary">
          @copyright: {new Date().getFullYear()}
        </div>
      </form>
    </>
  );
}
