import { useEffect, useState } from "react";
import style from "./addproduct.module.css";
import AddProductCard from "./AddProductCard";
import { useParams } from "react-router";
import { Product } from "../../../../utilities/utils";
type Props = {
  onClose: (b: boolean) => void;
  products: Product[];
};
export type SizeOption = {
  size: string;
  quantity: number;
  productId: string;
};
export type ColorUtil = {
  colorname: string;
  colorcode: string;
  imgUrl: string;
  imgFile?: File;
  sizes: SizeOption[];
};
export type ProductUtil = {
  idInfo: string;
  colors: ColorUtil[];
};

function AddProduct({ onClose, products }: Props) {
  const [cards, setCards] = useState(() => {
    const temp = [];
    const map = new Map<string, ProductUtil>();
    products.forEach((product) => {
      if (!map.has(product.colorcode)) {
        map.set(product.colorcode, {
          idInfo: product.infoid,
          colors: [
            {
              colorcode: product.colorcode,
              colorname: product.colorname,
              imgUrl: product.imageurl,
              sizes: [
                {
                  productId: product.id,
                  quantity: product.quantity,
                  size: product.size,
                },
              ],
            },
          ],
        } as ProductUtil);
      } else {
        const p = map.get(product.colorcode);
        const pwithcolor = p?.colors.find(
          (f) => f.colorcode == product.colorcode
        );
        if (pwithcolor == undefined) {
          p?.colors.push({
            colorcode: product.colorcode,
            colorname: product.colorname,
            imgUrl: product.imageurl,
            sizes: [
              {
                productId: product.id,
                quantity: product.quantity,
                size: product.size,
              },
            ],
          });
        } else {
          pwithcolor.sizes.push({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
          });
        }
      }
    });
    console.log(map);

    for (let product of map.keys()) {
      temp.push(
        <AddProductCard infoId={products[0].infoid} p={map.get(product)} />
      );
    }
    return temp;
  });
  return (
    <>
      <div className={style.wrapper}></div>

      <div className={`${style.container}`}>
        <div
          className={`${style["btn-close"]}`}
          onClick={() => {
            onClose(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className={`bi bi-x-lg`}
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div className="mt-5 p-3">
          {cards.map((card, index) => (
            <div key={index}>
              {card} <hr />
            </div>
          ))}
          <div className="d-flex justify-content-end gap-3">
            <div
              className={`${style["btn-add"]}`}
              onClick={(e) => {
                setCards([
                  ...cards,
                  <AddProductCard infoId={products[0].infoid} />,
                ]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-file-earmark-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
