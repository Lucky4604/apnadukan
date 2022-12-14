import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,
    cartTotalAmount:0

}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state,action){
        console.log(action.payload)
    }
  }
});

export const {ADD_TO_CART} = cartSlice.actions
export const selectCartItems=(state)=>state.cartItems;
export const selectCartTotalQuantity=(state)=>state.cartTotalQuantity;
export const selectCartTotalAmount=(state)=>state.cartTotalAmount;



export default cartSlice.reducer