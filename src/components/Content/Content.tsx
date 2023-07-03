import style from "./content.module.css";

import ProductCard from "../ProductCard/ProductCard";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { BACKEND_URL } from "../../env";
import { Product } from "../../utilities/utils";
import LoadingView from "../LoadingView/LoadingView";
import usePagination from "../../utilities/pagination";

type ContentProps = {
  category: string;
};

function Content({ category }: ContentProps) {
  const [currPage, setCurrPage] = useState(0);
  const generator = async () => {
    return fetch(BACKEND_URL + `/products?page=${currPage}`)
      .then((response) => response.json())
      .then((data) => data as Product[]);
  };
  const { products, isFetching, isSuccess, hasMore, loadMore } =
    usePagination<Product>({
      generator,
    });
  return (
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
          <div className={`${style.content}`}>
            {products.map((e: Product) => (
              <ProductCard
                key={e.id}
                id={e.id}
                imgUrl={e.imageurl}
                name={e.name}
                price={e.price}
              />
            ))}
          </div>
          <div>{isFetching && <LoadingView />}</div>
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
  );
}

export default Content;
