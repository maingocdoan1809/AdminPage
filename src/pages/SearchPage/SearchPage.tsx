import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProductShow from "../../components/ProductShow/ProductShow";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingView from "../../components/LoadingView/LoadingView";

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  imgUrl: string;
  view?: number;
  sold?: number;
}

interface SearchPageProps {
  products: Product[];
}

const SearchPage: React.FC<SearchPageProps> = ({ products }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";
  const selectedColors = params.get("colors")?.split(",") || [];
  const minPrice = params.get("minPrice")
    ? Number(params.get("minPrice"))
    : undefined;
  const maxPrice = params.get("maxPrice")
    ? Number(params.get("maxPrice"))
    : undefined;

  const filteredProducts = products.filter((product) => {
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false;
    }
    if (minPrice !== undefined && product.price < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && product.price > maxPrice) {
      return false;
    }
    return product.name.toLowerCase().includes(query.toLowerCase());
  });

  const [items, setItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setItems(filteredProducts.slice(0, 8));
  }, [filteredProducts.length, filteredProducts[0].id]);

  const loadMore = () => {
    setTimeout(() => {
      const currentLength = items.length;
      const newItems = filteredProducts.slice(
        currentLength,
        currentLength + 8
      );
      setItems([...items, ...newItems]);
      if (filteredProducts.length <= currentLength + 8) {
        setHasMore(false);
      }
    }, 1000); // thời gian delay là 1 giây (1000 millisecond)
  };
  
  
  

  if (filteredProducts.length === 0) {
    return (
      <div>
        <Navbar />
        <h2>Không có sản phẩm nào</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Kết quả tìm kiếm cho: {query}</h2>
        <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<LoadingView />}
        scrollThreshold={0.8}
      >
        <div className="row">
          {items.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductShow
                id={product.id.toString()}
                name={product.name}
                price={product.price}
                imgUrl={product.imgUrl}
                view={product.view}
                sold={product.sold}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      </div>
      
    </div>
  );
};

export default SearchPage;
