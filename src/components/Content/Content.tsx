import { useMemo, useState } from "react";
import ValidInput from "../ValidInput/ValidInput";
import style from "./content.module.css";

function Content() {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState<boolean | undefined>(
    undefined
  );
  console.log(password);
  return (
    <div className={`${style.content}`}>
      {useMemo(
        () => (
          <ValidInput
            key={1}
            callBack={async (text: string) => {
              if (text == "") {
                setIsValid(undefined);
                setUsername("");
                return;
              }
              const data = await fetch("https://ye517l-3000.csb.app/", {
                method: "get",
              });
              const json = await data.json();
              setIsValid(text == json.username);
              setUsername(text);
            }}
            isValid={isValid}
            className={["1"]}
          />
        ),
        [isValid]
      )}
      {useMemo(
        () => (
          <ValidInput
            key={2}
            callBack={(text: string) => {
              setPassword(text);
            }}
          />
        ),
        []
      )}
    </div>
  );
}

export default Content;
