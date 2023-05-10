import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  image: string;
}

interface SearchResultsProps {
  products: Product[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ products }) => {
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
      <h2>Kết quả tìm kiếm cho: {query}</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.color}</p>
              <p>${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
