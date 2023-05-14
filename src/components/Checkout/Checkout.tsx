import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import DeliveryInformation from "./DeliveryInformation/DeliveryInformation";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import styles from "./Checkout.module.css"

function Checkout() {
    return (
        <>
        <Navbar />
        <div className={`container ${styles["checkout"]}`}>
            <div className="row">
                <ShoppingCart/>
                <DeliveryInformation/>   
            </div>
        </div>
        <Footer/>
        </>       
    );
}

export default Checkout;