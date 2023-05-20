import { useEffect, useState } from "react";
import { checkUserIdentity } from "../../../utilities/utils";
import { useNavigate } from "react-router";
import LoadingView from "../../LoadingView/LoadingView";

type AuthProps = {
  children: React.ReactNode;
};

function Auth({ children }: AuthProps) {
  const [isServerError, setIsServerError] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
  );
  const redirect = useNavigate();
  useEffect(() => {
    checkUserIdentity()
      .then((user) => {
        if (user.isAuthenticated) {
          setIsAuthorized(user.priority == 1);
        } else {
          redirect("/login");
        }
      })
      .catch((err) => {
        setIsServerError(true);
        redirect("/login");
      });
  });
  return (
    <>
      {isServerError && <div>Server is running into a problem</div>}
      {isAuthorized == false ? (
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          You are not authorized to access this information{" "}
          <button
            onClick={(e) => {
              redirect("/login");
            }}
            className="btn btn-secondary"
          >
            Login as Customer
          </button>{" "}
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Auth;
