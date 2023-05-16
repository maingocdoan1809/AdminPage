import { useEffect, useState } from "react";
import Navbar from "../../components/AdminComponents/Navbar/Navbar";
import style from "./admin.module.css";
import { useNavigate } from "react-router";
import LoadingView from "../../components/LoadingView/LoadingView";
import { EAdminPage, checkUserIdentity } from "../../utilities/utils";
import Error from "../Error/Error";
import AddProduct from "../../components/AdminComponents/Product/AddProduct/AddProduct";
import Products from "../../components/AdminComponents/Product/Products/Product";
import Categories from "../../components/AdminComponents/Category/Categories/Categories";
import Layout from "../../layouts/AdminLayout/Layout";
import { useAdminPageContext } from "../../contexts/AdminPageContext/AdminPageContext";
import Profile from "../../components/Profile/Profile";
import Orders from "../../components/AdminComponents/Order/Orders/Orders";

function AdminPage() {
  const [page, setPage] = useAdminPageContext();
  const redirect = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  useEffect(() => {
    checkUserIdentity()
      .then((user) => {
        if (user.isAuthenticated && user.priority == 1) {
          setIsAuthenticating(false);
        } else {
          redirect("/login");
        }
      })
      .catch((err) => {
        setIsServerError(true);
      });
  });
  return (
    <>
      {isServerError && <div>Server is running into a problem</div>}
      {isAuthenticating == true ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center flex-column">
          <LoadingView />
        </div>
      ) : (
        <Layout>
          {page == EAdminPage.PRODUCT && <Products />}
          {page == EAdminPage.PROFILE && <Profile />}
          {page == EAdminPage.ORDER && <Orders />}
          {page == EAdminPage.CATEGORY && <Categories />}
        </Layout>
      )}
    </>
  );
}

export default AdminPage;
