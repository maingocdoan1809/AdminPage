import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./main.module.css";
import { useEffect, useState } from "react";
function Main() {
  return (
    <main className={` ${style.main}`}>
      <Navbar />
      <div className={`${style.maincontent}`}>
        <Content />
      </div>
      <Footer />
    </main>
  );
}

export default Main;
