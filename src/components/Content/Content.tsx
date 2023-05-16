import style from "./content.module.css";

import ProductShow from "../ProductShow/ProductShow";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../utilities/infinitescroll";
import { BACKEND_URL } from "../../env";
import { Product } from "../../utilities/utils";

type ContentProps = {
  category: string;
};

function Content({ category }: ContentProps) {
  const [page, setPage] = useState(0);
  const [products, lastItem, isLoading] = useInfiniteScroll(() => {
    return new Promise<ReactNode[]>((resolve) => {
      fetch(BACKEND_URL + `/products?page=${page}`)
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
  });
  useEffect(() => {
    setPage((page) => page + 1);
  }, [products]);

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
