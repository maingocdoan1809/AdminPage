import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, addDays, parse, subDays, subHours } from "date-fns";
import styles from "./order.module.css";
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
  const [activeState, setActiveState] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [selectedOrderCode, setSelectedOrderCode] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
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
  const [currentPage, setCurrentPage] = useState(0);


  function mapStateToStatus(state: number): string {
    switch (state) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đang xử lí";
      case 2:
        return "Đang vận chuyển";
      case 3:
        return "Đã giao hàng";
      case 4:
        return "Đã huỷ";
      default:
        return "Trạng thái không xác định";
    }
  }

  const handleClick = (state: string) => {
    if (state !== activeState) {
      setActiveState(state);
      setCurrentPage(0);
    }
  };

  useEffect(() => {
    const apiUrl = `${BACKEND_URL}/checkout/?page=${currentPage}&state=${activeState}`;
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        const updatedOrders = data.map((order: AllOrders) => {
          const deadline = format(
            addDays(parseISO(order.datecreated), 7),
            "dd/MM/yyyy - HH:mm"
          );
          const state = mapStateToStatus(Number(order.state));
          return { ...order, deadline, state };
        });
        setFilteredOrders(updatedOrders);
        console.log(filteredOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, activeState]);

  const handleOrderCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOrderCode(event.target.value);
  };

  const handleSearchOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    if (searchOrder.trim() !== "" && selectedDate === null) {
      const apiUrl = `${BACKEND_URL}/checkout/${searchOrder}`;
      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((data) => {
          console.log(data);
          const updatedOrders = data.map((order: AllOrders) => {
            const deadline = format(
              addDays(parseISO(order.datecreated), 7),
              "dd/MM/yyyy - HH:mm"
            );
            const state = mapStateToStatus(Number(order.state));
            return { ...order, deadline, state };
          });
          setFilteredOrders(updatedOrders);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (searchOrder.trim() === "" && selectedDate !== null) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const apiUrl = `${BACKEND_URL}/checkout/?datecreated=${formattedDate}&state=${activeState}`;
      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((data) => {
          console.log(data);
          const updatedOrders = data.map((order: AllOrders) => {
            const deadline = format(
              addDays(parseISO(order.datecreated), 7),
              "dd/MM/yyyy - HH:mm"
            );
            const state = mapStateToStatus(Number(order.state));
            return { ...order, deadline, state };
          });
          setFilteredOrders(updatedOrders);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (searchOrder.trim() !== "" && selectedDate !== null) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const apiUrl = `${BACKEND_URL}/checkout/${searchOrder}`;
      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((data) => {
          console.log(data);
          const updatedOrders = data.map((order: AllOrders) => {
            const deadline = format(
              addDays(parseISO(order.datecreated), 7),
              "dd/MM/yyyy - HH:mm"
            );
            const state = mapStateToStatus(Number(order.state));
            return { ...order, deadline, state };
          });
          setFilteredOrders(updatedOrders);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const apiUrl = `${BACKEND_URL}/checkout/?page=0&state=${activeState}`;
      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((data) => {
          console.log(data);
          const updatedOrders = data.map((order: AllOrders) => {
            const deadline = format(
              addDays(parseISO(order.datecreated), 7),
              "dd/MM/yyyy - HH:mm"
            );
            const state = mapStateToStatus(Number(order.state));
            return { ...order, deadline, state };
          });
          setFilteredOrders(updatedOrders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleClearFilter = () => {
    setSelectedOrderCode("");
    setSearchOrder("");
    setSelectedDate(null);
    setFilterCleared(true);
  };

  const handleOrderSelection = (id: string) => {
    const order = filteredOrders.find((order) => order.id === id);
  
    if (!order) {
      return;
    }
  
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      const selectedOrdersWithSameState = selectedOrders.filter(
        (orderId) => {
          const selectedOrder = filteredOrders.find(
            (order) => order.id === orderId
          );
          return selectedOrder && selectedOrder.state === order.state;
        }
      );
  
      if (selectedOrdersWithSameState.length === selectedOrders.length) {
        setSelectedOrders([...selectedOrders, id]);
      } else {
        alert("Không được chọn nhiều order có trạng thái khác nhau");
      }
    }
  };
  

  useEffect(() => {
    console.log(selectedOrders);
  }, [selectedOrders]);


  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
      setSelectAll(false);
    } else {
      const firstOrderState = filteredOrders[0]?.state;
      const isAllSameState = filteredOrders.every(
        (order) => order.state === firstOrderState
      );
  
      if (isAllSameState) {
        const selectAllOrder = filteredOrders.map((order) => order.id);
        setSelectedOrders(selectAllOrder);
        setSelectAll(true);
      } else {
        alert("Không được chọn nhiều order có trạng thái khác nhau");
      }
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

    setAllOrders(updatedOrders);
    setSelectedOrders([]);
    console.log("Đơn hàng được chọn:", selectedOrders);

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

    console.log("Đơn hàng được chọn:", selectedOrders);
  };

  const handleOrderDetail = (order: AllOrders) => {
    setSelectedOrderDetail(order);
  };

  function isDeadlinePassed(deadline: any) {
    const currentDateTime = new Date();
    const deadlineDateTime = parse(deadline, "dd/MM/yyyy", new Date());
    return deadlineDateTime < currentDateTime;
  }

  function removeDiacritics(str: string | undefined) {
    if (str) {
      const diacriticsMap: { [key: string]: string } = {
        Đ: "D",
      };
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\u0000-\u007E]/g, (char) => diacriticsMap[char] || char);
    }
    return "";
  }


  return (
    <>
      <div
        className={`container ${styles["container-order"]} d-flex flex-column flex-grow-1`}
        style={{ overflowY: "auto" }}
      >
        <div className={`btn-group ${styles["btn-group"]}`}>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeState === "" ? styles.activeButton : ""
              }`}
            onClick={() => handleClick("")}
          >
            Tất cả
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeState === "0" ? styles.activeButton : ""
              }`}
            onClick={() => handleClick("0")}
          >
            Chờ xác nhận
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeState === "1" ? styles.activeButton : ""
              }`}
            onClick={() => handleClick("1")}
          >
            Đang xử lí
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeState === "2" ? styles.activeButton : ""
              }`}
            onClick={() => handleClick("2")}
          >
            Đang vận chuyển
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeState === "3" ? styles.activeButton : ""
              }`}
            onClick={() => handleClick("3")}
          >
            Đã giao hàng
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary mt-3 mb-3  ${activeState === "4" ? styles.activeButton : ""
              }`}
            onClick={() => handleClick("4")}
          >
            Đã huỷ
          </button>
        </div>
        <div className={`${styles["form-container"]} d-flex`}>
          <input
            type="text"
            className="form-control"
            id="searchOrder"
            value={searchOrder}
            onChange={handleSearchOrderChange}
            placeholder="Nhập mã đơn hàng"
          />
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
        <div className="d-flex">
          <button type="button" className="btn btn-secondary btn-sm mt-2 px-3 col-md-2" onClick={handleClearFilter}>Huỷ lọc</button>
          <button type="button" className="btn btn-primary btn-sm mt-2 px-3 mx-3 col-md-2" onClick={handleFilterClick}>Lọc</button>
        </div>
        <div className={`mt-3 ${styles["order-table"]}`}>
          <table className="table">
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
                <th>Date created</th>
                <th>Delivery time</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`${selectedOrders.includes(order.id) ? styles.selectedRow : ""
                    }`}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleOrderSelection(order.id)}
                    />
                  </td>
                  <td>{order.id}</td>
                  <td
                    className={`${styles[
                      removeDiacritics(
                        order.state.replace(/\s/g, "-")
                      ).toLowerCase()
                    ]
                      }`}
                  >
                    {order.state}
                  </td>
                  <td>{order.quantity}</td>
                  <td>{order.totalamount}</td>
                  <td>
                    {format(
                      subHours(parseISO(order.datecreated), 7),
                      "dd/MM/yyyy - HH:mm"
                    )}
                  </td>
                  <td
                    className={
                      isDeadlinePassed(order.deadline)
                        ? styles.expiredDeadline
                        : ""
                    }
                  >
                    {order.deadline}
                  </td>
                  <td>
                    <a
                      className="link-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleOrderDetail(order)}
                    >
                      Xem chi tiết
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Order Detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <OrderDetail order={selectedOrderDetail} />
              </div>
            </div>
          </div>
        </div>
        <div>
          {filteredOrders.length > 0 && (
            <>
              <nav aria-label="Page navigation example">
                <ul className="pagination mt-3 d-flex justify-content-end">
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`} onClick={() => setCurrentPage(currentPage - 1)}>
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">{currentPage + 1}</a></li>
                  <li className={`page-item ${(8 > filteredOrders.length) ? 'disabled' : ''}`} onClick={() => setCurrentPage(currentPage + 1)}>
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                  <>
                    <button
                      className={`btn btn-primary m-3`}
                      onClick={handleBatchConfirmation}
                      value={1}
                      disabled={selectedOrders.some((id) => {
                        const order = filteredOrders.find((order) => order.id === id);
                        return order?.state === "Đang xử lí" || order?.state === "Đang vận chuyển" || order?.state === "Đã giao hàng" || order?.state === "Đã huỷ";
                      })}
                      
                    >
                      Xác nhận
                    </button>
                    <button
                      className={`btn btn-primary m-3`}
                      onClick={handleBatchConfirmation}
                      value={2}
                      disabled={selectedOrders.some((id) => {
                        const order = filteredOrders.find((order) => order.id === id);
                        return order?.state === "Đang vận chuyển" || order?.state === "Đã giao hàng" || order?.state === "Đã huỷ";
                      })}
                    >
                      Vận chuyển
                    </button>
                    <button
                      className={`btn btn-primary m-3`}
                      onClick={handleBatchConfirmation}
                      value={3}
                      disabled={selectedOrders.some((id) => {
                        const order = filteredOrders.find((order) => order.id === id);
                        return order?.state === "Chờ xác nhận" || order?.state === "Đã huỷ" || order?.state === "Đang xử lí";
                      })}
                    >
                      Đã giao hàng
                    </button>
                    <button
                      className={`btn btn-primary m-3`}
                      onClick={handleBatchConfirmation}
                      value={4}
                      disabled={selectedOrders.some((id) => {
                        const order = filteredOrders.find((order) => order.id === id);
                        return order?.state === "Đang vận chuyển" || order?.state === "Đã huỷ" || order?.state === "Đã giao hàng";
                      })}
                    >
                      Huỷ đơn hàng
                    </button>
                    <button
                      className={`btn btn-primary m-3`}
                      onClick={handleBatchConfirmation}
                      value={0}
                      disabled={selectedOrders.some((id) => {
                        const order = filteredOrders.find((order) => order.id === id);
                        return order?.state === "Chờ xác nhận" || order?.state === "Đang xử lí" || order?.state === "Đang vận chuyển" || order?.state === "Đã giao hàng";
                      })}
                    >
                      Khôi phục đơn hàng
                    </button>
                  </>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
