import { useEffect, useState, useDeferredValue } from "react";
import { Product, toMoney } from "../../../../utilities/utils";
import { BACKEND_URL } from "../../../../env";
import style from "./product.module.css";
import LoadingView from "../../../LoadingView/LoadingView";
import { useLocation, useNavigate } from "react-router";
import usePagination from "../../../../utilities/pagination";
import React from "react";
function Products() {
  const [novalueFound, setNovalueFound] = useState(false);
  const redirect = useNavigate();
  const [currPage, setCurrPage] = useState(0);
  async function generator() {
    return fetch(BACKEND_URL + `/products?page=${currPage}`)
      .then((response) => response.json())
      .then((data) => {
        return data as Product[];
      });
  }
  const { products, isFetching, isSuccess, hasMore, loadMore } =
    usePagination<Product>({
      generator,
    });
  const [filterdProducts, setFilterdProducts] = useState(products);
  const defferedValue = useDeferredValue(filterdProducts);
  useEffect(() => {
    setFilterdProducts(products);
    document.title = "Products";
  }, [products]);

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
        <>
          {isSuccess == false ? (
            <div className="flex-grow-1 d-flex justify-content-center align-items-center flex-column w-100 h-100">
              <p className="fs-4 text-danger">Load fail.</p>
              <p>Check the connection.</p>
              <p>And</p>
              <p>
                We're trying to get it fixed{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-wrench-adjustable"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 4.5a4.492 4.492 0 0 1-1.703 3.526L13 5l2.959-1.11c.027.2.041.403.041.61Z" />
                  <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.49 4.49 0 0 0 11.5 9Zm-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376ZM3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>{" "}
                and will inform you as soon as possible.
              </p>
            </div>
          ) : (
            <div className="flex-grow-1">
              <div className={`flex-grow-1 flex-column `}>
                {defferedValue.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className={`${style.card} d-flex flex-row mt-3`}
                      onClick={() => {
                        redirect("/admin/products/" + product.id);
                      }}
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
              <div className="m-5">{isFetching && <LoadingView />}</div>
              <div className="text-center">
                {!hasMore && (
                  <div className="text-center text-muted mt-3">
                    {" "}
                    Well done, we're still updating our new products{" "}
                  </div>
                )}
                {!isFetching && hasMore && (
                  <button
                    onClick={() => {
                      setCurrPage((prev) => prev + 1);
                      loadMore();
                    }}
                    className="btn btn-dark mt-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-compact-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}

export default React.memo(Products);
