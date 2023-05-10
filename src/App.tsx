import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/Error/Error";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SearchPage from "./pages/SearchPage/SearchPage";

const products = [
  { id: 1, name: "T-Shirt", price: 10, color: "red", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jeans", price: 20, color: "blue", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Sweater", price: 30, color: "green", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Dress", price: 40, color: "red", image: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage products={products} />}/>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
