import React from "react";
import { ProductProps } from "../../type/ProductProps";
import { toMoney } from "../../utilities/utils";

interface CartProps {
    cartItems: ProductProps[];
   
}


const CartItems: React.FC<CartProps> = ({ cartItems }) => {
    const totalPrice = cartItems.reduce(
        (total, product) => total + product.price,
        0
    );
    
    return (
        <div className="card">
            <div className="card-header">Cart</div>
            <ul className="list-group list-group-flush">
                {cartItems.map((product) => (
                    <li className="list-group-item" key={product.id}>
                        <div className="row">
                            <div className="col-8">
                                <h6 className="mb-0">{product.name}</h6>
                                <small>{toMoney(product.price)}</small>
                            </div>
                            <div className="col-4 text-end">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="card-footer text-end">
                Total: <strong>{toMoney(totalPrice)}</strong>
            </div>
        </div>
    );
};

export default CartItems;
