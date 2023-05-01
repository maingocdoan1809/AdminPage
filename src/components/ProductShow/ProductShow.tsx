import { useEffect } from "react";
import style from "./productshow.module.css";
import React from "react";
type ProductProps = {};
const ProductShow = React.forwardRef<HTMLDivElement, ProductProps>(
  function ProductShow(props: ProductProps, ref) {
    return (
      <>
        <div ref={ref} className="card position-positive h-100 mb-3">
          <img
            src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F1e%2Fbd%2F1ebd58a1b0df171671868a58d7cd14b25dee6fd8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
            className={`card-img-top ${style.img}`}
          />
          <div className="card-body">
            <h6 className="card-title">Oxford shirt</h6>
            <small>$599</small>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </>
    );
  }
);

export default ProductShow;
