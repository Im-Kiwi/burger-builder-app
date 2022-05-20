import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    itemToDel : {},
    cartItems : [],
    currentItem : [],
    instantBuy : false, // if user buying a burger directly without adding it into cart
}

const cartReducer = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        updateItemToDel (state, action) {
            state.itemToDel = action.payload
        },
        updateCartItems (state, action) {
            state.cartItems = action.payload
        },
        updateCurrentItem (state, action) {
            state.currentItem = [action.payload]
        },
        updateInstantBuy (state, action) {
            state.instantBuy = action.payload
        }
    },
})

export const cartActions = cartReducer.actions

export default cartReducer