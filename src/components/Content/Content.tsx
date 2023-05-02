import style from "./content.module.css";

import ProductShow from "../ProductShow/ProductShow";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../utilities/infinitescroll";

function Content() {
  const [products, lastItem, isLoading] = useInfiniteScroll(() => {
    return new Promise<ReactNode[]>((resolve) => {
      const a: ReactNode[] = [];
      for (let i = 0; i < 10; i++) {
        if (i == 9) {
          a.push(
            <ProductShow
              imgUrl="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F1e%2Fbd%2F1ebd58a1b0df171671868a58d7cd14b25dee6fd8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
              name="Oxford shirt"
              id="1323"
              price={5000}
              key={products.length + i}
              ref={lastItem}
            />
          );
        } else {
          a.push(
            <ProductShow
              imgUrl="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F1e%2Fbd%2F1ebd58a1b0df171671868a58d7cd14b25dee6fd8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
              name="Oxford shirt white"
              id="1323323sdrfsd"
              price={34000}
              key={products.length + i}
            />
          );
        }
      }
      setTimeout(() => {
        resolve(a);
      }, 2000);
    });
  });

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
