import style from "./productscard.module.css";
import React, { useState, useEffect } from "react";
import { CartItem, toMoney } from "../../utilities/utils";
import { redirect, useNavigate } from "react-router";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  view?: number;
  sold?: number;
};
const ProductCard = React.forwardRef<HTMLDivElement, ProductProps>(
  function ProductCard(props: ProductProps, ref) {
    const [inCart, setInCart] = useState({} as CartItem);
    const redirect = useNavigate();
    useEffect(() => {
      const items = JSON.parse(
        localStorage.getItem("cart") || "[]"
      ) as CartItem[];
      for (let item of items) {
        if (item.id == props.id) {
          setInCart(item);
          return;
        }
      }
    }, []);

    return (
      <>
        <div
          ref={ref}
          className={`${style["card-hover"]} card position-positive mb-3`}
          onClick={(e) => {
            redirect("/product", {
              state: {
                id: props.id,
              },
            });
          }}
        >
          <img src={props.imgUrl} className={`card-img-top ${style.img}`} />
          <div className="card-body d-flex justify-content-between flex-column">
            <h6 className={`card-title ${style.title}`}>{props.name}</h6>
            <div
              className={`d-flex justify-content-between align-items-center ${style["box-footer"]}`}
            >
              <strong>
                {toMoney(props.price)} <b>VND</b>
              </strong>
              {inCart.id && (
                <div
                  className={`d-flex align-items-center gap-2 justify-content-center ${style["group-btn"]}`}
                >
                  In cart : {inCart.quantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ProductCard;
