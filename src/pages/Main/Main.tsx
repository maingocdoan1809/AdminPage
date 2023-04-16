import Content from "../../components/Content/Content";
import Navbar from "../../components/Navbar/Navar";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./main.module.css";
function Main() {
  return (
    <main className={`${style.main}`}>
      <Navbar />
      <div className={`${style.maincontent}`}>
        {/* <Sidebar /> */}
        <Content />
      </div>
    </main>
  );
}

export default Main;
