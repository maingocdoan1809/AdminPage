import styles from "./order.module.css";

function Order() {
  return (
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
        <table className="table table-striped">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Current State</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2342</td>
              <td>Đang vận chuyển</td>
              <td>Xem chi tiết</td>
            </tr>
            <tr>
              <td>23423</td>
              <td>Đang vận chuyển</td>
              <td>Xem chi tiết</td>
            </tr>
            <tr>
              <td>23423</td>
              <td>Đang vận chuyển</td>
              <td>Xem chi tiết</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
