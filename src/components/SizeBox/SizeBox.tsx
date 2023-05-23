import { useState } from "react";
import style from "./sizebox.module.css";
import { Product } from "../../utilities/utils";

export type SizeBoxProps = {
  sizes: string[];
  setSize: (color: string | undefined) => void;
  selectedSize: string | undefined;
  protentialSizes: string[];
};

function SizeBox({
  sizes,
  setSize,
  protentialSizes,
  selectedSize,
}: SizeBoxProps) {
  return (
    <div className="mt-3">
      <h4>Size</h4>

      <div className="d-flex gap-2">
        {sizes.map((size) => {
          return (
            <div
              className={` d-flex justify-content-center align-items-center ${
                size == selectedSize ? style.selected : ""
              } ${protentialSizes.includes(size) ? "" : style.disabled}`}
              key={size}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "40px",
                height: "40px",
              }}
              onClick={(e) => {
                if (protentialSizes.includes(size)) {
                  if (size != selectedSize) {
                    setSize(size);
                  } else {
                    setSize(undefined);
                  }
                }
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
