import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./pages/Error/Error";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Unauthenticated from "./pages/Error/Unauthenticated";
import Profile from "./components/Profile/Profile";
import ServerError from "./pages/Error/ServerError";
import AdminPage from "./pages/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import SearchPage from "./pages/SearchPage/SearchPage";
import Layout from "./layouts/CustomerLayout/Layout";
import AdminPageContext from "./contexts/AdminPageContext/AdminPageContext";

import UserContext from "./contexts/UserContext/UserContext";
import AddProduct from "./components/AdminComponents/Product/AddProduct/AddProduct";
import Products from "./components/AdminComponents/Product/Products/Products";
import Categories from "./components/AdminComponents/Category/Categories/Categories";
import Orders from "./components/AdminComponents/Order/Orders/Orders";
import ProductDetail from "./components/AdminComponents/Product/ProductDetail/ProductDetail";
import ClientProductDetail from "./components/ProductDetail/ProductDetail";
function App() {
  return (
    <UserContext>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauth" element={<Unauthenticated />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/product"
              element={
                <Layout>
                  <ClientProductDetail />
                </Layout>
              }
            />
            <Route path="/servererror" element={<ServerError />} />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            {/* Admin */}
            <Route path="/admin">
              <Route
                index
                path=""
                element={<Navigate to={"/admin/products"} />}
              />
              <Route path="products">
                <Route
                  index
                  path=""
                  element={<AdminPage children={<Products />} />}
                />
                <Route
                  element={<AdminPage children={<ProductDetail />} />}
                  path=":id"
                />
                R R
              </Route>
              <Route path="categories">
                <Route
                  path=""
                  element={<AdminPage children={<Categories />} />}
                />
              </Route>
              <Route path="orders">
                <Route path="" element={<AdminPage children={<Orders />} />} />
              </Route>
              <Route
                path="profile"
                element={<AdminPage children={<Profile />} />}
              />
            </Route>
            <Route path="/*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext>
  );
}

export default App;
