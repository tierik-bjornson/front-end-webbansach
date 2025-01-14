import React, {useContext, useState} from "react";
import { GlobalContext } from "../contex/GlobalState";

function Orders(){
    const {orders} = useContext(GlobalContext);
    return(
        <div className="cart-list">
            {orders.map((order)=>{
                <div className="checkout-container" key={order.orderId}>
                    <h3>#ID-{order.orderId}</h3>
                    {order.data.map((productitem)=>{
                        <div className="cart-item" key={productitem.id}>
                            <div className="ProductItem-price">{productitem.list_price}</div>
                            <div className="ProductItem-name">{productitem.name}</div>
                            <div className="ProducItem-expectedDelivery">
                                (Giao hàng trong 3-5 ngày)
                            </div>
                        </div>
                    })}
                </div>
            })}
        </div>        
    );
}
export default Orders;
