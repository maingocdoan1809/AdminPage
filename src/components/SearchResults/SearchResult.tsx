import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchResult.module.css";
import ProductShow from "../ProductCard/ProductCard";
import { BACKEND_URL } from "../../env";
import { Product } from "../../utilities/utils";
import LoadingView from "../LoadingView/LoadingView";

const SearchResult: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [minValue, setMinValue] = useState<number>(100000);
  const [maxValue, setMaxValue] = useState<number>(1000000);
  const [filteredProductsList, setFilteredProductsList] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get("name") ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [filteredProductsUpdate, setFilteredProductsUpdate] = useState<Product[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [isLoadmore, setIsLoadmore] = useState(false);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keywords = searchName.toLowerCase().split(" ");
    // set default value
    setSelectedColor("All");
    setSelectedSize("All size");
    setMinValue(0);
    setMaxValue(1000000);
    console.log(searchName);

    const fetchAllProducts = async () => {
      const response = await fetch(
        BACKEND_URL +
        `/search?page=${page}&searchName=${(searchName)}`
      );
      const productsJson = await response.json();
      return productsJson;
    };

    let timeoutId: any;

    if (page === 0) {
      fetchAllProducts()
        .then((productsJson) => {

          setFilteredProductsList(productsJson);
          console.log(filteredProductsList);
          setProducts(productsJson);
          setHasMoreProducts(productsJson.length > 0);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetchAllProducts()
        .then((productsJson) => {
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.concat(productsJson);
            setFilteredProductsList(updatedProducts);
            console.log(filteredProductsList);
            setHasMoreProducts(productsJson.length > 0);
            return updatedProducts;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchAllProducts()
      .then((productsJson) => {
        if (productsJson.length === 0 && filteredProductsList.length === 0) {
          timeoutId = setTimeout(() => {
            setShowNoResults(true);
            setHasMoreProducts(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.search, page]);




  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoadmore(true);
    console.log(isLoadmore);

    setTimeout(() => {
      setIsLoadmore(false);
    }, 1000);
  };


  const colorsMap = new Map();
  productDetails.forEach((product) => {
    colorsMap.set(product.colorcode, product.colorname);
  });

  const colors = Array.from(colorsMap).map(([colorcode, colorname]) => ({
    colorcode,
    colorname
  }));


  const sizes = [...new Set(productDetails.flatMap((product) => product.size))];

  useEffect(() => {
    try {
      fetch(BACKEND_URL + "/products/all")
        .then((response) => response.json())
        .then((products) => {
          setProductDetails(products);
        });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  }, [products]);

  const getMinPrice = () => {
    const prices = productDetails.map((product) => product.price);
    return Math.min(...prices);
  };

  const getMaxPrice = () => {
    const prices = productDetails.map((product) => product.price);
    return Math.max(...prices);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(value);
    if (value > maxValue) {
      setMaxValue(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMaxValue(value);
    if (value < minValue) {
      setMinValue(value);
    }
  };

  const [sortOrder, setSortOrder] = useState("asc");
  const handlePriceSortasc = () => {
    const sortedProducts = filteredProductsList
      .slice()
      .sort((a, b) => a.price - b.price);
    setFilteredProductsList(sortedProducts);
    setSortOrder("asc");
  };

  const handlePriceSortdesc = () => {
    const sortedProducts = filteredProductsList
      .slice()
      .sort((a, b) => b.price - a.price);
    setFilteredProductsList(sortedProducts);
    setSortOrder("desc");
  };

  function handleFilterToggle() {
    setShowFilter(!showFilter);
  }

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    if (filteredProductsList.length === 0) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setIsLoading(false);
    }
  }, [filteredProductsList]);

  const [selectedColors, setSelectedColors] = useState<{ colorcode: string, colorname: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSizeChange = (size: string) => {
    const index = selectedSizes.indexOf(size);
    if (index === -1) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      const updatedSizes = [...selectedSizes];
      updatedSizes.splice(index, 1);
      setSelectedSizes(updatedSizes);
    }
  };

  const isSizeSelected = (size: string) => {
    return selectedSizes.includes(size);
  };

  const handleColorChange = (color: string) => {
    const existingColor = selectedColors.find((selectedColor) => selectedColor.colorcode === color);

    if (existingColor) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor.colorcode !== color));
    } else {
      const colorname = productDetails.find((product) => product.colorcode === color)?.colorname || "";
      setSelectedColors([...selectedColors, { colorcode: color, colorname }]);
    }
  };


  const isColorSelected = (color: { colorcode: string; colorname: string; }) => {
    return selectedColors.some((selectedColor) => selectedColor.colorcode === color.colorcode);
  };

  const convertToVietnameseWithoutAccent = (str: string) => {
    const diacriticMap: any = {
      'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
      'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
      'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
      'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
      'đ': 'd',
      'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
      'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
      'Đ': 'D'
    };

    return str.replace(/[^A-Za-z0-9]/g, (x) => diacriticMap[x] || x);
  };


  const handleFilterSubmit = () => {
    if (productDetails.length > 0) {
      const searchName = searchParams.get("name");
      const filteredProducts = productDetails.filter((product) => {
        const productName = convertToVietnameseWithoutAccent(product.name.toLowerCase());
        const productPrice = product.price;
        const productColor = product.colorcode;
        const productSize = product.size;

        const lowerCaseSearchName = searchName ? convertToVietnameseWithoutAccent(searchName.toLowerCase()) : '';

        const nameMatch =
          !lowerCaseSearchName || productName.toLowerCase().includes(lowerCaseSearchName);


        const priceMatch = productPrice >= minValue && productPrice <= maxValue;
        const colorMatch =
          selectedColors.length === 0 || selectedColors.some((selectedColor) => selectedColor.colorcode === productColor);

        const sizeMatch =
          selectedSizes.length === 0 || selectedSizes.includes(productSize);

        return nameMatch && priceMatch && colorMatch && sizeMatch;
      });

      const uniqueNames = [
        ...new Set(filteredProducts.map((product) => product.name)),
      ];
      const updatedFilteredProductsList = uniqueNames.map((name) => {
        // Lấy sản phẩm duy nhất cho mỗi tên
        return filteredProducts.find((product) => product.name === name);
      }).filter((product) => product !== undefined); // Loại bỏ các giá trị undefined
  
      setFilteredProductsList(updatedFilteredProductsList as Product[]);
    }
    handleFilterToggle();
    setHasMoreProducts(false);
  };

  return (
    <div>
      <div className={`${styles["container"]}`}>
        <div className={styles["wraper-filter"]}>
          <div className={styles["wrap"]}>
            <a
              className={`link-dark text-decoration-none ${styles["filter-toggle"]} d-flex gap-3 align-items-center`}
              onClick={handleFilterToggle}
            >
              <b style={{ userSelect: "none" }}>Filter</b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-funnel"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
              </svg>
            </a>
            <div
              className={`${styles["filter-container"]} ${showFilter ? styles["filter-container-open"] : ""
                }`}
            >
              <form>
                <div className="row my-2 filter">
                  <div className="col-md-3 col-lg-3 select-color">
                    <label>
                      <span style={{ userSelect: "none" }}>Color:</span>
                      <div className="color-container">
                        {colors.map((color, index) => (
                          <label
                            key={index}
                            style={{
                              backgroundColor: color.colorcode,
                              position: "relative",
                              opacity: 0.8,
                            }}
                            className={`${styles["select-color"]} m-2`}
                          >
                            <input
                              type="checkbox"
                              value={color.colorcode}
                              checked={isColorSelected(color.colorcode)}
                              onChange={() => handleColorChange(color.colorcode)}
                              style={{ opacity: 0 }}
                            />
                            {isColorSelected(color) && (
                              <div
                                className={`${styles["checkmark"]}`}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                &#10003;
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </label>
                  </div>
                  <div className="col-md-3 col-lg-3 select-size mb-3">
                    <span style={{ userSelect: "none" }}>Size:</span>
                    <div className={`${styles["size-container"]} d-flex `}>
                      {sizes.map((size, index) => (
                        <>
                          <label
                            key={index}
                            style={{
                              backgroundColor: isSizeSelected(size)
                                ? "#B799FF"
                                : "transparent",
                            }}
                            className="d-flex justify-content-center align-items-center"
                            htmlFor={"_" + index + size}
                          >
                            <span style={{ userSelect: "none" }}>{size}</span>
                          </label>
                          <input
                            type="checkbox"
                            value={size}
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                            style={{ opacity: 0 }}
                            name={"_" + index + size}
                            id={"_" + index + size}
                            className={`${styles.hidden}`}
                          />
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <span style={{ userSelect: "none" }}>
                      Price:{" "}
                      <b>
                        {minValue}VNĐ - {maxValue}VNĐ
                      </b>
                    </span>
                  </div>
                  <div
                    className={`col-md-5 col-lg-3 ${styles["select-price"]}`}
                  >
                    <input
                      type="range"
                      className={`${styles["price-min"]} ${styles["range-slider"]} form-range mb-2`}
                      min={0}
                      max={getMaxPrice()}
                      value={minValue === Infinity ? 10000 : minValue}
                      step="10000"
                      onChange={handleMinChange}
                    />
                    <input
                      type="range"
                      className={`${styles["price-max"]} ${styles["range-slider"]} form-range`}
                      min={0}
                      max={getMaxPrice()}
                      value={maxValue}
                      step="10000"
                      onChange={handleMaxChange}
                    />
                  </div>
                </div>
              </form>
              <a
                href="#"
                onClick={handleFilterSubmit}
                className={styles["filter-button"]}
              >
                Lọc
              </a>
              <div className={styles["sort-section"]}>
                <span style={{ userSelect: "none" }}>Sort order:</span>
                <a
                  href="#"
                  onClick={handlePriceSortasc}
                  className={`${sortOrder === "asc" ? styles["active"] : ""}`}
                >
                  <span style={{ userSelect: "none" }}>ASC</span>
                </a>
                <a
                  href="#"
                  onClick={handlePriceSortdesc}
                  className={`${sortOrder === "desc" ? styles["active"] : ""}`}
                >
                  <span style={{ userSelect: "none" }}>DESC</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={`${styles["render-product"]}`}>
          <div>
            <h2>Kết quả tìm kiếm cho: {searchName} </h2>
            {selectedColors.length > 0 && (
              <div style={{ display: "flex" }}>
                <h5>Selected Colors:</h5>
                <ul className="d-flex" style={{ listStyle: "none", whiteSpace: "pre-wrap" }}>
                  {selectedColors.map((color, index) => (
                    <li key={color.colorcode}>
                      {color.colorname}
                      {index < selectedColors.length - 1 && ", "}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedSizes.length > 0 && (
              <div style={{ display: "flex" }}>
                <h5>Selected Sizes:</h5>
                <ul className="d-flex" style={{ listStyle: "none", whiteSpace: "pre-wrap" }}>
                  {selectedSizes.map((size, index) => (
                    <li key={size}>
                      {size}
                      {index < selectedSizes.length - 1 && ", "}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <hr />
          {isLoading ? (
            <LoadingView />
          ) : (
            <div> <div className={`${styles.content}`}>
              {filteredProductsList.length > 0 ? (
                filteredProductsList.map((product: Product) => (                 
                  <ProductShow
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imgUrl={product.imageurl}
                  />
                ))
                
              ) : (
                showNoResults ? (
                  <p style={{fontSize:"1.3rem", fontWeight:"500"}}>Không tìm thấy kết quả nào.</p>
                ) : null
              )}</div>
            </div>    
          )}
        </div>
        {isLoadmore && <LoadingView />}
        {filteredProductsList.length > 0 && hasMoreProducts && (
          <div className={`mt-3 ${styles["btn-load"]}`}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleLoadMore}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-compact-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                ></path>
              </svg>
            </button>
          </div>
        )}

        {filteredProductsList.length > 0 && !hasMoreProducts && (
          <div className="d-flex justify-content-center">
            <strong>There are no products left to show.</strong>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchResult;
