import { SetStateAction, useEffect, useState } from "react";
import { toMoney } from "../../../utilities/utils";
import { ProductProps } from "../../../type/ProductProps";
import ProductShow from "../../ProductShow/ProductShow";
import styles from "./ShoppingCart.module.css"

type SelectedSize = {
    productId: string;
    size: string;
}
function ShoppingCart() {

    const [cartItems, setCartItems] = useState<ProductProps[]>([]);
    const [a, setA] = useState<ProductProps[]>([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems]);

    const [selectedColor, setSelectedColor] = useState<{ [productId: string]: string }>({});


    const handleColorChange = (color: string, productId: string) => {
        setSelectedColor((prevSelectedColor) => {
            return {
                ...prevSelectedColor,
                [productId]: color
            };
        });

        setSelectedSizes((prevSelectedSizes) => {
            // Cập nhật selectedSizes ở đây dựa trên màu đã chọn và sản phẩm có productId tương ứng
            return {
                ...prevSelectedSizes,
                [productId]: [] // Đặt lại mảng selectedSizes cho sản phẩm đã chọn màu mới
            };
        });
    };


    const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string[] }>({});
    const [selectedSizeQuantity, setSelectedSizeQuantity] = useState({});
    const handleSizeChange = (size: string, productId: string) => {
        setSelectedSizes((prevSelectedSizes) => {
            const newSelectedSizes = { ...prevSelectedSizes };
            if (!newSelectedSizes[productId]) {
                newSelectedSizes[productId] = []; // Khởi tạo một mảng rỗng nếu chưa có giá trị cho productId
            }
            newSelectedSizes[productId] = [size]; // Chỉ lưu size được chọn và ghi đè mảng selectedSizes
            return newSelectedSizes;
        });

    };
    

    


    return (
        <>
            <div className="col-md-5 col-lg-5 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">Giỏ Hàng</span>
                    <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                </h4>
                <ul className="list-group mb-3 container">
                    {cartItems.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <img src={item.imgUrl} alt={item.name} className="mr-2" style={{ width: "80px", height: "80px" }} />
                            <div className={`d-flex ${styles["check-box"]}`}>
                                <div>
                                    <span>{item.name}</span>

                                    <div className={`${styles["change-color"]}`}>
                                        {item.variants.map((variant) => (
                                            <label
                                                key={variant.color}
                                                style={{ backgroundColor: variant.color, border: selectedColor[item.id] === variant.color ? "2px solid rgb(56, 56, 56)" : "none" }}
                                                className={`${styles["color-label"]}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className={`${styles["color-checkbox"]}`}
                                                    value={variant.color}
                                                    checked={selectedColor[item.id] === variant.color}
                                                    onChange={() => handleColorChange(variant.color, item.id.toString())}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                    <div className={`${styles["box-size"]}`}>
                                        {item.variants.find((variant) => variant.color === selectedColor[item.id])?.sizes?.map((sizeObj) => (
                                            <label key={sizeObj.size} className={`${styles["size-label"]}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSizes[item.id]?.includes(sizeObj.size)}
                                                    onChange={() => handleSizeChange(sizeObj.size, item.id.toString())}
                                                />
                                                <span className={`${styles["size-checkbox"]}`}>{sizeObj.size}</span>
                                            </label>
                                        ))}
                                        <div>
                                            {selectedSizes[item.id]?.map((selectedSize) => (
                                                <span className={`${styles["size-quantity"]}`} key={selectedSize}>
                                                    (Còn: {item.variants.find((variant) => variant.color === selectedColor[item.id])?.sizes?.find((sizeObj) => sizeObj.size === selectedSize)?.quantity})
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">

                                <strong>{toMoney(item.price * item.quantity)}</strong>
                            </div>

                        </li>
                    ))}

                    {cartItems.length === 0 && (
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Không có sản phẩm nào trong giỏ hàng</span>
                        </li>
                    )}
                    {cartItems.length > 0 && (
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Tổng cộng (VND)</span>
                            <strong>{toMoney(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))}</strong>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default ShoppingCart;
