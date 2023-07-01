import React, { useEffect, useState } from 'react';
import styles from "./OrderDetail.module.css"
import { BACKEND_URL } from '../../../../env';

type AllOrders = {
  id: string;
  state: string;
  quantity: number;
  totalamount: number;
  datecreated: string;
  deadline: string;
  username: string;

};

type OrderDetailProps = {
  order: AllOrders | null;
};

type ProductInBill = {
  id: string;
  name: string;
  idproduct: string;
  quantity: number;
  price: number;
  imageurl: string;
  colorname: string;
  receiveaddress: string;
  receivephonenumber: string;
  receivename: string;
  fullname: string;
};

function OrderDetail({ order }: OrderDetailProps) {
  const [productinbill, setProductinbill] = useState<ProductInBill[]>([]);
  useEffect(() => {
    fetch(BACKEND_URL + `/checkout/${order?.id}/products`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then((data) => {
        setProductinbill(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [order?.id]);

  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minute = dateObject.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minute}`;
  };

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

  // product test
  const products: ProductInBill[] = [];
  for (let i = 1; i <= 10; i++) {
    const product: ProductInBill = {
      id: `id${i}`,
      name: `Product ${i}`,
      idproduct: `product${i}`,
      quantity: i,
      price: i * 10,
      imageurl: `https://suno.vn/blog/wp-content/uploads/2015/11/27.jpg`,
      colorname: `Color ${i}`,
      receiveaddress: 'Vũ',
      receivephonenumber: '048754546',
      receivename: 'Vũ',
      fullname:'Vũ',
    };

    products.push(product);
  }

  return (
    <>
      <div className={`container ${styles["container"]}`}>
        <div className="row gx-5">
          <div className="col">
            <div className="mt-3">
              <div className="d-flex flex-wrap">
                <h5 style={{ whiteSpace: "nowrap" }}>#{order?.id}&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                <span style={{ whiteSpace: "nowrap" }} className={`flex-nowrap ${order?.state && styles[removeDiacritics(order.state.replace(/\s/g, '-')).toLowerCase() || '']}`}>{order?.state}</span>
              </div>
              <div className="mr-3">
                <h6>Date Created: {order && formatDate(order.datecreated)}</h6>
                <h6>Deadline: {order?.deadline}</h6>
              </div>
            </div>
            <div className="info-customer">
              {productinbill.map((product) => (
                <span>
                  <h6>Người đặt: {product.fullname}</h6>
                  <h6>Người nhận: {product.receivename}</h6>
                  <h6>Địa chỉ: {product.receiveaddress}</h6>
                  <h6>Số điện thoại: {product.receivephonenumber}</h6>
                </span>
              ))}
            </div>
          </div>
          <div className="col">
            <div className='mt-3'>
              <h5 className='text-center'>Product in bill</h5>
              <div className={`${styles["cart-product"]}`}>
                {productinbill.map((product) => (
                  <div className={`${styles["cart"]}`} key={product.id}>
                    <img src={product.imageurl} className="card-img-top" alt={product.name} />
                    <div className={`${styles["information"]}`}>
                      <h5>{product.name}</h5>
                      <p>Color: {product.colorname}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
