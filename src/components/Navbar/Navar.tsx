import Sidebar from "../Sidebar/Sidebar";
import style from "./navbar.module.css"

function Navbar() {
  return (<nav className={`${style.nav}`}>
    <button>
      <i className="fa-solid fa-bars"></i>
    </button>
  </nav> );
}

export default Navbar;