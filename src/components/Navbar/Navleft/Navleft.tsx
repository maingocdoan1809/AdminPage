import classNames from "classnames/bind";
import styles from "./navleft.module.css"

const cx = classNames.bind(styles)

function Navlef() {
    return (
        <div className={`${cx("nav-left")}`}>
                <ul>
                    <li>
                        <a href="#">Trang chủ</a>
                    </li>
                    <li>
                        <a href="#">Sản phẩm</a>
                    </li>
                    <li>
                        <a href="#">Bộ sưu tập</a>
                    </li>
                </ul>
        </div>
    );
}

export default Navlef;