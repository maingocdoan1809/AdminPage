import { useEffect, useState } from "react";
import styles from "./search.module.css";
function Search() {
  return (
    <>
      <div className={`nav-link ${styles["collapse-container"]}`}>
        <a
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#search-collapse"
          aria-expanded="false"
          aria-controls="search-collapse"
        >
          Search
        </a>
        <div className={`${styles["search-collapse"]} search-box`}>
          <div className="collapse" id="search-collapse">
            <div className="card card-body">
              <div className="d-flex justify-content-end flex-column">
                <input
                  type="search"
                  className="form-control mb-3"
                  placeholder="Type something that interests you..."
                />

                <button>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
