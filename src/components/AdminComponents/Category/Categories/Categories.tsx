import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../env";
import style from "./categories.module.css";
import LoadingView from "../../../LoadingView/LoadingView";
import AddCategory from "./AddCategory/AddCategory";
export type Category = {
  id: string;
  name: string;
  count: number;
};

function Categories() {
  const [categories, setCategories] = useState([] as Category[]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.title = "Category";

    fetch(BACKEND_URL + "/categories")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <LoadingView />
        </div>
      ) : (
        <div className="flex-grow-1 d-flex flex-column">
          <div className="shadow-sm mb-3 p-2">
            <AddCategory />
          </div>
          <div className={`flex-grow-1 p-3 m-0  ${style.container}`}>
            {categories.length > 0 && (
              <div className={`table-responsive-lg`}>
                <h3 className="mb-3">List of available categories</h3>

                <table className="table table-striped table-hover">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th className={`${style["small-col"]}`}>#</th>
                      <th className={` ${style["small-col"]}`}>ID</th>
                      <th className="">Name</th>
                      <th className="">Num of Products</th>
                      <th className=""></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {categories.map((category, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row" className={`${style["small-col"]}`}>
                            {index + 1}
                          </th>
                          <td className={`${style["small-col"]}`}>
                            <a href="">{category.id.substring(0, 5)}...</a>
                          </td>
                          <td>{category.name}</td>
                          <td>{category.count}</td>
                          <td>
                            <button className="btn btn-danger btn-sm">
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
