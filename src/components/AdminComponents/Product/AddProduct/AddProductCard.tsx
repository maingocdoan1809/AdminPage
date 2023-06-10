import { useId, useRef, useState } from "react";
import style from "./addproduct.module.css";
import { Product } from "../../../../utilities/utils";
import { ProductUtil } from "./AddProduct";
type AddProductCardProps = {
  product?: ProductUtil;
};
type Info = {
  colorcode: string;
  colorname: string;
  size: string;
  quantity: string | number;
  imgUrl?: string;
  imgFile?: File;
};

function AddProductCard({ product }: AddProductCardProps) {
  const id = useId();
  const ref = useRef<HTMLImageElement>(null!);
  const [info, setInfo] = useState<Info>({
    colorcode: product?.colorcode || "",
    colorname: product?.colorname || "",
    quantity: product?.quantity || "",
    size: product?.size || "",
    imgUrl:
      product?.imageurl ||
      "https://th.bing.com/th/id/R.3f59d49f9088c8344be742f7eb4406f7?rik=QUDlwvZd9JMcKA&riu=http%3a%2f%2ficon-library.com%2fimages%2fphoto-placeholder-icon%2fphoto-placeholder-icon-17.jpg&ehk=riCMMCU3S%2fT5sthLmPPyozcjKbAku1vxzZej7CcVj6Q%3d&risl=&pid=ImgRaw&r=0",
  });
  return (
    <>
      <div className={`d-flex gap-2 ${style["sm-dflex-column"]}`}>
        <div>
          <label htmlFor={`${id}`} className="form-label">
            <img
              src={info.imgUrl}
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
                  value={info.colorname}
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
                  value={info.colorcode || ""}
                />
              </div>
              <div className={`${style["flex-end"]}`}>
                <span className="text-muted">Color preview</span>
                <div
                  style={{
                    backgroundColor: `${info.colorcode}`,
                  }}
                  className={`${style["color-preview"]}`}
                ></div>
              </div>
            </div>
            <div className="d-flex gap-3"></div>
          </div>
          <div className="text-end">
            <button className="btn btn-sm btn-danger">
              {product ? "Save" : "+ Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type SizeOption = {
  size: string;
  quantity: number;
};
type SizeBoxProps = {
  setSizes: (options: SizeOption[]) => void;
  options: SizeOption[];
};
function SizeBox({ options, setSizes }: SizeBoxProps) {
  return (
    <>
      {options.map((option) => (
        <>
          <div>
            <label htmlFor="size" className="form-label">
              Size
            </label>
            <input
              className="form-control"
              type="text"
              name="size"
              placeholder="M"
              value={option.size}
            />
          </div>
          <div>
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              className="form-control"
              type="text"
              name="quantity"
              placeholder="10"
              value={option.quantity}
            />
          </div>
        </>
      ))}
    </>
  );
}

export default AddProductCard;
