import style from "./productshow.module.css";
import React, { useState } from "react";
import { toMoney } from "../../utilities/utils";
import { redirect, useNavigate } from "react-router";
import { ProductProps } from "../../type/ProductProps";

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  color: string;
  hexCode: string;
  imgUrl: string;
  view?: string;
}
// interface Props {Props
//   onAddToCart: (product: Product) => void;
// }
const ProductShow = React.forwardRef<HTMLDivElement, Product>(
  function ProductShow(props: Product, ref) {
    const redirect = useNavigate();

    // const [cartItems, setCartItems] = useState<ProductProps[]>([]);
    // const addToCart = (product: ProductProps) => {
    //   setCartItems([...cartItems, product]);
    // };
    // // const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // //   e.stopPropagation();
    // //   if (props.onAddToCart) {
    // //     props.onAddToCart(props);
    // //   }
    // // };
    
    return (
      <>
        <div>
          <div
            ref={ref}
            className={`${style["card-hover"]} card position-positive h-100 mb-3`}
            onClick={(e) => {
              redirect("/product", {
                state: {
                  id: props.id,
                },
              });
            }}
          >
            <img src={props.imgUrl} className={`card-img-top ${style.img}`} />
            <div className="card-body">
              <h6 className="card-title">{props.name}</h6>
              <div className={`d-flex justify-content-between align-items-center ${style["box-footer"]}`}>
                <small>
                  {toMoney(props.price)} <b>VND</b>
                </small>
              </div>
            </div>
          </div>
          <button
            className="btn btn-outline-primary btn-sm"
            // onClick={handleAddToCart}
          >
            <small>Add to cart</small>{" "}
            <i className="fa-regular fa-plus"></i>
          </button>
        </div>

      </>
    );
  }
);

export default ProductShow;
