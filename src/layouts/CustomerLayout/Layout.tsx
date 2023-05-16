import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { LayoutProps } from "../../utilities/utils";
import style from "./layout.module.css";

function Layout({ children }: LayoutProps) {
  return (
    <main className={` ${style.main}`}>
      <Navbar />
      <div className={`${style.maincontent}`}>{children}</div>
      <Footer />
    </main>
  );
}

export default Layout;
