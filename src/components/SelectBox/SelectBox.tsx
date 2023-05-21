import SizeBox from "../SizeBox/SizeBox";
import ColorBox, { ColorBoxProps } from "../ColorBox/ColorBox";
import { useContext, useState } from "react";
import { Product } from "../../utilities/utils";
import Cart from "../Cart/Cart";
import ReactDOM from "react-dom";
import { CartItem } from "../../utilities/utils"
import { NewItemDataContext, NewItemDataProvider } from "../../contexts/CartConText/CartConText";


export type SelectBoxProps = {
  products: Product[];
};

export type SelectBoxState = {
  selectedId: Product | undefined;
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  selectedQuantity: number;
};

function SelectBox({ products  }: SelectBoxProps) {
  
  const [selectOptions, setSelectOptions] = useState({
    selectedColor: undefined,
    selectedQuantity: 0,
    selectedSize: undefined,
    selectedId: undefined,
  } as SelectBoxState);
  // remove duplicate:

  const colorsAndSizes = products.flatMap((p) => {
    return [[p.colorcode, p.colorname, p.size, p.quantity]];
  });

  const colors = colorsAndSizes.map((p) => {
    return {
      code: p[0],
      name: p[1],
    };
  });
  const sizes = colorsAndSizes.map((p) => {
    return p[2];
  });

  const x: { code: string | number; name: string | number }[] = [];
  colors.forEach((c) => {
    for (let i of x) {
      if (JSON.stringify(c) == JSON.stringify(i)) {
        return;
      }
    }
    x.push(c);
  });
  const { setNewItemData } = useContext(NewItemDataContext)!;
  const handleAddToCart = () => {
    const newItemData = {
      id: selectOptions.selectedId ? selectOptions.selectedId.id : "",
      color: selectOptions.selectedColor || "",
      size: selectOptions.selectedSize || "",
      quantity: selectOptions.selectedQuantity,
      infoid: selectOptions.selectedId ? selectOptions.selectedId.infoid : "",
    };
    setNewItemData(newItemData);
  };


  const y = [...new Set(sizes)];

  return (
    <>
      <ColorBox
        colorcodes={x.map((p) => {
          return {
            code: p.code as string,
            name: p.name as string,
          };
        })}
        availableQuantity={
          selectOptions.selectedId ? selectOptions.selectedId.quantity : 1
        }
        selectColor={(color) => {
          setSelectOptions({
            ...selectOptions,
            selectedColor: color,
            selectedId:
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
            selectedId:
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
          selectOptions.selectedId ? selectOptions.selectedId.quantity : 1
        }
        sizes={y.map((p) => {
          return {
            name: p + "",
          };
        })}
      />
      <div className="mt-3">
        <h5>Quantity </h5>
        <input
          type="number"
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
        className="mt-5 btn btn-danger rounded-0 w-100"
        disabled={
          selectOptions.selectedColor &&
            selectOptions.selectedSize &&
            selectOptions.selectedQuantity > 0 &&
            selectOptions.selectedId
            ? false
            : true
        }
        onClick={(e) => {
          handleAddToCart();
          console.log(JSON.stringify(selectOptions));
        }}
      >
        Add to your cart
      </button >
    </>
  );
}

export default SelectBox;