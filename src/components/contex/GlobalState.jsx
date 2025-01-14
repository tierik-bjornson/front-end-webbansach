import React, {Children, createContext, useReducer} from "react";
import AppREducer from "./AppREducer";

const initialState={
    cart: [],
    orders: [],
}

export const GlobalContext=createContext(initialState);

export const GlobalProvider=({children}) => {
    const [state, dispatch]=useReducer(AppREducer,initialState);
    const addItemToCartList=(productItem) =>{
        dispatch({
            type: "ADD_ITEM_IN_CART",
            payload: productItem,
        });
    };

    const removeItemFromCartList=(productitem) => {
        dispatch({
            type:"REMOVE_ITEM_IN_CART",
            payload: productitem,
        });
    };

    const clearCart=()=>{
        dispatch({
            type: "CLEAR_CART",
        });
    };

    const addItemToOrderList=(productitem) => {
        dispatch({
            type: "ADD_ITEM_IN_ORDER",
            payload: productitem,
        });
    };

    const removeItemFromOrderList=(productitem)=>{
        dispatch({
            type:"REMOVE_ITEM_IN_ORDER",
            payload: productitem,
        });
    };

    return(
        <GlobalContext.Provider
            value={{
                cart: state.cart,
                orders: state.orders,
                addItemToCartList,
                removeItemFromCartList,
                clearCart,
                addItemToOrderList,
                removeItemFromOrderList, 
            }}>
            {children}
        </GlobalContext.Provider>
    );
};


