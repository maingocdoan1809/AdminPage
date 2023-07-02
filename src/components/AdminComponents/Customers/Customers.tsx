import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../env';
import styles from "./customer.module.css"

type Customer = {
  username: string;
  fullname: string;
  phonenumber: string;
  email: string;
  address: string;
  dob: string;
  gender: string;
  state: number;
  priority: number;
};

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filterCode, setFilterCode] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(BACKEND_URL + '/customer');
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error('Error fetching customers:', response.status);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCodeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCode(event.target.value);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    if (selectedStatus === "Trạng thái") {
      setFilterStatus("");
    } else {
      setFilterStatus(selectedStatus);
    }
    console.log(filterStatus);
  };


  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handlePriorityChange = (customerCode: string, newPriority: number) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn thay đổi giá quyền của người dùng?');
    if (confirmed) {
      const updatedCustomers = customers.map((c) => {
        if (c.username === customerCode) {
          return { ...c, priority: newPriority };
        }
        return c;
      });
      setCustomers(updatedCustomers);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const isCodeMatch = filterCode === "" || customer.username.includes(filterCode);
    const isNameMatch = filterName === "" || customer.fullname.includes(filterName);
    const isStatusMatch = filterStatus === "" || customer.state === parseInt(filterStatus);
    return isCodeMatch && isNameMatch && isStatusMatch;
  });


  return (
    <>
      <div className={`container ${styles["container-customer"]} d-flex flex-column flex-grow-1`}>
        <div className={`${styles["form-container"]} mt-3 d-flex`}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nhập mã người dùng"
            aria-label="Filter by code"
            value={filterCode}
            onChange={handleCodeFilterChange}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nhập tên người dùng"
            aria-label="Filter by name"
            value={filterName}
            onChange={handleNameFilterChange}
          />
          <select
            className="form-select mb-3"
            aria-label="Filter by status"
            value={filterStatus}
            onChange={handleStatusFilterChange}
          >
            <option value="">All</option>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <div className={`mt-3 ${styles["customer-table"]}`}>
          <table className="table">
            <thead className='table-dark'>
              <tr>
                <th>Username</th>
                <th>Fullname</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>State</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.username}>
                  <td className={`${styles["username"]} ${styles["max-5-characters"]}`}>{customer.username}</td>
                  <td>{customer.fullname}</td>
                  <td>{customer.phonenumber}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>{customer.state}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        style={{ width: '150px' }}
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {customer.priority === 1
                          ? 'Admin'
                          : customer.priority === 0
                            ? 'Customer'
                            : 'Account lock'}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li>
                          <button
                            className="dropdown-item"
                            value={1}
                            onClick={() => handlePriorityChange(customer.username, 1)}
                          >
                            Admin
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            value={0}
                            onClick={() => handlePriorityChange(customer.username, 0)}
                          >
                            Customer
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            value={-1}
                            onClick={() => handlePriorityChange(customer.username, -1)}
                          >
                            Account lock
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Customers;
