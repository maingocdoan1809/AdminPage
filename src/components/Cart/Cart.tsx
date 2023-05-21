import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { BACKEND_URL } from "../../env";
import { Product } from "../../utilities/utils";
import { useLocation } from "react-router";
import { CartItem } from "../../utilities/utils";
import SelectBox from "../SelectBox/SelectBox";
import { NewItemDataContext } from "../../contexts/CartConText/CartConText";
import { useFetcher } from "react-router-dom";



function Cart() {
    const { newItemData } = useContext(NewItemDataContext)!;
    const [product, setProduct] = useState<Product[]>([]);
    // const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState({
        size: "",
        color: "",
        quantity: 1,
        selectedColorName: ""
    });


    const fetchProduct = (infoid: string) => {
        fetch(`${BACKEND_URL}/products/${infoid}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            });
    };

    useEffect(() => {
        if (newItemData?.infoid) {
            fetchProduct(newItemData.infoid);
            // if (newItemData?.id && product.length > 0) {
            //     const existingProduct = cartProducts.find((p) => p.id === newItemData.id);
        
            //     if (!existingProduct) {
            //         const newProduct = product.find((p) => p.id === newItemData.id);
        
            //         if (newProduct) {
            //             setCartProducts((prevProducts) => [...prevProducts, newProduct]);
            //             localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            //         }
            //     }
            // }
        }
    }, [newItemData?.infoid]);
    // useEffect(() => {
    //     const storedCartProducts = localStorage.getItem("cartProducts");
    //     if (storedCartProducts) {
    //         setCartProducts(JSON.parse(storedCartProducts));
    //     }
    // }, []);

    if (!newItemData) {
        return <div>Loading...</div>;
    }


    // useEffect(() => {
    //     if (newItemData?.id && product) {
    //         // Kiểm tra xem sản phẩm với id newItemData.id đã tồn tại trong mảng uniqueProducts chưa
    //         const isExisting = cartProducts.some((p) => p.id === newItemData.id);

    //         if (!isExisting) {
    //             // Tạo một mảng mới với các sản phẩm không trùng lặp từ mảng product
    //             const newUniqueProducts = [...cartProducts];

    //             // Tìm sản phẩm trong mảng product với id = newItemData.id
    //             const newProduct = product.find((p) => p.id === newItemData.id);

    //             if (newProduct) {
    //                 newUniqueProducts.push(newProduct);
    //                 setCartProducts(newUniqueProducts);
    //             }
    //         }
    //     }
    // }, [newItemData?.id, product, cartProducts]);


    const sizeList = product.map(item => item.size);
    const colorList = product.map(item => item.colorname);

    const handleDecrease = () => {
        setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };


    return (
        <>
            {newItemData.id}
            <div className={`order-md-last ${styles["cart-wrap"]}`}>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary rounded-pill">{quantity}</span>
                </h4>
                <ul className={`list-group mb-3 ${styles["list-product-cart"]}`} >
                    <li
                        className={`d-flex justify-content-evenly ${styles["product-item"]}`}
                        style={{ padding: "3px 3px" }}
                    >
                        <div className={`${styles["product-info"]} d-flex flex-column`}>
                            <div className="d-flex align-items-center">
                                <img
                                    style={{ width: "50px", height: "80px" }}
                                    src={product.find((item) => item.id === newItemData.id)?.imageurl || ""}
                                    alt=""
                                />
                            </div>
                            <h6 className="my-2">{product.find((item) => item.id === newItemData.id)?.name || "Product name"}</h6>
                        </div>

                        <div
                            style={{ padding: "0 4px", borderRight: "1px solid #c5b1b1", borderLeft: "1px solid #c5b1b1" }}
                            className={`${styles["individual-options"]} d-flex flex-column`}
                        >
                            <div className="d-flex flex-column">
                                <label htmlFor="size">Size:</label>
                                <div>
                                    {sizeList.filter((size, index) => sizeList.indexOf(size) === index).map((size: string) => (
                                        <div className="form-check form-check-inline" key={size}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`size-${size}`}
                                                value={size}
                                                checked={selectedProduct.size === size}
                                                onChange={() =>
                                                    setSelectedProduct({ ...selectedProduct, size })
                                                }
                                            />
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`d-flex flex-column ${styles["color-option"]}`}>
                                <label htmlFor="color">Color: {selectedProduct.selectedColorName}</label>
                                <div>
                                    {colorList.filter((color, index) => colorList.indexOf(color) === index).map((color: string) => (
                                        <div className="form-check form-check-inline" key={color} style={{ width: "30px", height: "30px", backgroundColor: `${color}`, borderRadius: "100%" }}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`color-${color.toLowerCase()}`}
                                                value={color}
                                                checked={selectedProduct.color === color}
                                                onChange={() => {
                                                    const selectedColorName = selectedProduct.color === color ? selectedProduct.selectedColorName : color;
                                                    setSelectedProduct({ ...selectedProduct, color, selectedColorName });
                                                }}
                                                style={{ opacity: 0, width: "30px", height: "30px" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-evenly" style={{ justifyContent: "space-between" }}>
                                <span onClick={handleDecrease}>-</span>
                                <div style={{ width: "15px" }}>{quantity}</div>
                                <span onClick={handleIncrease}>+</span>
                            </div>
                            <span className="text-muted">$12</span>
                        </div>
                        <div style={{ paddingLeft: "4px", alignItems: "center" }} className="d-flex flex-column">
                            <button
                                type="button"
                                className="btn btn-outline-warning mt-2"
                            >
                                Xóa
                            </button>
                            <label className="form-check-label mt-2" htmlFor="color-green">
                                Chọn
                            </label>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="color-green"
                                value="Green"
                            />
                        </div>
                    </li>
                </ul>
                <div className="list-group-item d-flex justify-content-end px-4">
                    <strong>Total (USD): $20</strong>
                </div>
                <button type="submit" className="btn btn-secondary">
                    Buy now
                </button>
            </div>
        </>
    );
}

export default Cart;

