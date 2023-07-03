import {
  BillDetail,
  CustomerOrder,
  mapStateToStatus,
  toMoney,
} from "../../utilities/utils";
import styles from "./order.module.css";
type Props = {
  order: BillDetail;
  close: () => void;
};
function OrderDetail({ order, close }: Props) {
  return (
    <div
      className={`${styles["wrapper"]} d-flex justify-content-center align-items-center`}
    >
      <div className={`${styles["btn-close"]}`}>
        <div onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </div>
      <ul
        className={`list-group bg-light ${styles["detail-container"]} p-3`}
        style={{
          overflowY: "scroll",
        }}
      >
        <li className="list-group-item">
          <div>
            <div className="fs-4">
              Bill id: <span>{order.id}</span>
            </div>
            <div
              style={{
                color: mapStateToStatus(order.state).color,
              }}
            >
              State: <span> {mapStateToStatus(order.state).text} </span>
            </div>
            <div>
              <span>Total: </span>
              <span> {toMoney(order.total)} </span>
            </div>
          </div>
        </li>
        {order.products.map((p) => {
          return (
            <li
              key={p.id}
              className={`d-flex gap-3 p-3 list-group-item ${styles["card"]}`}
            >
              <img
                style={{
                  maxWidth: "280px",
                  maxHeight: "280px",
                }}
                className="rounded-3"
                src={p.image}
                alt=""
              />
              <div className="flex-grow-1 text-dark">
                <div>
                  <span className="fs-5"> Product name: </span>
                  <p className="text-info">{p.name}</p>
                </div>
                <div>
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-5">
                      {p.colorname}
                      <span
                        className="d-inline-block rounded-circle p-1 ms-2"
                        style={{
                          backgroundColor: p.colorcode,
                          border: "1px solid grey",
                        }}
                      ></span>{" "}
                      - Size : {p.size}
                    </span>
                    <span>Quantity: {p.quantity}</span>
                    <b>{toMoney(p.price)}</b>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        {order.products.length > 0 && order.state <= 1 && (
          <li className="list-group-item text-end">
            <button className="btn btn-danger">Huỷ đơn hàng</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default OrderDetail;
