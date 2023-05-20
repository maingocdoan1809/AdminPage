import { useLocation } from "react-router";
import Checkout from "../../components/Checkout/Checkout";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./main.module.css";
import { useEffect, useState } from "react";
import Layout from "../../layouts/CustomerLayout/Layout";
function Main() {
  const location = useLocation();
  return (
    <Layout>
      <Content category={location.state ? location.state.category : "0"} />
    </Layout>
  );
}

export default Main;
