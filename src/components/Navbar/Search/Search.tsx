import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { useState } from "react";

import styles from "./search.module.css"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Search() {
    return (
        <TippyHeadless
            render={attrs => (
                <div className={cx("search-reasult")} tabIndex={-1} {...attrs}>
                    My tippy box
                </div>
            )}

        >
            <li>
                <div className={cx("search")}>
                    <div className={cx("input-search")}>
                        <input placeholder='Tìm kiếm' spellCheck={false} />
                        <button className={cx("clear-search")}>
                            <i className={`fa-solid fa-circle-xmark ${cx('clear')}`}></i>
                        </button>
                    </div>
                    <button className={cx("search-icon")}>
                        <i className={`fa-solid fa-magnifying-glass`}></i>
                    </button>
                </div>
            </li>
        </TippyHeadless>
    );
}

export default Search;