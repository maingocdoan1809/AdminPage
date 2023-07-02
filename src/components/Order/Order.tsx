import { useEffect, useState } from "react";
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

function Order() {
  const [user, setUser] = useUser();
  const [orders, setOrders] = useState<CustomerOrder>(null!);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true);
  const [viewBill, setViewBill] = useState<undefined | BillDetail>();
  useEffect(() => {
    fetch(`${BACKEND_URL}/checkout/${user?.username}/all`)
      .then(async (res) => {
        const response = await res.json();
        console.log(response);

        setOrders(response["orders"]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(undefined);
      });
  }, []);
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <div
          className={`d-flex flex-grow-1 gap-3 align-items-center justify-content-end ${styles["container"]} w-100`}
        >
          <input
            type="text"
            className={`${styles["input"]} form-control`}
            placeholder="Enter your bill ID number"
          />
          <button className="btn btn-dark">Search</button>
        </div>
        <div className={`w-100`}>
          {isLoading && (
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <LoadingView />
            </div>
          )}
          {!isLoading && (
            <table className="table table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Current State</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {orders?.orders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td> {order.id} </td>
                      <td
                        style={{
                          color: mapStateToStatus(order.state).color,
                        }}
                      >
                        {mapStateToStatus(order.state).text}
                      </td>
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
