import SizeBox from "../SizeBox/SizeBox";
import ColorBox from "../ColorBox/ColorBox";
import { useState } from "react";

export type SelectBoxProps = {
  idproductinfo: string;
};

export type SelectBoxState = {
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  selectedQuantity: number;
};

function SelectBox({ idproductinfo }: SelectBoxProps) {
  const [selectOptions, setSelectOptions] = useState({
    selectedColor: undefined,
    selectedQuantity: 0,
    selectedSize: undefined,
  } as SelectBoxState);

  return (
    <>
      <ColorBox
        colorcodes={[
          {
            code: "#F266AB",
            name: "Pink",
            quantity: 0,
          },
          {
            code: "#C88EA7",
            name: "Faded Pink",
            quantity: 10,
          },
        ]}
        selectColor={(color) => {
          setSelectOptions({
            ...selectOptions,
            selectedColor: color,
          });
        }}
      />
      <SizeBox
        selectSize={(size) => {
          setSelectOptions({
            ...selectOptions,
            selectedSize: size,
          });
        }}
        sizes={[
          {
            name: "XL",
            quantity: 0,
          },
          {
            name: "M",
            quantity: 20,
          },
        ]}
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
          console.log(
            "ID: " + idproductinfo + " - " + JSON.stringify(selectOptions)
          );
        }}
      >
        Add to your cart
      </button>
    </>
  );
}

export default SelectBox;
