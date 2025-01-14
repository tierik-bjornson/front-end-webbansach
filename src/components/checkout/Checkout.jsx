import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contex/GlobalState";
import './Checkout.css'

const Checkout=()=>{
    const {cart, orders, addItemToOrderList, clearCart}= useContext(GlobalContext);
    const {distcount, extraFees, tax}={distcount:20, extraFees:99, tax:4};
    const subTotal=Math.floor(cart?.reduce((sum,curr)=> sum+curr.list_price, 0));
    const total=Math.floor(subTotal+99+5-(subTotal+99+5)*0.2);
    const [isOrdered, setIsOrdered]=useState(false);
    const handlePay=()=>{
        addItemToOrderList({
            OrderID: orders.length+1,
            buyerId: 1,
            data:[...cart],
            price: total,
            address:"7 Rusk Court",
            deliveryDate:"11/28/2024",
            isDelivered: false,
        });
        clearCart();
        setIsOrdered(true);
    };
    return(
        <div className="checkout-container">
            {isOrdered ? (
                <h3>
                Yay!  Order placed successfully. <Link to="/">Shop more!</Link>
                </h3>
            ) : (
                <>
                    <div className="back-to-cart-list">
                        <Link to="/cart">&#8592; Back to cart</Link>
                    </div>
                        <div className="custom-row">
                            <h4>Order Review</h4>
                            <span>{cart.length} items in cart</span>
                        </div>
                        <div className="custom-row">
                            <h4>Coupons</h4>
                            <span>Not Available</span>
                        </div>
                        <div className="custom-row">
                            <h4>Check Summary</h4>
                            <div className="checkou-summary">
                                <span>Subtotal</span>
                                <span>${subTotal}</span>
                            </div>
                            <div className="checkout-summary">
                                <span>Discount</span>
                                <span>{distcount}%</span>
                            </div>
                            <div className="checkout-summary">
                                <span>Extra Fee</span>
                              <span>${extraFees}</span>
                            </div>
                            <div className="checkout-summary">
                                <span>Tax</span>
                                <span>${tax}</span>
                            </div>
                        </div>
                        <div className="custom-row">
                            <h4>Total</h4>
                            <span>${total}</span>
                        </div>
                        <button className="ProductItem" onClick={handlePay}>Pay ${total}</button>
                </>
            )} 
        </div>
    );
};

export default Checkout;