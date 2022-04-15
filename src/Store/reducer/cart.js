import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems : [],
    currentItem : [],
    instantBuy : false    
}

const cartReducer = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        updateCartItems (state, action) {
            state.cartItems = action.payload
        },
        updateCurrentItem (state, action) {
            state.currentItem = [action.payload]
        },
        updateInstantBuy (state, action) {
            state.instantBuy = action.payload
        }
    }
})

export const cartActions = cartReducer.actions

export default cartReducer