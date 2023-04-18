import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { useState } from "react";

import styles from "./search.module.css"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Search() {
    return (
        <Tippy content="Tìm kiếm">
            <li>
                <div className={cx("search")}>
                    <div className={cx("input-search")}>
                        <input placeholder='Tìm kiếm' spellCheck={false} />
                        <div className={cx("clear-search")}>
                            <i className={`fa-solid fa-circle-xmark `}></i>
                        </div>
                        
                    </div>   
                    <div className={cx("search-icon")}>
                        <i className={`fa-solid fa-magnifying-glass`}></i>
                    </div> 
                    
                </div>
            </li>
        </Tippy>
    );
}

export default Search;