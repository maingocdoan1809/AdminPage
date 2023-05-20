import { useState } from "react";
import style from "./colorbox.module.css";
type ColorState = {
  code: string;
  name: string;
  quantity: number;
};

export type ColorBoxProps = {
  colorcodes: ColorState[];
  selectColor: (color: string) => void;
};

function ColorBox({ colorcodes, selectColor }: ColorBoxProps) {
  const [selectedColor, setSelectedColor] = useState<ColorState | undefined>(
    undefined
  );
  return (
    <div className="mt-3">
      <h4>
        Color{" "}
        {selectedColor && (
          <span>
            {" : "}
            <small style={{ color: selectedColor.code }}>
              {selectedColor.name}
            </small>{" "}
          </span>
        )}
      </h4>
      <div className="d-flex gap-2">
        {colorcodes.map((colorcode) => {
          return (
            <div
              className={`${
                colorcode.code == selectedColor?.code ? style.selected : ""
              } ${colorcode.quantity > 0 ? "" : style.disabled}`}
              key={colorcode.code}
              style={{
                backgroundColor: colorcode.code,
                width: "60px",
                height: "60px",
              }}
              onClick={(e) => {
                if (colorcode.quantity > 0) {
                  e.stopPropagation();
                  selectColor(colorcode.code);
                  setSelectedColor(colorcode);
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
