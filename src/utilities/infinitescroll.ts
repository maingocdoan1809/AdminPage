import { ReactNode, useEffect, useRef, useState } from "react";
type InfiniteScrollResult = [
  ReactNode[],
  React.MutableRefObject<HTMLDivElement>,
  boolean
];
function useInfiniteScroll(generator: () => Promise<ReactNode[]>) {
  const [data, setData] = useState<ReactNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastItem = useRef<HTMLDivElement>(null!);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(lastItem.current);
          setIsLoading(true);
          const response = await generator();
          setIsLoading(false);
          setData([...data, ...response]);
        }
      });
    },
    {
      threshold: 1,
    }
  );
  // first render
  useEffect(() => {
    generator().then((newData: ReactNode[]) => {
      setData([...data, ...newData]);
    });
  }, []);
  // observe the last element when updating new state.
  useEffect(() => {
    if (lastItem.current) observer.observe(lastItem.current);
  }, [data]);

  return [data, lastItem, isLoading] as InfiniteScrollResult;
}

export default useInfiniteScroll;
