import { useLocation } from "react-router";
import Navbar from "../Navbar/Navbar";
import Carousel from "../Carousel/Carousel";
import style from "./productdetail.module.css";
import { Product, toMoney } from "../../utilities/utils";
import ColorBox from "../ColorBox/ColorBox";
import SelectBox from "../SelectBox/SelectBox";
import CommentBox from "../CommentBox/CommentBox";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../env";
import LoadingView from "../LoadingView/LoadingView";
import Layout from "../../layouts/CustomerLayout/Layout";

function ProductDetail() {
  const location = useLocation();
  const idproductinfo = location.state.id;
  const [products, setProducts] = useState([] as Product[]);
  useEffect(() => {
    fetch(BACKEND_URL + `/products/${idproductinfo}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
    ``;
  }, []);

  return products.length == 0 ? (
    <LoadingView />
  ) : (
    <div className="mt-4 container position-relative">
      <div className="row d-flex gap-5">
        <div className="col-lg-5 col-sm-12">
          <div className="position-relative">
            <Carousel imgUrls={products.map((e) => e.imageurl)} />
          </div>
          <div className=" mt-5">
            <div className="">
              <a
                className={`${style["expand-btn"]}`}
                data-bs-toggle="collapse"
                href="#collapsedescription"
                role="button"
                aria-expanded="false"
                aria-controls="collapsedescription"
              >
                <h2>
                  Description{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </h2>
              </a>
              <div className="collapse" id="collapsedescription">
                <div>{products[0].description}</div>
              </div>
            </div>
            <hr />
            <div>
              <CommentBox idproductinfo={idproductinfo!} />
            </div>
          </div>
        </div>
        <div
          className={`col-lg-6 col-sm-12  ${style["sticky-top"]} `}
          id="select-box"
        >
          <div
            className={`${style["btn-close"]}`}
            onClick={(e) => {
              const selectbox = document.getElementById("select-box");
              selectbox?.classList.remove(style.show);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
          <div className="row">
            <h1 className={` col-8 ${style["title"]}`}> {products[0].name}</h1>
          </div>
          <div>
            <h3 className="text-secondary">
              {toMoney(products[0].promotedprice || products[0].price)}
            </h3>
          </div>
          <div className="mt-5">
            <small>Thế giới thú vị của những khối Lego</small>
          </div>

          <hr />
          <div>
            <SelectBox products={products!} />
          </div>
        </div>
      </div>
      <div
        className={`${style.btn}`}
        onClick={(e) => {
          const selectbox = document.getElementById("select-box");
          selectbox?.classList.add(style.show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bag-plus"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
          />
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
      </div>
    </div>
  );
}

export default ProductDetail;
