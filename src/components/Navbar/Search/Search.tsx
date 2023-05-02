import { useEffect, useState } from "react";
import styles from "./search.module.css";
function Search() {
  return (
    <>
      <div className={`nav-link ${styles["collapse-container"]}`}>
        <div
          data-bs-toggle="collapse"
          data-bs-target="#search-collapse"
          aria-expanded="false"
          aria-controls="search-collapse"
          className={`${styles["search-btn"]}`}
        >
          Search
        </div>
        <div className={`${styles["search-collapse"]} search-box`}>
          <div className="collapse" id="search-collapse">
            <div className="card card-body">
              <div className="d-flex justify-content-end flex-column">
                <input
                  type="search"
                  className="form-control mb-3"
                  placeholder="Type something that interests you..."
                />
                <div className="mb-3">
                  <label htmlFor="range">Price:</label>
                  <div className="d-flex gap-3 justify-content-center align-items-center">
                    <span>From: </span>
                    <input type="range" name="range" className="form-range" />
                    <span>To: </span>
                  </div>
                </div>
                <div className="d-flex mb-3 justify-content-between align-items-center">
                  <label htmlFor="color">Color</label>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                  >
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck1"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck1"
                    >
                      Red
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck2"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck2"
                    >
                      Green
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck3"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck3"
                    >
                      Blue
                    </label>
                  </div>
                </div>
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
