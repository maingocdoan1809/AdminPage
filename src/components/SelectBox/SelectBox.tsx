import SizeBox from "../SizeBox/SizeBox";
import ColorBox, { ColorBoxProps } from "../ColorBox/ColorBox";
import { useState } from "react";
import { Product } from "../../utilities/utils";

export type SelectBoxProps = {
  products: Product[];
};

export type SelectBoxState = {
  selectedId: string | undefined;
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  selectedQuantity: number;
};

function SelectBox({ products }: SelectBoxProps) {
  const [selectOptions, setSelectOptions] = useState({
    selectedColor: undefined,
    selectedQuantity: 0,
    selectedSize: undefined,
    selectedId: undefined,
  } as SelectBoxState);
  // remove duplicate:

  const colorSet = new Set();
  const sizeSet = new Set();
  products.forEach((product) => {
    colorSet.add(product.colorcode);
    sizeSet.add(product.size);
  });

  return (
    <>
      <ColorBox
        colorcodes={products.map((p) => {
          return {
            code: p.colorcode,
            name: p.colorname,
            quantity: p.quantity,
          };
        })}
        selectColor={(color) => {
          setSelectOptions({
            ...selectOptions,
            selectedColor: color,
            selectedId: products.find((p) => {
              if (
                p.colorcode == color &&
                p.size == selectOptions.selectedSize
              ) {
                return p;
              }
            })?.id,
          });
        }}
      />
      <SizeBox
        selectSize={(size) => {
          setSelectOptions({
            ...selectOptions,
            selectedSize: size,
            selectedId: products.find((p) => {
              if (
                p.colorcode == selectOptions.selectedColor &&
                p.size == size
              ) {
                return p;
              }
            })?.id,
          });
        }}
        sizes={products.map((p) => {
          return {
            name: p.size,
            quantity: p.quantity,
          };
        })}
      />
      <div className="mt-3">
        <h5>Quantity </h5>
        <input
          type="number"
          value={selectOptions.selectedQuantity}
          onChange={(e) => {
            setSelectOptions({
              ...selectOptions,
              selectedQuantity: Number.parseInt(e.target.value),
            });
          }}
          className="form-control w-25"
        />
      </div>
      <button
        className="mt-5 btn btn-danger rounded-0 w-100"
        disabled={
          selectOptions.selectedColor &&
          selectOptions.selectedSize &&
          selectOptions.selectedQuantity > 0
            ? false
            : true
        }
        onClick={(e) => {
          console.log(JSON.stringify(selectOptions));
        }}
      >
        Add to your cart
      </button>
    </>
  );
}

export default SelectBox;
