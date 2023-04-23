import { useState } from "react";
import ValidInput from "../ValidInput/ValidInput";
import style from "./registerform.module.css";
type RegisterStateUnit = {
  value: string;
  isValid?: boolean | undefined;
};
type RegisterState = {
  fullname: RegisterStateUnit;
  username: RegisterStateUnit;
  password: RegisterStateUnit;
  email: RegisterStateUnit;
};

function RegisterForm() {
  const [stateForm, setStateForm] = useState();
  return (
    <form className={`p-3 ${style.margin}`}>
      <div>
        <img src="" alt="" />
        <h2>Register now!</h2>
      </div>
      <hr />
      <div>
        <label htmlFor="fullname">Full name</label>
        <ValidInput
          callBack={(value) => {}}
          identifier="fullname"
          className={[style.focus]}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <ValidInput
          callBack={(value) => {}}
          identifier="username"
          className={[style.focus]}
        />
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="password">Password</label>
          <ValidInput
            callBack={(value) => {}}
            identifier="password"
            className={[style.focus]}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="retypepassword">Retype Password</label>
          <ValidInput
            callBack={(value) => {}}
            identifier="retypepassword"
            className={[style.focus]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="email">Email</label>
          <ValidInput
            callBack={(value) => {}}
            identifier="email"
            className={[style.focus]}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="phonenumber">Phone number</label>
          <ValidInput
            callBack={(value) => {}}
            identifier="phonenumber"
            className={[style.focus]}
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-outline-primary w-100">
          Submit
        </button>
      </div>
      <div className="d-flex justify-content-end">
        <a href="/login">Back to login</a>
      </div>
    </form>
  );
}

export default RegisterForm;
