import { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
import { useNavigate } from "react-router";


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


const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const similarName = searchKeyword?.split(' ') ?? [];
  const searchColor = similarName[similarName.length - 1];

  useEffect(() => {
    const apiproduct = [
      {
        id: "1",
        name: "T-Shirt",
        size: "M",
        price: 100000,
        color: "đỏ",
        hexCode: "#FF0000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "2",
        name: "T-Shirt",
        size: "M",
        price: 150000,
        color: "đỏ nâu",
        hexCode: "#0000FF",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "3",
        name: "T-Shirt",
        size: "L",
        price: 200000,
        color: "green",
        hexCode: "#00FF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "4",
        name: "T-Shirt",
        size: "L",
        price: 250000,
        color: "yellow",
        hexCode: "#FFFF00",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "5",
        name: "T-Shirt",
        size: "L",
        price: 300000,
        color: "orange",
        hexCode: "#FFA500",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "6",
        name: "A-Shirt",
        size: "XL",
        price: 350000,
        color: "purple",
        hexCode: "#800080",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "7",
        name: "A-Shirt",
        size: "L",
        price: 400000,
        color: "pink",
        hexCode: "#FFC0CB",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "8",
        name: "A-Shirt",
        size: "XL",
        price: 450000,
        color: "black",
        hexCode: "#000000",
        imgUrl: "http://cdn.bpsofts.com/khaitam.top/1280x720/untitled-1-20180824123043.jpg"
      },
      {
        id: "9",
        name: "A-Shirt",
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
  }, [])

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      // Perform the search logic here based on the provided keyword
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      const limitedProduct = filteredProducts.slice(0, 4);
      setSimilarProducts(limitedProduct);
    };
    fetchSimilarProducts();
  }, [searchKeyword])



  const handleSearch = () => {
    setShowSearch(false);
    navigate(`/search?name=${encodeURIComponent(searchKeyword)}`);
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === "Enter") {
      setShowSearch(false);
      handleSearch();
    }
  };
  function handleSearchToggle() {
    setShowSearch(!showSearch);
    inputRef.current?.focus();
  }

  return (
    <>
      <div className={`${styles["search-container-wrapper"]}`}>
        <div
          className={`${styles["search-container"]} ${showSearch ? styles["search-container-active"] : ""}`}
        >
          <input
            ref={inputRef}
            className={`${styles["input-search"]}`}
            type="search"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <a className={`${styles["btn-search"]}`}
            onClick={handleSearch}
          >
            <i className={`fa-solid fa-magnifying-glass fa-lg ${styles["fa-magnifying-glass"]}`} style={{ color: "#646cff" }}></i>
          </a>
          <a className={`${styles["btn-close"]}`}
            onClick={handleSearch}
          >
            <i className={`fa-solid fa-xmark fa-lg ${styles["fa-xmark"]}`} style={{ color: "#777777" }}></i>
          </a>
        </div>
        <a className={`${styles["btn-search-2"]}`}
          onClick={handleSearchToggle}
          style={{ display: showSearch ? "none" : "flex" }}
        >
          <i className="fa-solid fa-magnifying-glass fa-lg" style={{ color: "#646cff" }}></i>
        </a>


      </div>
      <div className={`${styles["same-results"]}`}>
        <br />
        <h4>Có thể bạn đang tìm: </h4>
        {similarProducts.map((product) => (
          <div key={product.id} className={`${styles["similarProducts"]}`}>
            <img src={product.imgUrl} alt={product.name} style={{ width: "40px", height: "40px" }} />
            {product.name}
            {product.color}
            {/* product.description*/}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
