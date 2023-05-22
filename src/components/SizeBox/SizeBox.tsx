import { useState } from "react";
import style from "./sizebox.module.css";

export type SizeBoxProps = {
  sizes: string[];
  selectSize: (color: string) => void;
  availableQuantity: number;
};

function SizeBox({ sizes, selectSize, availableQuantity }: SizeBoxProps) {
  const [selectedSize, setselectedSize] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="mt-3">
      <h4>Size</h4>

      <div className="d-flex gap-2">
        {sizes.map((size) => {
          return (
            <div
              className={`${
                size == selectedSize ? style.selected : ""
              } d-flex justify-content-center align-items-center ${
                availableQuantity > 0 && size == selectedSize
                  ? ""
                  : style.disabled
              }`}
              key={size}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "40px",
                height: "40px",
              }}
              onClick={(e) => {
                // if (availableQuantity > 0) {
                e.stopPropagation();
                selectSize(size);
                setselectedSize(size);
                // }
              }}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SizeBox;
