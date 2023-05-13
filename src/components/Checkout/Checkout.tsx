import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import DeliveryInformation from "./DeliveryInformation/DeliveryInformation";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

function Checkout() {
    return (
        <>
        <Navbar />
        <div className="container">
            <div className="row g-5">
                <ShoppingCart/>
                <DeliveryInformation/>
            </div>
        </div>
        <Footer/>
        </>       
    );
}

export default Checkout;