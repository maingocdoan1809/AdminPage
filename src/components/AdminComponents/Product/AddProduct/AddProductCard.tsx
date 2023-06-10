import { useId, useRef, useState } from "react";
import style from "./addproduct.module.css";
import { Product } from "../../../../utilities/utils";
import { ColorUtil, ProductUtil, SizeOption } from "./AddProduct";
type AddProductCardProps = {
  p?: ProductUtil;
  infoId: string;
};
type Info = {
  colorcode: string;
  colorname: string;
  size: string;
  quantity: string | number;
  imgUrl?: string;
  imgFile?: File;
};

function AddProductCard({ p, infoId }: AddProductCardProps) {
  const id = useId();
  const ref = useRef<HTMLImageElement>(null!);

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
            sizes: [
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
      {product?.colors.map((color) => (
        <div className={`d-flex gap-2 ${style["sm-dflex-column"]}`}>
          <div>
            <label htmlFor={`${id}`} className="form-label">
              <img
                src={color?.imgUrl}
                alt="Ảnh sản phẩm"
                className={`${style.img}`}
                ref={ref}
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
                    ref.current.setAttribute("src", e.target?.result as string);
                  };
                  reader.readAsDataURL(e.target.files![0]);
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
                  <input
                    className="form-control"
                    type="text"
                    name="color"
                    placeholder="White"
                    value={color.colorname}
                  />
                </div>
                <div className="w-100">
                  <label htmlFor="code" className="form-label">
                    Color code (hexa)
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="code"
                    placeholder="Ex: #ffffff"
                    value={color.colorcode || ""}
                  />
                </div>
                <div className={`${style["flex-end"]}`}>
                  <span className="text-muted">Color preview</span>
                  <div
                    style={{
                      backgroundColor: `${color.colorcode}`,
                    }}
                    className={`${style["color-preview"]}`}
                  ></div>
                </div>
              </div>
              <div className="d-flex flex-column">
                {color.sizes.map((size, index) => (
                  <SizeBox
                    product={product}
                    setProduct={setProduct}
                    size={size}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  console.log(product);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

type SizeBoxProps = {
  product: ProductUtil;
  setProduct: (p: ProductUtil) => void;
  size: SizeOption;
};
function SizeBox({ size, setProduct, product }: SizeBoxProps) {
  return (
    <>
      <hr />
      <div key={size.size} className="d-flex gap-3">
        <div>
          <label htmlFor="">Size</label>
          <input
            type="text"
            className="form-control"
            value={size.size}
            onChange={(e) => {
              size.size = e.target.value;
              setProduct({
                ...product,
              });
            }}
          />
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
      </div>
    </>
  );
}

export default AddProductCard;
