import { useEffect } from "react";
import style from "./productshow.module.css";
import React from "react";
import { toMoney } from "../../utilities/utils";
type ProductProps = {
  name: string;
  imgUrl: string;
  price: number;
  id: string;
  view?: number;
  sold?: number;
};
const ProductShow = React.forwardRef<HTMLDivElement, ProductProps>(
  function ProductShow(props: ProductProps, ref) {
    return (
      <>
        <div
          ref={ref}
          className={`${style["card-hover"]} card position-positive h-100 mb-3`}
        >
          <img src={props.imgUrl} className={`card-img-top ${style.img}`} />
          <div className="card-body">
            <h6 className="card-title">{props.name}</h6>

            <div
              className={`d-flex justify-content-between align-items-center ${style["box-footer"]}`}
            >
              <small>
                {toMoney(props.price)} <b>VND</b>
              </small>
              <a href="" className="btn btn-outline-primary btn-sm">
                <small>Add to cart</small>{" "}
                <i className="fa-regular fa-plus"></i>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ProductShow;
