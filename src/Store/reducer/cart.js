import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems : []      
}

const cartReducer = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        updateCartItems (state, action) {
            state.cartItems = action.payload
        }
    }
})

export const cartActions = cartReducer.actions

export default cartReducer