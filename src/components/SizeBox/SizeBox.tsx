import { useState } from "react";
import style from "./sizebox.module.css";
type SizeState = {
  name: string;
};

export type SizeBoxProps = {
  sizes: SizeState[];
  selectSize: (color: string) => void;
  availableQuantity: number;
};

function SizeBox({ sizes, selectSize, availableQuantity }: SizeBoxProps) {
  const [selectedSize, setselectedSize] = useState<SizeState | undefined>(
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
                size.name == selectedSize?.name ? style.selected : ""
              } d-flex justify-content-center align-items-center ${
                availableQuantity > 0 && size.name == selectedSize?.name
                  ? ""
                  : style.disabled
              }`}
              key={size.name}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "40px",
                height: "40px",
              }}
              onClick={(e) => {
                // if (availableQuantity > 0) {
                e.stopPropagation();
                selectSize(size.name);
                setselectedSize(size);
                // }
              }}
            >
              {size.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SizeBox;
