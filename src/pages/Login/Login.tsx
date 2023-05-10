import { useEffect, useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}
export default Login;
