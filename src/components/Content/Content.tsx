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
  const generator = () => {
    return new Promise<ReactNode[]>((resolve) => {
      fetch(BACKEND_URL + `/products?page=${pageRef.current}`)
        .then((response) => response.json())
        .then((productsJson: Product[]) => {
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
              />
            );
          }
          resolve(a);
        });
    });
  };
  const [products, lastItem, isLoading] = useInfiniteScroll(generator);
  console.log(pageRef.current);

  return (
    <>
      <div className={`${style.content}`}>{products.map((e) => e)}</div>
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
