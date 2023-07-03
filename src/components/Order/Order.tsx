import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext/UserContext";
import styles from "./order.module.css";
import { BACKEND_URL } from "../../env";
import {
  BillDetail,
  CustomerOrder,
  ProductInBill,
  mapStateToStatus,
} from "../../utilities/utils";
import OrderDetail from "./OrderDetail";
import LoadingView from "../LoadingView/LoadingView";
import usePagination from "../../utilities/pagination";

function Order() {
  const [user, setUser] = useUser();
  const [searchValue, setSearchValue] = useState("");

  const [currPage, setCurrPage] = useState(0);

  async function generator() {
    console.log("Page: " + currPage);
    console.log("Search value: " + searchValue);

    return fetch(
      `${BACKEND_URL}/checkout/${user?.username}/all?page=${currPage}?search=${searchValue}`
    ).then(async (res) => {
      const response = await res.json();
      return response.orders.orders as BillDetail[];
    });
  }
  const { products, isFetching, isSuccess, hasMore, loadMore } =
    usePagination<BillDetail>({
      generator,
    });
  const [viewBill, setViewBill] = useState<undefined | BillDetail>();

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <div
          className={`d-flex flex-grow-1 gap-3 align-items-center justify-content-end ${styles["container"]} w-100`}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className={`${styles["input"]} form-control`}
            placeholder="Enter your bill ID number"
          />
        </div>
        <div className={`w-100 table-responsive ${styles["table"]}`}>
          {isFetching && (
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <LoadingView />
            </div>
          )}
          {!isFetching && (
            <>
              <table className={`table table-striped ${styles["table"]}`}>
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Current State</th>
                    <th>Order date</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td> {order.id} </td>
                        <td
                          style={{
                            color: mapStateToStatus(order.state).color,
                          }}
                        >
                          {mapStateToStatus(order.state).text}
                        </td>
                        <td>{order.date.substring(0, 10)}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              setViewBill(order);
                            }}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {hasMore ? (
                <div className="text-center">
                  <button
                    onClick={() => {
                      setCurrPage((prev) => prev + 1);
                      loadMore();
                    }}
                    className="btn btn-dark mt-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-compact-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                "There are no bills left to show."
              )}
            </>
          )}
        </div>
      </div>
      {viewBill && (
        <OrderDetail order={viewBill} close={() => setViewBill(undefined)} />
      )}
    </>
  );
}

export default Order;
