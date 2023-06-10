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
  receiveaddress: string;
  receivephonenumber: string;
  receivename: string;
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
        console.log(productinbill);
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
  
  return (
    <>
      <div className={`container ${styles["container"]}`} style={{ borderTop: "1px solid #000" }}>
        <div className="mt-3">
          <div className="d-flex">
            <h5># {order?.id} </h5>
            <span className={`mx-3 ${order?.state && styles[removeDiacritics(order.state.replace(/\s/g, '-')).toLowerCase() || '']}`}>{order?.state}</span>
          </div>
          <div className="d-flex">
            <span>Date Created: {order && formatDate(order.datecreated)}</span>
            <span className='mx-3'>Deadline: {order?.deadline}</span>
          </div>
        </div>
        <div className="info-customer mt-3">
          <h6>Người nhận: {order?.receivename}</h6>
          <h6>Địa chỉ: {order?.receiveaddress}</h6>
          <h6>Số điện thoại: {order?.receivephonenumber}</h6>
        </div>
          <div className={`${styles["cart-product"]}`}>
            <h5>Product</h5>
            <span>Có {productinbill.length} loại sản phẩm</span>
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
    </>
  );
}

export default OrderDetail;
