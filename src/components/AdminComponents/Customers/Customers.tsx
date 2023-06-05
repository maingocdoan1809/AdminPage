import React, { useEffect, useState } from 'react';

type Customer = {
  code: string,
  username: string,
  phone: string,
  email: string,
  address: string,
  dob: string,
  gender: string;
  status: string,
  priority: number,
};

function Customers() {

  const [customer, setCustomer] = useState<Customer[]>([]);
  const [filterCode, setFilterCode] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const customers = [
      {
        code: 'KH001',
        username: 'John Doe',
        phone: '123456789',
        email: 'johndoe@example.com',
        address: '123 Main St, City',
        dob: '23/09/2003',
        gender: 'Nam',
        status: 'Active',
        priority: 1
      },
      {
        code: 'KH002',
        username: 'Jane Smith',
        phone: '987654321',
        email: 'janesmith@example.com',
        address: '456 Elm St, City',
        dob: '23/09/2003',
        gender: 'Nam',
        status: 'Inactive',
        priority: 0
      },
    ];
    setCustomer(customers);
  }, [])
  const handleCodeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = event.target.value;
    setFilterCode(selectedCode);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setFilterStatus(selectedStatus);
  };

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handlePriorityChange = (customerCode: string, newPriority: number) => {
    const updatedCustomers = customer.map((c) => {
      if (c.code === customerCode) {
        return { ...c, priority: newPriority };
      }
      return c;
    });
    setCustomer(updatedCustomers);
  };


  const filteredCustomers = customer.filter((customer) => {
    const isCodeMatch = filterCode === '' || customer.code === filterCode;
    const isNameMatch = filterName === '' || customer.username.includes(filterName);
    const isStatusMatch = filterStatus === '' || customer.status === filterStatus;
    return isCodeMatch && isNameMatch && isStatusMatch;
  });

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Filter by code"
              value={filterCode}
              onChange={handleCodeFilterChange}
            >
              <option value="">Mã khách hàng</option>
              {customer.map((customer) => (
                <option key={customer.code} value={customer.code}>
                  {customer.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa"
              aria-label="Filter by name"
              value={filterName}
              onChange={handleNameFilterChange}
            />
            <select
              className="form-select"
              aria-label="Filter by status"
              value={filterStatus}
              onChange={handleStatusFilterChange}
            >
              <option value="">Trạng thái</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>State</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.code}>
                  <td>{customer.code}</td>
                  <td>{customer.username}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>{customer.status}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        style={{ width: "150px" }}
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {customer.priority === 1 ? 'Admin' : customer.priority === 0 ? 'Customer' : 'Account lock'}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li>
                          <button
                            className="dropdown-item"
                            value={1}
                            onClick={() => handlePriorityChange(customer.code, 1)}
                          >
                            Admin
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            value={0}
                            onClick={() => handlePriorityChange(customer.code, 0)}
                          >
                            Customer
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            value={-1}
                            onClick={() => handlePriorityChange(customer.code, -1)}
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
    </div>
  );
}

export default Customers;