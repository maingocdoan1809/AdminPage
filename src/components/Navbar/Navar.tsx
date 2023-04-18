import styles from "./navbar.module.css"
import classNames from "classnames/bind";
import Navlef from "./Navleft/Navleft";
import Search from "./Search/Search"

import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { useState } from "react";

const cx = classNames.bind(styles)


function Navbar() {

  const [visble, setVisble] = useState(true);
  const show = () => setVisble(true);
  const hide = () => setVisble(false);

  return (
    <nav className={`${styles.nav}`} >
      <ul className={cx("box-item")}>
        <TippyHeadless
          interactive
          visible={visble}
          onClickOutside={hide}
          render={attrs => (
            <div className="box" tabIndex={-1} {...attrs}>
              <Navlef/>
            </div>
          )}
        >
          <button className={`${cx("toggle")}`} onClick={visble ? hide : show}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </TippyHeadless>


        <li>
          <ul className={`${cx("nav-item")} ${cx("nav-item-left")}`} >
            <li>
              <a href="#">
                <img src="../../src/images/logo/log.png"
                  alt=""
                  width={"44px"}
                  height={"44px"} />
              </a>
            </li>
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Sản phẩm</a></li>
            <li><a href="#">Bộ sưu tập</a></li>
          </ul>
        </li>
        <li>
          <ul className={`${cx("nav-item")}`} >

            <Search />
            <Tippy content="Giỏ hàng">
              <li><a href="#"><i className="fa-solid fa-cart-shopping"></i></a></li>
            </Tippy>
            <Tippy content={<span>Profile</span>}>
              <li><a href="#"><i className="fa-solid fa-user"></i></a></li>
            </Tippy>

          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;