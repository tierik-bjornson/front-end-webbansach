import React from "react";

export default (state, action) => {
    switch(action.type) {
        case "ADD_ITEM_IN_CART":
            return{
                ...state,
                cart: [action.payload, ...state.cart],
            }
        case "REAMOVE_ITEM_IN_CART": 
            return{
                ...state,
                cart: state.cart.fillter((productitem) => productitem.id !== action.payload.id),
            };
        case "CLEAR_CART": 
            return{
                ...state,
                cart:[],
            };
        case "ADD_ITEM_IN_ORDER":
            return{
                ...state,
                orders: [action.payload, ...state.orders], 
            };
        case "REMOVE_ITEM_IN_ORDER":
            return{
                ...state,
                orders: state.orders.fillter(
                    (order) => order.orderId !== action.payload.orderId
                ),
            };
        default:
             return state;
    }
};