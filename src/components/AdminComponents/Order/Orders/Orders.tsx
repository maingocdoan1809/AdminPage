import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays } from "date-fns";
import styles from "./order.module.css"
type AllOrders = {
  orderCode: string;
  status: string;
  quantity: number;
  totalAmount: number;
  datecreated: string;
  deadline: string;
};
function Orders() {

  const [activeButton, setActiveButton] = useState('all');
  const [selectedOrderCode, setSelectedOrderCode] = useState('');
  const [searchOrder, setSearchOrder] = useState('');
  const [selectedOrderLabel, setSelectedOrderLabel] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const thirtyDaysAgo = subDays(selectedDate, 30);
  const formattedThirtyDaysAgo = thirtyDaysAgo.toLocaleDateString();
  const formattedSelectedDate = selectedDate.toLocaleDateString();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allOrders, setAllOrders] = useState<AllOrders[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<AllOrders[]>([]);

  useEffect(() => {
    const Orders = [
      {
        orderCode: "ORD001",
        status: "Chờ xác nhận",
        quantity: 2,
        totalAmount: 100,
        datecreated: "03/06/2023",
        deadline: "03/06/2023",
      },
      {
        orderCode: "ORD002",
        status: "Đang xử lí",
        quantity: 3,
        totalAmount: 150,
        datecreated: "03/06/2023",
        deadline: "03/06/2023",
      },
      {
        orderCode: "ORD003",
        status: "Đang xử lí",
        quantity: 3,
        totalAmount: 150,
        datecreated: "03/06/2023",
        deadline: "03/06/2023",
      },
      {
        orderCode: "ORD004",
        status: "Chờ xác nhận",
        quantity: 3,
        totalAmount: 150,
        datecreated: "03/06/2023",
        deadline: "03/06/2023",
      },
    ];
    setAllOrders(Orders);
    const filteredButton = Orders.filter((order) => {
      if (activeButton === 'all') {
        return true;
      } else if (activeButton === 'confirm' && order.status === 'Chờ xác nhận') {
        return true;
      } else if (activeButton === 'process' && order.status === 'Đang xử lí') {
        return true;
      } else if (activeButton === 'delivery' && order.status === 'Đang vận chuyển') {
        return true;
      } else if (activeButton === 'delivered' && order.status === 'Đã giao hàng') {
        return true;
      } else if (activeButton === 'cancelled' && order.status === 'Đã huỷ') {
        return true;
      } else {
        return false;
      }
    });
    setFilteredOrders(filteredButton);
  }, [activeButton]);


  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  const handleOrderCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrderCode(event.target.value);
  };

  const handleSearchOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOrder(event.target.value);
  };

  const handleOrderLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrderLabel(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOrderSelection = (orderCode: string) => {
    if (selectedOrders.includes(orderCode)) {
      // Nếu đơn hàng đã được chọn, hủy bỏ chọn
      setSelectedOrders(selectedOrders.filter((id) => id !== orderCode));
    } else {
      // Nếu đơn hàng chưa được chọn, thêm vào danh sách các đơn hàng được chọn
      setSelectedOrders([...selectedOrders, orderCode]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Nếu checkbox "Chọn tất cả" chưa được chọn, thêm tất cả các orderId vào danh sách selectedOrders
      const allOrderIds = allOrders.map((order) => order.orderCode);
      setSelectedOrders(allOrderIds);
    } else {
      // Nếu checkbox "Chọn tất cả" đã được chọn, xóa tất cả các orderId khỏi danh sách selectedOrders
      setSelectedOrders([]);
    }
  };


  const handleBatchConfirmation = () => {
    console.log("Đơn hàng được chọn:", selectedOrders);
  };




  return (
    <>
      <div className="container">
        <div className={`${styles["header-order"]}`}>
          <div className={`btn-group ${styles["btn-group"]}`}>
            <button
              type="button"
              className={`btn btn-outline-secondary mt-3 mb-3 ${activeButton === 'all' ? styles.activeButton : ''}`}
              onClick={() => handleClick('all')}
            >
              Tất cả
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary mt-3 mb-3 ${activeButton === 'confirm' ? styles.activeButton : ''}`}
              onClick={() => handleClick('confirm')}
            >
              Chờ xác nhận
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary mt-3 mb-3 ${activeButton === 'process' ? styles.activeButton : ''}`}
              onClick={() => handleClick('process')}
            >
              Đang xử lí
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary mt-3 mb-3 ${activeButton === 'delivery' ? styles.activeButton : ''}`}
              onClick={() => handleClick('delivery')}
            >
              Đang vận chuyển
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary mt-3 mb-3 ${activeButton === 'delivered' ? styles.activeButton : ''}`}
              onClick={() => handleClick('delivered')}
            >
              Đã giao hàng
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary mt-3 mb-3 ${activeButton === 'cancelled' ? styles.activeButton : ''}`}
              onClick={() => handleClick('cancelled')}
            >
              Đã huỷ
            </button>
          </div>
        </div>

        <div className={`${styles["filter-order"]}`}>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <select
                  className="form-control"
                  id="orderCode"
                  value={selectedOrderCode}
                  onChange={handleOrderCodeChange}
                >
                  <option value="">Mã đơn hàng</option>
                  {allOrders.map((order) => (
                    <option key={order.orderCode} value={order.orderCode}>
                      {order.orderCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="searchOrder"
                  value={searchOrder}
                  onChange={handleSearchOrderChange}
                  placeholder="Nhập thông tin đơn hàng"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <select
                  className="form-control"
                  id="orderLabel"
                  value={selectedOrderLabel}
                  onChange={handleOrderLabelChange}
                >
                  <option value="">Nhãn đơn hàng</option>
                  <option value="label1">Nhãn đơn hàng 1</option>
                  <option value="label2">Nhãn đơn hàng 2</option>
                  <option value="label3">Nhãn đơn hàng 3</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Ngày đặt hàng"
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="d-flex col-md-12">
              <h5>Đang lọc:</h5>
              <span className="px-3">
                {selectedOrderCode && selectedOrderCode + " | "}
                {searchOrder && searchOrder + " | "}
                {selectedOrderLabel && selectedOrderLabel + " | "}
                <span>ngày đặt: {formattedThirtyDaysAgo} đến {formattedSelectedDate}</span>
              </span>
            </div>
          </div>
        </div>
        <div className={`${styles["order-table"]}`}>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Mã đơn hàng</th>
                <th>Trạng thái</th>
                <th>Số lượng</th>
                <th>Số tiền khách phải trả</th>
                <th>Hạn xác nhận</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderCode}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.orderCode)}
                      onChange={() => handleOrderSelection(order.orderCode)}
                    />
                  </td>
                  <td>{order.orderCode}</td>
                  <td>{order.status}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.deadline}</td>
                  <td>Thao tác</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrders.length > 0 && (
          <div className={`${styles["selected-products"]}`}>
            <h5>Đơn hàng được chọn:</h5>
            <ul>
              {selectedOrders.map((orderCode) => (
                <li key={orderCode}>{orderCode}</li>
              ))}
            </ul>
            <button
              className={`btn btn-primary`}
              onClick={handleBatchConfirmation}
            >
              Xác nhận hàng loạt
            </button>
          </div>
        )}
      </div>
    </>
  );

}

export default Orders;
