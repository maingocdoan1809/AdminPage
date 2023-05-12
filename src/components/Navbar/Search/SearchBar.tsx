import { useEffect, useState } from "react";
import styles from "./search.module.css";
import { useNavigate } from "react-router";

interface SearchBarProps {
  onSearch: (
    query: string,
    color?: string[],
    minPrice?: number,
    maxPrice?: number
  ) => void;
}

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 10,
    color: "red",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jeans",
    price: 20,
    color: "blue",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Sweater",
    price: 30,
    color: "green",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Dress",
    price: 40,
    color: "red",
    image: "https://via.placeholder.com/150",
  },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("q", query);

    // Chuyển đổi mảng products thành mảng colors
    const selectedColors = colors.filter((color) =>
      products.some((product) => product.color === color)
    );
    if (selectedColors.length > 0) {
      params.set("colors", selectedColors.join(","));
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      params.set("minPrice", String(minPrice));
      params.set("maxPrice", String(maxPrice));
    }

    navigate(`/search?${params.toString()}`);
    onSearch(query, selectedColors, minPrice, maxPrice);
  };
  return (
    <>
      <div className={`nav-link ${styles["collapse-container"]}`}>
        <div
          data-bs-toggle="collapse"
          data-bs-target="#search-collapse"
          aria-expanded="false"
          aria-controls="search-collapse"
          className={`${styles["search-btn"]}`}
        >
          Search
        </div>
        <div className={`${styles["search-collapse"]} search-box`}>
          <div className="collapse" id="search-collapse">
            <div className="card card-body">
              <div className="d-flex justify-content-end flex-column">
                <input
                  type="search"
                  className="form-control mb-3"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="mb-3">
                  <label htmlFor="range">Price:</label>
                  <div className="d-flex gap-3 justify-content-center align-items-center">
                    <label htmlFor="minPrice">Min price:</label>
                    <select
                      id="minPrice"
                      value={minPrice !== undefined ? minPrice : ""}
                      onChange={(e) =>
                        setMinPrice(
                          e.target.value !== ""
                            ? Number(e.target.value)
                            : undefined
                        )
                      }
                    >
                      <option value="">Any</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                    <label htmlFor="maxPrice">Max price:</label>
                    <select
                      id="maxPrice"
                      value={maxPrice !== undefined ? maxPrice : ""}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value !== ""
                            ? Number(e.target.value)
                            : undefined
                        )
                      }
                    >
                      <option value="">Any</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                    </select>
                  </div>
                </div>
                {/* Color */}
                <div className="d-flex mb-3 justify-content-between align-items-center">
                  <label htmlFor="color">Color</label>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                  >
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck1"
                      autoComplete="off"
                      checked={colors.includes("red")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColors([...colors, "red"]);
                        } else {
                          setColors(colors.filter((c) => c !== "red"));
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck1"
                    >
                      Red
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck2"
                      autoComplete="off"
                      checked={colors.includes("green")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColors([...colors, "green"]);
                        } else {
                          setColors(colors.filter((c) => c !== "green"));
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck2"
                    >
                      Green
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck3"
                      autoComplete="off"
                      checked={colors.includes("blue")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColors([...colors, "blue"]);
                        } else {
                          setColors(colors.filter((c) => c !== "blue"));
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck3"
                    >
                      Blue
                    </label>
                  </div>
                </div>
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
