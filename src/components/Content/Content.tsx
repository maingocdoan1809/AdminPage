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
          a.push(<ProductShow key={products.length + i} ref={lastItem} />);
        } else {
          a.push(<ProductShow key={products.length + i} />);
        }
      }
      setTimeout(() => {
        resolve(a);
      }, 2000);
    });
  });
  useEffect(() => {
    console.log(isLoading);
  });
  return (
    <>
      <div className={`${style.content}`}>{products.map((e) => e)}</div>
      {isLoading && <div>Loading...</div>}
    </>
  );
}

export default Content;
