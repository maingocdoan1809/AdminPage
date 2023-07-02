import { ReactNode, useId, useRef, useState } from "react";
import style from "./addproduct.module.css";
import { Product, checkHexColor, toMoney } from "../../../../utilities/utils";
import { ColorUtil, ProductUtil, SizeOption } from "./AddProduct";
import { BACKEND_URL } from "../../../../env";
import Editable from "../../../Editable/Editable";
type AddProductCardProps = {
  p?: ProductUtil;
  infoId: string;
};

function AddProductCard({ p, infoId }: AddProductCardProps) {
  const id = useId();
  const ref = useRef<HTMLImageElement>(null!);
  const newSizeRef = useRef<SizeOption>(null!);
  const [newSizes, setNewSizes] = useState([] as SizeOption[]);
  const [product, setProduct] = useState(() => {
    if (p == undefined) {
      return {
        idInfo: infoId,
        colors: [
          {
            colorcode: "",
            colorname: "",
            imgUrl:
              " https://th.bing.com/th/id/R.a664e8efd2b722a9efcb05adc759c9f4?rik=WFJNsnHIe9%2bv3Q&pid=ImgRaw&r=0",
            newSizes: [
              {
                size: "",
                quantity: 0,
                productId: "",
              },
            ],
          },
        ],
      } as ProductUtil;
    }
    return p;
  });

  return (
    <>
      {product.colors.map((color, index) => (
        <>
          <div
            className={` d-flex gap-2 ${style["sm-dflex-column"]}`}
            key={index}
          >
            <div className="position-relative d-flex justify-content-center align-items-center m-0 p-0">
              <label
                htmlFor={`${id}`}
                className="w-100 d-flex justify-content-center align-items-center  form-label position-relative"
              >
                <img
                  src={color?.imgUrl}
                  alt="Ảnh sản phẩm"
                  className={`${style.img}`}
                  ref={ref}
                  onChange={(e) => {}}
                />
              </label>
              <input
                className={`form-control ${style.hidden}`}
                id={id}
                type="file"
                name={id}
                onChange={(e) => {
                  if (e.target.files) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      ref.current.setAttribute(
                        "src",
                        e.target?.result as string
                      );
                    };
                    reader.readAsDataURL(e.target.files![0]);
                    color.imgFile = e.target.files[0];
                  }
                }}
              />
            </div>
            <div className="d-flex flex-column justify-content-between flex-grow-1 gap-3 p-3 w-100">
              <div className={`d-flex gap-3 flex-column `}>
                <div className={`d-flex gap-3 ${style["sm-dflex-column"]}`}>
                  <div>
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>
                    {!p ? (
                      <input
                        value={color.colorname}
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          color.colorname = e.target.value;
                          setProduct({ ...product });
                        }}
                      />
                    ) : (
                      <Editable
                        type="text"
                        name="color"
                        value={color.colorname}
                        canEdit={false}
                      />
                    )}
                  </div>
                  <div className="w-100">
                    <label htmlFor="code" className="form-label">
                      Color code (hexa)
                    </label>
                    {!p ? (
                      <input
                        value={color.colorcode}
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          if (checkHexColor(e.target.value)) {
                            e.target.classList.remove("is-invalid");
                            e.target.classList.add("is-valid");
                          } else {
                            e.target.classList.remove("is-valid");
                            e.target.classList.add("is-invalid");
                          }
                          color.colorcode = e.target.value;
                          setProduct({ ...product });
                        }}
                      />
                    ) : (
                      <Editable
                        type="text"
                        name="code"
                        value={color.colorcode || ""}
                        canEdit={false}
                      />
                    )}
                  </div>
                  {checkHexColor(color.colorcode) ? (
                    <div className={`${style["flex-end"]}`}>
                      <span className="text-muted">Color preview</span>
                      <div
                        style={{
                          backgroundColor: `${color.colorcode}`,
                        }}
                        className={`${style["color-preview"]}`}
                      ></div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex flex-column">
                  {p &&
                    color.sizes &&
                    color.sizes.map((size, index) => (
                      <SizeBox
                        product={product}
                        setProduct={setProduct}
                        size={size}
                        key={index}
                      />
                    ))}
                  {color.newSizes?.map((size, index) => {
                    return (
                      <SizeBox
                        product={product}
                        setProduct={setProduct}
                        size={size}
                        key={color.sizes?.length + index + 1}
                        isNew={true}
                        newestRef={newSizeRef}
                        sizes={color.newSizes}
                        isLast={index == color.newSizes!.length - 1}
                      />
                    );
                  })}
                  <div className="d-flex">
                    <div
                      className={`p-2 mt-2 ${style["btn-add-size"]}`}
                      onClick={() => {
                        if (!newSizeRef.current) {
                          newSizeRef.current = {
                            productId: "",
                            quantity: 0,
                            size: "",
                          };
                          if (color.newSizes == undefined) {
                            color.newSizes = [];
                          }
                          color.newSizes.push(newSizeRef.current);
                          setProduct({ ...product });
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    pattern="[0-9]*"
                    value={color.price}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value);
                      if (isNaN(newPrice)) {
                        return;
                      }
                      color.price = newPrice;
                      setProduct({ ...product });
                    }}
                  />
                </div>
              </div>
              <div className="justify-content-end d-flex gap-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    fetch(BACKEND_URL + "/products/" + product.idInfo, {
                      method: "POST",
                      body: JSON.stringify({
                        ...color,
                      } as ColorUtil),
                    })
                      .then(async (res) => {
                        console.log(await res.json());
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Save
                </button>
                {!p && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => {
                      product.colors.pop();
                      setProduct({ ...product });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr />
        </>
      ))}
    </>
  );
}

type SizeBoxProps = {
  product: ProductUtil;
  setProduct: (p: ProductUtil) => void;
  size: SizeOption;
  isNew?: boolean;
  newestRef?: any;
  isLast?: boolean;
  sizes?: SizeOption[];
};
function SizeBox({
  size,
  setProduct,
  product,
  isNew,
  newestRef,
  sizes,
  isLast,
}: SizeBoxProps) {
  return (
    <>
      <hr />
      <div className="d-flex align-items-center gap-3">
        <div>
          <label htmlFor="">Size</label>
          {isNew ? (
            <input
              type="text"
              className="form-control"
              value={size.size}
              onChange={(e) => {
                if (e.target.value != "") {
                  newestRef.current = undefined;
                } else {
                  newestRef.current = e.target;
                }
                size.size = e.target.value;
                setProduct({
                  ...product,
                });
              }}
            />
          ) : (
            <Editable value={size.size} canEdit={false} type="text" />
          )}
        </div>
        <div>
          <label htmlFor="">Quantity</label>
          <input
            pattern="[0-9]*"
            type="text"
            className="form-control"
            value={size.quantity}
            onChange={(e) => {
              let newQuantity = 0;
              newQuantity = Number(e.target.value);
              if (isNaN(newQuantity)) {
                return;
              }
              size.quantity = newQuantity;
              setProduct({
                ...product,
              });
            }}
          />
        </div>

        {isNew && isLast && (
          <div className="text-danger">
            <div>
              <label htmlFor=""></label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
              onClick={(e) => {
                newestRef.current = undefined;
                sizes?.pop();
                setProduct({ ...product });
              }}
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}

export default AddProductCard;
