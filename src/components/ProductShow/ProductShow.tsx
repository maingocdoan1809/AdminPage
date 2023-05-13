import style from "./productshow.module.css";
import React, { useState } from "react";
import { toMoney } from "../../utilities/utils";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  view?: number;
  sold?: number;
};

const ProductShow = React.forwardRef<HTMLDivElement, ProductProps>(
  function ProductShow(props: ProductProps, ref) {
    const [cartItems, setCartItems] = useState<ProductProps[]>([]);
    const addToCartHandler = () => {
      setCartItems((prevCartItems: any) => [...prevCartItems, props]);
      console.log("Thêm sản phẩm vào giỏ hàng:", props.name);
    };
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
              <a href="" className="btn btn-outline-primary btn-sm" onClick={addToCartHandler}>
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

