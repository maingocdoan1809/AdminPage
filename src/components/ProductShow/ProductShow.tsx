import style from "./productshow.module.css";
import React, { useState } from "react";
import { toMoney } from "../../utilities/utils";
import { ProductProps } from "../../type/ProductProps"
import Cart from "../Cart/Cart";

type ProductShowProps = {
  onAddToCart: (product: ProductProps) => void;
}

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
                {toMoney(props.price)}
              </small>
              <button className="btn btn-outline-primary btn-sm">
                <small>Add to cart</small>{" "}
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ProductShow;

