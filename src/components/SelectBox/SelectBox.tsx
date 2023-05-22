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

  return (
    <>
      <ColorBox
        colorcodes={colors}
        availableQuantity={
          selectOptions.product ? selectOptions.product.quantity : 1
        }
        selectColor={(color) => {
          setSelectOptions({
            ...selectOptions,
            selectedColor: color,
            product:
              products.find((p) => {
                if (
                  p.colorcode == color &&
                  p.size == selectOptions.selectedSize
                ) {
                  return p;
                }
              }) || ({} as Product),
          });
        }}
      />
      <SizeBox
        selectSize={(size) => {
          setSelectOptions({
            ...selectOptions,
            selectedSize: size,
            product:
              products.find((p) => {
                if (
                  p.colorcode == selectOptions.selectedColor &&
                  p.size == size
                ) {
                  return p;
                }
              }) || ({} as Product),
          });
        }}
        availableQuantity={
          selectOptions.product ? selectOptions.product.quantity : 1
        }
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
            color: selectOptions.product?.colorname,
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
