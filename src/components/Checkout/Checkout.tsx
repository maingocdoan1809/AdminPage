import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import DeliveryInformation from "./DeliveryInformation/DeliveryInformation";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import styles from "./Checkout.module.css";
import Layout from "../../layouts/CustomerLayout/Layout";
import { useEffect } from "react";
import CartContext from "../../contexts/CartContext/CartContext";

function Checkout() {
  useEffect(() => {
    document.title = "Checkout";
  }, []);

  return (
    <Layout>
      <div className={`container ${styles["checkout"]}`}>
        <div className="row">
          <CartContext>
            <ShoppingCart />
            <DeliveryInformation />
          </CartContext>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
