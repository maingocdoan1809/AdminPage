import { useEffect, useState, useDeferredValue } from "react";
import { Product, toMoney } from "../../../../utilities/utils";
import { BACKEND_URL } from "../../../../env";
import style from "./product.module.css";
import LoadingView from "../../../LoadingView/LoadingView";
function Products() {
  const [products, setProducts] = useState([] as Product[]);
  const [filterdProducts, setFilterdProducts] = useState(products);
  const defferedValue = useDeferredValue(filterdProducts);
  const [novalueFound, setNovalueFound] = useState(false);
  useEffect(() => {
    document.title = "Product";
    fetch(BACKEND_URL + "/products?page=0")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilterdProducts(data);
      });
  }, []);

  return (
    <>
      <div className={`container ${style.container} d-flex flex-column`}>
        <div className="container row mt-3 mb-3 gap-3 text-white d-flex align-items-center justify-content-between">
          <div className={`${style.card} bg-success p-3 col-lg-3 col-sm-6`}>
            <h6 className="m-0">Products num : {products.length}</h6>
          </div>
          <div className="col-lg-4 col-sm-6 p-0">
            <input
              type="search"
              className="form-control"
              placeholder="Type something to search"
              onChange={(e) => {
                const newData = [] as Product[];
                const value = e.target.value.trim();
                products.forEach((product) => {
                  if (
                    product.name.toLowerCase().includes(value.toLowerCase())
                  ) {
                    newData.push(product);
                  }
                });
                if (newData.length > 0) {
                  setNovalueFound(false);
                  setFilterdProducts(newData);
                } else {
                  setNovalueFound(true);
                }
              }}
            />
          </div>
        </div>
        {novalueFound ? (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <h5>The product name does not match any products.</h5>
          </div>
        ) : defferedValue.length == 0 ? (
          <div className="flex-grow-1">
            <LoadingView />
          </div>
        ) : (
          <div className={`flex-grow-1 flex-column `}>
            {defferedValue.map((product, index) => {
              return (
                <div
                  key={index}
                  className={`${style.card} d-flex flex-row mt-3`}
                  onClick={(e) => {}}
                >
                  <div>
                    <img
                      src={product.imageurl}
                      alt=""
                      className={`${style.img}`}
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <p className={`${style.title}`}>{product.name}</p>
                    <p>Price : {toMoney(product.price)}</p>
                    <div>Remaining quantity: {product.quantity} </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
