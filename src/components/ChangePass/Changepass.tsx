import PasswordInput from "../ValidInput/PasswordInput";
import ValidInput from "../ValidInput/ValidInput";

function ChangepassBox() {
  return (
    <>
      <div className="">
        <label className="form-label" htmlFor="changepass">
          Enter your password
        </label>
        <PasswordInput callBack={() => {}} identifier="changepass" />
      </div>
      <div className="">
        <label className="form-label" htmlFor="newpass">
          Enter new password
        </label>
        <PasswordInput callBack={() => {}} identifier="newpass" />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="confirmnewpass">
          Confirm new password
        </label>
        <PasswordInput callBack={() => {}} identifier="confirmnewpass" />
      </div>
      <div>
        <button className="btn btn-outline-danger btn-sm w-100">Change</button>
      </div>
    </>
  );
}

export default ChangepassBox;
