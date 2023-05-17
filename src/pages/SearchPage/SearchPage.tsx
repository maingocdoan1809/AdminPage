import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./SearchPage.module.css"
import ProductShow from "../../components/ProductShow/ProductShow";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingView from "../../components/LoadingView/LoadingView";

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  color: string;
  hexCode: string;
  imgUrl: string;
  view?: string;

}

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [minPriceFilter, setMinPriceFilter] = useState<number>(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get("name");


  useEffect(() => {
    const apiproduct = [
      {
        id: "1",
        name: "Áo Polo màu đỏ",
        size: "M",
        price: 100000,
        color: "đỏ",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "2",
        name: "Áo Polo màu đỏ nâu",
        size: "M",
        price: 150000,
        color: "đỏ nâu",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "3",
        name: "Áo Polo màu xanh lá cây",
        size: "L",
        price: 200000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "4",
        name: "Áo Polo vàng",
        size: "L",
        price: 250000,
        color: "yellow",
        hexCode: "#FFFF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "5",
        name: "Áo sơ mi màu cam",
        size: "L",
        price: 300000,
        color: "orange",
        hexCode: "#FFA500",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "6",
        name: "Quần jean",
        size: "XL",
        price: 350000,
        color: "purple",
        hexCode: "#800080",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "7",
        name: "Áo xanh da trời",
        size: "L",
        price: 400000,
        color: "pink",
        hexCode: "#FFC0CB",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "8",
        name: "Áo khoác xanh",
        size: "XL",
        price: 450000,
        color: "black",
        hexCode: "#000000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "9",
        name: "Áo khoác đen",
        size: "XL",
        price: 500000,
        color: "white",
        hexCode: "#FFFFFF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "10",
        name: "X-Shirt",
        size: "L",
        price: 550000,
        color: "gray",
        hexCode: "#808080",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "11",
        name: "X-Shirt",
        size: "M",
        price: 600000,
        color: "brown",
        hexCode: "#A52A2A",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "12",
        name: "X-Shirt",
        size: "XL",
        price: 650000,
        color: "navy",
        hexCode: "#000080",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "13",
        name: "X-Shirt",
        size: "L",
        price: 700000,
        color: "maroon",
        hexCode: "#800000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "14",
        name: "X-Shirt",
        size: "L",
        price: 750000,
        color: "olive",
        hexCode: "#808000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "15",
        name: "X-Shirt",
        size: "S",
        price: 100000,
        color: "red",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "16",
        name: "Y-Shirt",
        size: "S",
        price: 150000,
        color: "blue",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "17",
        name: "D-Shirt",
        size: "S",
        price: 200000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "18",
        name: "Y-Shirt",
        size: "S",
        price: 75000,
        color: "red",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "19",
        name: "Y-Shirt",
        size: "L",
        price: 120000,
        color: "red",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "20",
        name: "Y-Shirt",
        size: "L",
        price: 175000,
        color: "red",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "21",
        name: "Y-Shirt",
        size: "XL",
        price: 230000,
        color: "red",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "22",
        name: "Z-Shirt",
        size: "S",
        price: 90000,
        color: "blue",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "23",
        name: "Z-Shirt",
        size: "M",
        price: 145000,
        color: "blue",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "24",
        name: "Z-Shirt",
        size: "L",
        price: 200000,
        color: "blue",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "25",
        name: "Z-Shirt",
        size: "XL",
        price: 255000,
        color: "blue",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "26",
        name: "Green T-Shirt",
        size: "S",
        price: 80000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "27",
        name: "Z-Shirt",
        size: "M",
        price: 130000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "28",
        name: "Z-Shirt",
        size: "L",
        price: 180000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "29",
        name: "Z-Shirt",
        size: "XL",
        price: 230000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "30",
        name: "Z-Shirt",
        size: "S",
        price: 95000,
        color: "yellow",
        hexCode: "#FFFF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
    ];
    setProducts(apiproduct);

    const params = new URLSearchParams(location.search);
    const color = params.get("color");
    const size = params.get("size");
    setSelectedColor(color || "All");
    setSelectedSize(size || "");
  }, [location.search])

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(name, value);
    setSelectedColor(value);
    setSelectedSize(value);
    navigate(`?${params.toString()}`);
  };
  

  const searchNameParts = searchName?.split(' ') ?? [];
  const filteredProducts = products.filter((product) => {
    let matchCount = 0;
    for (const keyword of searchNameParts) {
      if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }
    return matchCount > 0;
  });

  function countMatchedKeywords(product: Product, searchNameParts: string[]): number {
    let matchCount = 0;
    for (const keyword of searchNameParts) {
      if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }
    return matchCount;
  }

  function compareProductNames(a: Product, b: Product): number {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName === bName) {
      return 0;
    } else if (aName.includes(searchName?.toLowerCase() ?? "")) {
      return -1;
    } else if (bName.includes(searchName?.toLowerCase() ?? "")) {
      return 1;
    } else {
      return 0;
    }
  }

  const sortedProducts = filteredProducts.sort((a, b) => {
    const aMatchCount = countMatchedKeywords(a, searchNameParts);
    const bMatchCount = countMatchedKeywords(b, searchNameParts);
    if (aMatchCount === bMatchCount) {
      return compareProductNames(a, b);
    }
    return bMatchCount - aMatchCount;
  });

  const getAllColors = () => {
    let colors: string[] = [];
    filteredProducts.forEach((product: { color: string; }) => {
      if (!colors.includes(product.color)) {
        colors.push(product.color);
      }
    });
    return colors;
  };

  const getPriceOptions = (): number[] => {
    const minPrice = getMinPrice();
    const maxPrice = getMaxPrice();
    const step = 50000;
    const priceOptions = [];
    for (let i = 50000; i <= maxPrice; i += step) {
      priceOptions.push(i);
    }
    return priceOptions;
  };
  const getMinPrice = (): number => {
    const prices = filteredProducts.map((product: { price: number; }) => product.price);
    return Math.min(...prices);
  };

  const getMaxPrice = (): number => {
    const prices = filteredProducts.map((product: { price: number; }) => product.price);
    return Math.max(...prices);
  };

  const allSizes = filteredProducts.reduce((sizes: string[], product: Product) => {
    product.size.split(",").forEach((size: string) => {
      if (!sizes.includes(size.trim())) {
        sizes.push(size.trim());
      }
    });
    return sizes;
  }, []);

  const filteredProductsList = sortedProducts.filter((product: Product) => {
    if (selectedColor !== "All" && product.color !== selectedColor) {
      return false;
    }
    if (minPriceFilter > 0 && product.price < minPriceFilter) {
      return false;
    }
    if (maxPriceFilter > 0 && product.price > maxPriceFilter) {
      return false;
    }
    if (selectedSize !== "" && product.size !== selectedSize) {
      return false;
    }
    return true;
  });


  function handleFilterToggle() {
    setShowFilter(!showFilter);
  }
  // const [items, setItems] = useState<Product[]>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  // const [pageNumber, setPagenumber] = useState(1);
  // useEffect(() => {
  //   setItems(filteredProductsList.slice(0, 8));
  // }, [filteredProductsList.length, filteredProductsList[0].id]);

  // const loadMore = () => {
  //   setTimeout(() => {
  //     const currentLength = items.length;
  //     const newItems = filteredProductsList.slice(currentLength, currentLength + 8);
  //     setItems([...items, ...newItems]);
  //     if (filteredProductsList.length <= currentLength + 8) {
  //       setHasMore(false);
  //     }
  //   }, 300);
  // };
  // const [filterHeight, setFilterHeight] = useState("0px");



  if (filteredProductsList.length === 0) {
    return (
      <div>
        <Navbar />
        <br />
        <h2>Không có sản phẩm nào</h2>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className={`my-2 ${styles["container"]}`}>
        <div
          className={`p-2 ms-3 link-dark text-decoration-none ${styles["filter-toggle"]}`}
          onClick={handleFilterToggle}
        >
          <b style={{ userSelect: "none" }}>Lọc sản phẩm</b>

        </div>
        <div
          className={`${styles["filter-container"]} ${showFilter ? styles["filter-container-open"] : ""}`}
        >
          <form>
            <div className={`row my-2 ${styles["filter"]} `}>
              <div className={`col-md-3 col-lg-3 ${styles["select-color"]}`}>
                <label>
                  Color:
                  <select
                    value={selectedColor}
                    onChange={(e) => handleFilterChange("color", e.target.value)}
                  >
                    <option value="All">All</option>
                    {getAllColors().map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </label >
              </div>
              <div className={`col-md-3 col-lg-3 ${styles["select-size"]}`}>
                <label>
                  Size:
                  <select value={selectedSize} onChange={(e) => handleFilterChange("size", e.target.value)}>
                    <option value="">All sizes</option>
                    {allSizes.map((size: string) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={`col-md-5 col-lg-3 ${styles["select-price"]}`}>
                <label>
                  Price:
                  <select value={minPriceFilter} onChange={(e) => setMinPriceFilter(Number(e.target.value))}>
                    <option value="-1">min</option>
                    {getPriceOptions().map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                  to
                  <select value={maxPriceFilter} onChange={(e) => setMaxPriceFilter(Number(e.target.value))}>
                    <option value={getMaxPrice() + 1}>max</option>
                    {getPriceOptions().map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </form>
        </div>
        <hr />
        <div className={`${styles["render-product"]}`}>
          <br />
          <h2>Kết quả tìm kiếm cho: {searchName}</h2>
          <hr />
          {/* <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<LoadingView />}
          scrollThreshold={0.8}
        > */}
          <div>
            {filteredProductsList.map((product: Product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>Size: {product.size}</p>
                <p>Price: {product.price}</p>
                <p>Color: {product.color}</p>
              </div>
            ))}
          </div>
          {/* </InfiniteScroll> */}
        </div>
      </div>

    </div>
  );
};

export default SearchPage;