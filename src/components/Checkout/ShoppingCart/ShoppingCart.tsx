import { useState } from "react";
import { toMoney } from "../../../utilities/utils";

type ProductProps = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    view?: number;
    sold?: number;
};

function ShoppingCart() {
    const [cartItems, setCartItems] = useState<ProductProps[]>([]);
    return (
        <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Giỏ Hàng</span>
                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
                {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 className="my-0">{item.name}</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">{toMoney(item.price)}</span>
                    </li>
                ))}
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">−$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng cộng (VND)</span>
                    <strong>$20</strong>
                </li>
            </ul>
            <form className="card p-2">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo code" />
                    <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
            </form>
        </div>
    );
}

export default ShoppingCart;