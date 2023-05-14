import { useEffect, useState } from "react";
import { ProductProps } from "../../type/ProductProps"
import styles from "./Cart.module.css"
import { toMoney } from "../../utilities/utils";
import CartItems from "./CartItems";

interface CartProps {
    cartItems: ProductProps[];
}

function Cart(props: CartProps) {
    const { cartItems } = props;

    useEffect(() => {
        console.log("Cart items have changed:", cartItems);
    }, [cartItems]);
    return (
        <>
            <a className="w-50 h-50 me-3" data-bs-toggle="collapse"
                data-bs-target="#cart-collapse"
                aria-expanded="false"
                aria-controls="cart-collapse"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag w-75 h-75"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
            </a>
            <div className={`${styles["cart-collapse"]} cart-box`}>
                <div className="collapse" id="cart-collapse">
                    <div className="card card-body">
                        <h2>Giỏ hàng của bạn</h2>
                        <div className="d-flex justify-content-end flex-column">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Cart;
