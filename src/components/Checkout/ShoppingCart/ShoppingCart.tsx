import { useEffect, useState } from "react";
import { CartItem, Product, toMoney } from "../../../utilities/utils";
import style from "./shoppingcart.module.css";
import { CART_KEY } from "../../../env";
import { useCart } from "../../../contexts/CartContext/CartContext";
function ShoppingCart() {
  const [cartItems, setCartItems] = useCart();
  return (
    <div className="col-md-5 col-lg-4 order-md-last">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">Your cart</span>
        <span className="badge bg-primary rounded-pill">
          {cartItems.length}
        </span>
      </h4>
      <ul className="list-group mb-3">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item ">
            <div className="d-flex justify-content-between flex-column gap-3">
              <h6 className="my-0">{item.name}</h6>
              <div className="d-flex gap-2 position-relative">
                <div
                  className={`${style.remove}`}
                  onClick={() => {
                    item.quantity = 0;
                    setCartItems(
                      cartItems.filter((value) => {
                        return value.id != item.id;
                      })
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </div>
                <img src={item.imgUrl} width={"30%"} alt="Ảnh sản phẩm" />
                <div className="d-flex flex-column gap-2">
                  <small>
                    {item.colorName}
                    <span
                      className="d-inline-block rounded-circle p-1 ms-2"
                      style={{
                        backgroundColor: item.colorName,
                        border: "1px solid grey",
                      }}
                    ></span>{" "}
                    - Size : {item.size}
                  </small>
                  <b>{toMoney(item.promotedPrice)}</b>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className={`${style["btn-group"]}`}>
                <button
                  onClick={(e) => {
                    item.quantity -= 1;
                    setCartItems(
                      cartItems.filter((value) => {
                        return value.quantity > 0;
                      })
                    );
                  }}
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={(e) => {
                    item.quantity += 1;
                    setCartItems([...cartItems]);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between">
          <span>Sum (VND)</span>
          <strong>
            {toMoney(
              cartItems.reduce((pre, curr) => {
                return pre + curr.originalPrice * curr.quantity;
              }, 0)
            )}
          </strong>
        </li>
      </ul>
    </div>
  );
}

export default ShoppingCart;
