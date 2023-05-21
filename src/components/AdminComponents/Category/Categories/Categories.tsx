import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../env";
import style from "./categories.module.css";
import LoadingView from "../../../LoadingView/LoadingView";
import ShowCategory from "./ShowCategory/ShowCategory";
export type Category = {
  id: string;
  name: string;
  count: number;
};

function Categories() {
  const [categories, setCategories] = useState([] as Category[]);
  const [isLoading, setIsLoading] = useState(true);
  // pass to child, every update in category will force this component to re-render.
  const [trigger, setTrigger] = useState(true);
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
  }, [trigger]);

  return (
    <>
      {isLoading ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <LoadingView />
        </div>
      ) : (
        <div className="flex-grow-1 d-flex flex-column">
          <div className="shadow-sm mb-3 p-2">
            <ShowCategory
              trigger={() => {
                setTrigger(!trigger);
              }}
            />
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
                        <tr key={category.id}>
                          <th scope="row" className={`${style["small-col"]}`}>
                            {index + 1}
                          </th>
                          <td className={`${style["small-col"]}`}>
                            {category.id.substring(0, 5)}...
                          </td>
                          <td>{category.name}</td>
                          <td>{category.count}</td>
                          <td>
                            <ShowCategory
                              trigger={() => {
                                setTrigger(!trigger);
                              }}
                              category={category}
                            />
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
