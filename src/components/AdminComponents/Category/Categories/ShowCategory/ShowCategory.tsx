import { useState } from "react";
import style from "./showcategory.module.css";
import ValidInput from "../../../../ValidInput/ValidInput";
import { BACKEND_URL } from "../../../../../env";
import { Category } from "../Categories";
import Editable from "../../../../Editable/Editable";

type ShowCategoryProps = {
  category?: Category;
  trigger: () => void;
};

function ShowCategory({ category, trigger }: ShowCategoryProps) {
  const [isShow, setIsShow] = useState(false);
  const [isValidCategory, setIsValidCategory] = useState<boolean | undefined>(
    undefined
  );
  const [created, setCreated] = useState<boolean | undefined>(undefined);
  const [categoryName, setCategoryName] = useState(
    category ? category.name : ""
  );
  const [submiting, setSubmiting] = useState(false);
  return (
    <>
      <div>
        <button
          onClick={(e) => {
            setIsShow(!isShow);
          }}
          className={`btn btn-${
            category ? (category.count == 0 ? "danger" : "warning") : "success"
          }`}
        >
          {category
            ? category.count == 0
              ? "Edit Or Remove"
              : "Edit"
            : "Add +"}
        </button>
      </div>

      <div
        className={`${isShow ? style["show"] : style["fade"]} ${style.card}`}
      >
        <div
          className={`${style["btn-close"]}`}
          onClick={(e) => {
            setIsShow(!isShow);
            setCreated(undefined);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
        <div className={`${style.content}`}>
          <h4>New Category</h4>
          <div className="flex-grow-1 container d-flex align-items-center w-100 flex-column gap-3">
            {category && (
              <div className="flex-grow-1 w-100">
                <label htmlFor="name" className="form-label">
                  Category ID
                </label>
                <Editable type="text" canEdit={false} value={category.id} />
              </div>
            )}
            <div className="flex-grow-1 w-100">
              <label htmlFor="name" className="form-label">
                Category name
              </label>
              <ValidInput
                type="text"
                initialValue={categoryName}
                isValid={isValidCategory}
                callBack={(value) => {
                  if (value == "") {
                    setIsValidCategory(undefined);
                  } else {
                    fetch(BACKEND_URL + `/categories?name=${value}`)
                      .then((response) => response.json())
                      .then((category) => {
                        setIsValidCategory(category.length == 0);
                      });
                  }
                  setCategoryName(value);
                }}
                delay={1000}
                textIfInvalid={
                  categoryName == ""
                    ? "Please fill in this blank."
                    : "This name is already exist. Choose another name."
                }
              />
            </div>
          </div>
          {created == true ? (
            <div className="alert alert-success w-100">Created</div>
          ) : created == false ? (
            <div className="alert alert-danger w-100">
              There's an error. Try again
            </div>
          ) : (
            ""
          )}

          <div className="container d-flex gap-3">
            <button
              onClick={(e) => {
                if (categoryName == "") {
                  setIsValidCategory(false);
                } else if (isValidCategory == true) {
                  setSubmiting(true);
                  fetch(
                    BACKEND_URL +
                      `/categories${category ? "/" + category.id : ""}`,
                    {
                      method: category ? "PUT" : "POST",
                      body: JSON.stringify({ name: categoryName }),
                    }
                  ).then((response) => {
                    // created
                    console.log(response);

                    if (response.status == 201) {
                      //  force parent component to re-render
                      trigger();
                      setIsShow(false);
                      setCreated(true);
                    } else {
                      setCreated(false);
                    }
                    setSubmiting(false);
                    setCategoryName("");
                  });
                }
              }}
              className="w-100 btn btn-primary"
            >
              {submiting ? (
                <div
                  className="spinner-border text-warning spinner-border-sm "
                  role="status"
                ></div>
              ) : category ? (
                "Edit"
              ) : (
                "Add"
              )}
            </button>
            {category && category.count == 0 && (
              <button
                onClick={(e) => {
                  fetch(BACKEND_URL + "/categories/" + category.id, {
                    method: "delete",
                    body: JSON.stringify({ name: categoryName }),
                  }).then((res) => {
                    if (res.status == 200) {
                      setIsShow(false);
                      trigger();
                      alert("Deleted");
                    }
                    if (res.status == 408) {
                      console.log("err");
                    }
                  });
                }}
                className="btn btn-danger"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${style["back-drop"]} ${
          isShow ? style["show"] : style["fade"]
        }`}
      ></div>
    </>
  );
}

export default ShowCategory;
