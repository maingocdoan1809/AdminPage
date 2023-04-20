import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../utilities/debounce";
import React from "react";

export type ValidInputProps = {
  style?: {};
  type?: string;
  className?: string[];
  callBack: (text: string) => void;
  isValid?: boolean;
  identifier?: string;
  placeholder?: string;
};

function ValidInput(props: ValidInputProps) {
  const [state, setState] = useState("");
  const debounce = useDebounce((value) => {
    props.callBack(value);
  }, 500);
  return (
    <>
      <input
        value={state}
        onChange={(e) => {
          debounce(e.target.value);
          setState(e.target.value);
        }}
        id={props.identifier ?? ""}
        name={props.identifier ?? ""}
        placeholder={props.placeholder ?? ""}
        type={props.type || "text"}
        className={`form-control ${props.className?.map((c) => c)} ${
          props.isValid == undefined
            ? ""
            : props.isValid == true
            ? "is-valid"
            : "is-invalid"
        }`}
      />
    </>
  );
}

export default React.memo(ValidInput);
