import React, { useEffect, useState } from 'react';
import styles from "./OrderDetail.module.css"

type AllOrders = {
  orderCode: string;
  status: string;
  quantity: number;
  totalAmount: number;
  datecreated: string;
  deadline: string;
};

type OrderDetailProps = {
  order: AllOrders | null;
};

type ProductInBill = {
  ordercode: string;
  idproduct: string;
  quantity: number;
  price: number;
  imgurl: string;
  productname: string;
  colorname: string;
};

function OrderDetail({ order }: OrderDetailProps) {
  const [productinbill, setProductinbill] = useState<ProductInBill[]>([]);
  useEffect(() => {
    const productInBill = [
      {
        ordercode: "ORD001",
        idproduct: "P001",
        quantity: 2,
        price: 10,
        imgurl: "https://tamson-media.s3.ap-southeast-1.amazonaws.com/media/catalog/product/cache/a72dd292f5ebc7f905c5028ee744eec1/S/a/Sandro_SHPPA00571-23_V_1_1_2.webp",
        productname: "Product 1",
        colorname: "màu xanh dương"
      },
      {
        ordercode: "ORD001",
        idproduct: "P002",
        quantity: 1,
        price: 20,
        imgurl: "https://tamson-media.s3.ap-southeast-1.amazonaws.com/media/catalog/product/cache/a72dd292f5ebc7f905c5028ee744eec1/S/a/Sandro_SHPPA00571-23_V_1_1_2.webp",
        productname: "Product 2",
        colorname: "màu xanh dương"
      },
      {
        ordercode: "ORD001",
        idproduct: "P003",
        quantity: 1,
        price: 20,
        imgurl: "https://tamson-media.s3.ap-southeast-1.amazonaws.com/media/catalog/product/cache/a72dd292f5ebc7f905c5028ee744eec1/S/a/Sandro_SHPPA00571-23_V_1_1_2.webp",
        productname: "Product 3",
        colorname: "màu xanh dương"
      },
      {
        ordercode: "ORD001",
        idproduct: "P004",
        quantity: 1,
        price: 20,
        imgurl: "https://tamson-media.s3.ap-southeast-1.amazonaws.com/media/catalog/product/cache/a72dd292f5ebc7f905c5028ee744eec1/S/a/Sandro_SHPPA00571-23_V_1_1_2.webp",
        productname: "Product 4",
        colorname: "màu xanh dương"
      },
      {
        ordercode: "ORD002",
        idproduct: "P005",
        quantity: 3,
        price: 15,
        imgurl: "https://tamson-media.s3.ap-southeast-1.amazonaws.com/media/catalog/product/cache/a72dd292f5ebc7f905c5028ee744eec1/S/a/Sandro_SHPMB00036-D258_V_1_1_3.webp",
        productname: "Product 5",
        colorname: "màu xanh dương"
      },
    ];
    setProductinbill(productInBill.filter((product) => product.ordercode === order?.orderCode));
  }, [order?.orderCode])
  return (
    <>
      <div className='container' style={{ borderTop: "1px solid #000" }}>
        <div className="row mt-3">
          <div className="d-flex col">
            <h5># {order?.orderCode} </h5>
            <span className='mx-3'>{order?.status}</span>
          </div>
          <div className="d-flex col">
            <span>Date Created: {order?.datecreated}</span>
            <span className='mx-3'>Confirmation deadline: {order?.deadline}</span>
          </div>
        </div>
        <div className="d-flex">
          <span>Quantity: {order?.quantity}</span>
          <span className='mx-3'>Total Amount: {order?.totalAmount}</span>
        </div>
        <h5 className='mt-2'>Product</h5>
        <span>Có {productinbill.length} sản phẩm</span>
        <div className={`${styles["cart-product"]}`}>
          {productinbill.map((product) => (
            <div className={`mx-3 ${styles["cart"]}`} key={product.idproduct}>
              <img src={product.imgurl} className="card-img-top" alt={product.productname} />
              <div className={`${styles["information"]}`}>
                <h5>{product.productname}</h5>
                <p>Color: {product.colorname}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles["operation"]}`}>
          <button type="button" className="btn btn-primary">Primary</button>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
