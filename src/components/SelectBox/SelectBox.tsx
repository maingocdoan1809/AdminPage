import SizeBox from "../SizeBox/SizeBox";
import ColorBox, { ColorBoxProps } from "../ColorBox/ColorBox";
import { useState } from "react";
import { CartItem, Product } from "../../utilities/utils";
import { CART_KEY } from "../../env";
import style from "./selectbox.module.css";
export type SelectBoxProps = {
  products: Product[];
};

export type SelectBoxState = {
  product: Product | undefined;
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  selectedQuantity: number;
};

function SelectBox({ products }: SelectBoxProps) {
  const [selectOptions, setSelectOptions] = useState({
    selectedColor: undefined,
    selectedQuantity: 0,
    selectedSize: undefined,
    product: undefined,
  } as SelectBoxState);

  // remove duplicate:

  const colors = products.reduce(
    (pre, curr) => {
      const p = {
        code: curr.colorcode,
        name: curr.colorname,
      };
      for (let pr of pre) {
        if (pr.code == p.code) {
          return pre;
        }
      }
      return [...pre, p];
    },
    [] as {
      code: string;
      name: string;
    }[]
  );
  const sizes = products.reduce((pre, curr) => {
    return [...new Set([...pre, curr.size])];
  }, [] as string[]);

  const getProtentialColors = function () {
    // neu chua chon size thi tat ca cac mau la co the co
    if (selectOptions.selectedSize == undefined) {
      return products.reduce((pre, curr) => {
        return [...pre, curr.colorcode];
      }, [] as string[]);
    }
    // nếu chọn size rồi thì lọc ra các màu ứng với
    // size đã chọn mà có số lượng lớn hơn 0
    return products.reduce((pre, curr) => {
      if (selectOptions.selectedSize == curr.size && curr.quantity > 0) {
        return [...pre, curr.colorcode];
      }
      return [...pre];
    }, [] as string[]);
  };

  const getProtentialSizes = function () {
    if (selectOptions.selectedColor == undefined) {
      return products.reduce((pre, curr) => {
        return [...pre, curr.size];
      }, [] as string[]);
    }
    return products.reduce((pre, curr) => {
      if (selectOptions.selectedColor == curr.colorcode && curr.quantity > 0) {
        return [...pre, curr.size];
      }
      return [...pre];
    }, [] as string[]);
  };
  return (
    <>
      <ColorBox
        colorcodes={colors}
        setColor={(color) => {
          setSelectOptions({
            ...selectOptions,
            selectedColor: color,
            product:
              products.find((p) => {
                if (
                  p.colorcode == color &&
                  p.size == selectOptions.selectedSize
                ) {
                  return true;
                }
                return false;
              }) || undefined,
          });
        }}
        protentialColors={getProtentialColors()}
        selectedColor={selectOptions.selectedColor}
      />
      <SizeBox
        setSize={(size) => {
          setSelectOptions({
            ...selectOptions,
            selectedSize: size,
            product:
              products.find((p) => {
                if (
                  p.colorcode == selectOptions.selectedColor &&
                  p.size == size
                ) {
                  return true;
                }
                false;
              }) || undefined,
          });
        }}
        protentialSizes={getProtentialSizes()}
        selectedSize={selectOptions.selectedSize}
        sizes={sizes}
      />
      <div className="mt-3">
        <h5>Quantity </h5>
        <input
          type="number"
          pattern="[0-9]+"
          min={1}
          onChange={(e) => {
            setSelectOptions({
              ...selectOptions,
              selectedQuantity: Number.parseInt(e.target.value || "0"),
            });
          }}
          className="form-control w-25"
        />
      </div>
      <button
        className={`mt-5 btn btn-danger rounded-0 w-100 ${style["sticky-bottom"]}`}
        disabled={
          selectOptions.selectedColor &&
          selectOptions.selectedSize &&
          selectOptions.selectedQuantity > 0 &&
          selectOptions.product
            ? false
            : true
        }
        onClick={(e) => {
          // add to localstorage:

          saveCart({
            id: selectOptions.product?.id,
            color: selectOptions.product?.colorcode,
            size: selectOptions.selectedSize,
            name: selectOptions.product?.name,
            colorName: selectOptions.product?.colorname,
            imgUrl: selectOptions.product?.imageurl,
            originalPrice: selectOptions.product?.price,
            promotedPrice:
              selectOptions.product?.promotedprice == 0
                ? selectOptions.product.price
                : selectOptions.product?.promotedprice,
            quantity: selectOptions.selectedQuantity,
          } as CartItem);
        }}
      >
        Add to your cart
      </button>
    </>
  );
}

function saveCart(item: CartItem) {
  // first get all the items that already exist in storage:

  const oldCart = JSON.parse(
    localStorage.getItem(CART_KEY) || "[]"
  ) as CartItem[];
  let flag = false;
  for (let i of oldCart) {
    // check if item is in olcCart?
    if (i.id == item.id) {
      i.quantity += item.quantity;
      flag = true;
    }
  }
  if (!flag) {
    oldCart.push(item);
  }
  // save to localstorage:
  localStorage.setItem(CART_KEY, JSON.stringify(oldCart));
  alert("Your cart is ready.");
}
export default SelectBox;
