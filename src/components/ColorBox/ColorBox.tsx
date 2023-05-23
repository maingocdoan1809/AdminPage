import { useState } from "react";
import style from "./colorbox.module.css";
import { Product } from "../../utilities/utils";
type ColorState = {
  code: string;
  name: string;
};

export type ColorBoxProps = {
  colorcodes: ColorState[];
  protentialColors: string[];
  selectedColor: string | undefined;
  setColor: (color: string | undefined) => void;
};

function ColorBox({
  colorcodes,
  protentialColors,
  setColor,
  selectedColor,
}: ColorBoxProps) {
  return (
    <div className="mt-3">
      <h4>
        Color
        {selectedColor && (
          <small>
            {" "}
            :{" "}
            {
              colorcodes.find((e) => {
                return e.code == selectedColor;
              })?.name
            }{" "}
          </small>
        )}
      </h4>
      <div className="d-flex gap-2">
        {colorcodes.map((colorcode) => {
          return (
            <div
              className={`${
                selectedColor == colorcode.code ? style.selected : ""
              } ${
                protentialColors.includes(colorcode.code) ? "" : style.disabled
              } `}
              key={colorcode.code}
              style={{
                backgroundColor: colorcode.code,
                width: "60px",
                height: "60px",
              }}
              onClick={(e) => {
                if (protentialColors.includes(colorcode.code)) {
                  if (selectedColor != colorcode.code) {
                    setColor(colorcode.code);
                  } else {
                    setColor(undefined);
                  }
                }
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorBox;
