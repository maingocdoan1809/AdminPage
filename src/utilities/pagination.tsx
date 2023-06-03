import { useEffect, useState } from "react";
import { Product } from "./utils";
import { BACKEND_URL } from "../env";

type PaginationProps = {
  generator: () => Promise<Product[]>;
};

function usePagination({ generator }: PaginationProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState([] as Product[]);
  const [isSuccess, setIsSuccess] = useState<undefined | boolean>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    setIsSuccess(undefined);
    generator()
      .then((data) => {
        if (data.length == 0) {
          setHasMore(false);
        } else {
          setProducts([...products, ...data]);
        }
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);

        setIsSuccess(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [loadMore]);

  return {
    products,
    isFetching,
    isSuccess,
    hasMore,
    loadMore: () => {
      setLoadMore((prev) => !prev);
    },
  };
}

export default usePagination;
