import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, addDays, parse, subDays } from "date-fns";
import styles from "./order.module.css"
import OrderDetail from "../OrderDetail/OrderDetail";
import { BACKEND_URL } from "../../../../env";

type AllOrders = {
  id: string;
  state: string;
  quantity: number;
  totalamount: number;
  datecreated: string;
  deadline: string;
  username: string;
  receiveaddress: string;
  receivephonenumber: string;
  receivename: string;
};

function Orders() {

  const [activeButton, setActiveButton] = useState('all');
  const [selectedOrderCode, setSelectedOrderCode] = useState('');
  const [searchOrder, setSearchOrder] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [thirtyDaysAgo, setThirtyDaysAgo] = useState(subDays(new Date(), 30));
  const formattedThirtyDaysAgo = thirtyDaysAgo.toLocaleDateString();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allOrders, setAllOrders] = useState<AllOrders[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<AllOrders[]>([]);
  const [filterClicked, setFilterClicked] = useState(false);
  const [filterCleared, setFilterCleared] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<AllOrders | null>(null);

  function mapStateToStatus(state: number): string {
    switch (state) {
      case 0:
        return 'Chờ xác nhận';
      case 1:
        return 'Đang xử lí';
      case 2:
        return 'Đang vận chuyển';
      case 3:
        return 'Đã giao hàng';
      case 4:
        return 'Đã huỷ';
      default:
        return 'Trạng thái không xác định';
    }
  }

  useEffect(() => {
    fetch(BACKEND_URL + '/checkout')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then((data) => {
        const updatedOrders = data.map((order: AllOrders) => {
          const deadline = format(addDays(parseISO(order.datecreated), 1), 'dd/MM/yyyy - HH:mm');
          const state = mapStateToStatus(Number(order.state));
          return { ...order, deadline, state };
        });
        setAllOrders(updatedOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let filtered = allOrders;
    if (activeButton !== "all") {
      filtered = filtered.filter((order) => order.state === activeButton);
    }
    if (filterClicked) {
      if (selectedOrderCode !== "") {
        filtered = filtered.filter((order) => order.id === selectedOrderCode);
      }
      if (searchOrder !== "") {
        filtered = filtered.filter((order) => {
          const searchOrderLowerCase = searchOrder.toLowerCase();
          return (
            order.id.toLowerCase().includes(searchOrderLowerCase) ||
            order.state.toLowerCase().includes(searchOrderLowerCase) ||
            order.datecreated.includes(searchOrderLowerCase) ||
            order.deadline.includes(searchOrderLowerCase)
          );
        });
      }
      if (selectedDate) {
        const thirtyDaysAgo = subDays(new Date(), 30);
        filtered = filtered.filter((order) => {
          const orderDate = parse(order.datecreated, 'dd/MM/yyyy', new Date());
          return orderDate >= thirtyDaysAgo && orderDate <= new Date();
        });
      }
    }
    setFilteredOrders(filtered);
    setFilterCleared(false);
  }, [activeButton, selectedOrderCode, searchOrder, selectedDate, allOrders, filterClicked]);
  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  const handleOrderCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrderCode(event.target.value);
  };

  const handleSearchOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOrder(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const newThirtyDaysAgo = subDays(date, 30);
    setThirtyDaysAgo(newThirtyDaysAgo);
  };

  const handleFilterClick = () => {
    setFilterClicked(true);
    setFilterCleared(false);
  };

  const handleClearFilter = () => {
    setSelectedOrderCode('');
    setSearchOrder('');
    setSelectedDate(null);
    setFilterCleared(true);
  };

  const handleOrderSelection = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const selectAllOrder = filteredOrders.map((order) => order.id);
      setSelectedOrders(selectAllOrder);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleBatchConfirmation = (event: any) => {
    const selectedValue = event.target.value;
    const updatedOrders = allOrders.map((order) => {
      if (selectedOrders.includes(order.id)) {
        if (selectedValue === '1') {
          return { ...order, state: 'Đang xử lí' };
        } else if (selectedValue === '2') {
          return { ...order, state: 'Đang vận chuyển' };
        } else if (selectedValue === '3') {
          return { ...order, state: 'Đã giao hàng' };
        } else if (selectedValue === '4') {
          return { ...order, state: 'Đã huỷ' };
        }
      }
      return order;
    });

    if (selectedValue == 1) {
      fetch(BACKEND_URL + '/products/confirm', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedOrders: selectedOrders })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        });

      setAllOrders(updatedOrders);
      setSelectedOrders([]);
    }
    if (selectedValue == 2) {
      fetch(BACKEND_URL + '/products/transport', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOrders: selectedOrders })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        });

      setAllOrders(updatedOrders);
      setSelectedOrders([]);
    }
    if (selectedValue == 3) {
      fetch(BACKEND_URL + '/products/done', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOrders: selectedOrders })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        });

      setAllOrders(updatedOrders);
      setSelectedOrders([]);
    }
    if (selectedValue == 4) {
      fetch(BACKEND_URL + '/products/cancel', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedOrders: selectedOrders })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        });

      setAllOrders(updatedOrders);
      setSelectedOrders([]);
    }

    setAllOrders(updatedOrders);
    setSelectedOrders([]);
    console.log("Đơn hàng được chọn:", selectedOrders);    
  };



  const handleOrderDetail = (order: AllOrders) => {
    setSelectedOrderDetail(order);
  };

  function isDeadlinePassed(deadline: any) {
    const currentDateTime = new Date();
    const deadlineDateTime = parse(deadline, 'dd/MM/yyyy', new Date());
    return deadlineDateTime < currentDateTime;
  }

  function removeDiacritics(str: string | undefined) {
    if (str) {
      const diacriticsMap: { [key: string]: string } = {
        'Đ': 'D',
      };
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\u0000-\u007E]/g, (char) => diacriticsMap[char] || char);
    }
    return '';
  }
  return (
    <>
      <div className={`container ${styles["container-order"]}`} style={{ overflowY: "auto" }}>
        <div className={`btn-group ${styles["btn-group"]}`}>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeButton === 'all' ? styles.activeButton : ''}`}
            onClick={() => handleClick('all')}
          >
            Tất cả
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeButton === 'Chờ xác nhận' ? styles.activeButton : ''}`}
            onClick={() => handleClick('Chờ xác nhận')}
          >
            Chờ xác nhận
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeButton === 'Đang xử lí' ? styles.activeButton : ''}`}
            onClick={() => handleClick('Đang xử lí')}
          >
            Đang xử lí
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeButton === 'Đang vận chuyển' ? styles.activeButton : ''}`}
            onClick={() => handleClick('Đang vận chuyển')}
          >
            Đang vận chuyển
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeButton === 'Đã giao hàng' ? styles.activeButton : ''}`}
            onClick={() => handleClick('Đã giao hàng')}
          >
            Đã giao hàng
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeButton === 'Đã huỷ' ? styles.activeButton : ''}`}
            onClick={() => handleClick('Đã huỷ')}
          >
            Đã huỷ
          </button>
        </div>
        <div className={`row ${styles["filter-order"]}`}>
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="searchOrder"
                value={searchOrder}
                onChange={handleSearchOrderChange}
                placeholder="Nhập mã đơn hàng"
              />
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
          <div className="row mt-3">
            <div className="d-flex col-md-12">
              <h5>Đang lọc:</h5>
              {selectedOrderCode && <span>{selectedOrderCode} | </span>}
              {searchOrder && <span>{searchOrder} | </span>}
              {selectedDate && (
                <span>
                  ngày đặt: {new Date(formattedThirtyDaysAgo).toLocaleDateString("vi-VN")} đến{" "}
                  {selectedDate.toLocaleDateString("vi-VN")}
                </span>
              )}
              <div className="d-flex justify-content-end">
                {filterCleared && <span className="px-3 text-danger">Không có trạng thái lọc</span>}
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-secondary btn-sm mt-2 px-3 col-md-2" onClick={handleClearFilter}>Huỷ lọc</button>
        <button type="button" className="btn btn-primary btn-sm mt-2 px-3 mx-3 col-md-2" onClick={handleFilterClick}>Lọc</button>
        <div className={`mt-3 ${styles["order-table"]}`} style={{ overflow: "auto" }}>
          <table className="table" style={{ minWidth: "900px" }}>
            <thead className="table-dark">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Code orders</th>
                <th>State</th>
                <th>Quantity</th>
                <th>Total amount</th>
                <th>Confirmation deadline</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`${selectedOrders.includes(order.id) ? styles.selectedRow : ""}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleOrderSelection(order.id)}
                    />
                  </td>
                  <td >{order.id}</td>
                  <td className={`${styles[removeDiacritics(order.state.replace(/\s/g, '-')).toLowerCase()]}`}>{order.state}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalamount}</td>
                  <td className={isDeadlinePassed(order.deadline) ? styles.expiredDeadline : ""}>{order.deadline}</td>
                  <td>
                    <a
                      data-bs-toggle="offcanvas"
                      href="#offcanvasExample"
                      role="button"
                      aria-controls="offcanvasExample"
                      onClick={() => handleOrderDetail(order)}
                    >Xem chi tiết
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ width: "100%" }} className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
              <h2 className="offcanvas-title mx-4" id="offcanvasExampleLabel">Order Detail</h2>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <OrderDetail order={selectedOrderDetail} />
            </div>
          </div>
        </div>
        <div className={`${styles["selected-products"]}`}>
          {selectedOrders.length > 0 && (
            <div>
              <h5>Đơn hàng được chọn:</h5>
              {selectedOrders.map((id, index) => (
                <span key={id}>
                  {id}
                  {index !== selectedOrders.length - 1 ? ' - ' : ' '}
                </span>
              ))}
            </div>
          )}
          <button
            className={`btn btn-primary m-3`}
            onClick={handleBatchConfirmation}
            value={1}
          >
            Xác nhận
          </button>
          <button
            className={`btn btn-primary m-3`}
            onClick={handleBatchConfirmation}
            value={2}
          >
            Vân chuyển
          </button>
          <button
            className={`btn btn-primary m-3`}
            onClick={handleBatchConfirmation}
            value={3}
          >
            Đã giao hàng
          </button>
          <button
            className={`btn btn-primary m-3`}
            onClick={handleBatchConfirmation}
            value={4}
          >
            Huỷ đơn hàng
          </button>
        </div>
      </div>
    </>
  );
}

export default Orders;
