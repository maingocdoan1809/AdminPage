import Navbar from "../../components/AdminComponents/Navbar/Navbar";
import style from "./admin.module.css";
function AdminPage() {
  return (
    <>
      <div className={`d-flex position-relative ${style.admin}`}>
        <Navbar />
        <div className={`${style.main} flex-grow-1`}>Main</div>
      </div>
    </>
  );
}

export default AdminPage;
