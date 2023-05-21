import style from "./content.module.css";

import ProductShow from "../ProductCard/ProductCard";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useInfiniteScroll from "../../utilities/infinitescroll";
import { BACKEND_URL } from "../../env";
import { Product } from "../../utilities/utils";

type ContentProps = {
  category: string;
};

function Content({ category }: ContentProps) {
  const pageRef = useRef(0);
  const [isLoadFail, setIsLoadFail] = useState(false);
  const generator = () => {
    return new Promise<ReactNode[]>((resolve) => {
      fetch(BACKEND_URL + `/products?page=${pageRef.current}`)
        .then((response) => response.json())

        .then((productsJson) => {
          if (productsJson.err) {
            setIsLoadFail(true);
            return;
          }
          const a: ReactNode[] = [];
          for (let i = 0; i < productsJson.length; i++) {
            a.push(
              <ProductShow
                imgUrl={productsJson[i].imageurl}
                name={productsJson[i].name}
                id={productsJson[i].id}
                price={productsJson[i].price}
                key={products.length + i}
                ref={i == productsJson.length - 1 ? lastItem : null} 
                //color={""} 
                />
            );
          }
          resolve(a);
          setIsLoadFail(false);
        })
        .catch((err) => {
          setIsLoadFail(true);
        });
    });
  };
  const [products, lastItem, isLoading] = useInfiniteScroll(generator);

  return (
    <>
      {isLoadFail && (
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
      )}
      {!isLoading && !isLoadFail && (
        <div className={`${style.content}`}>{products.map((e) => e)}</div>
      )}
      {isLoading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
