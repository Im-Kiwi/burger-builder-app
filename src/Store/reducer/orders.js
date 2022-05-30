import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deliveryAddress : {},
    orders : [],
    paymentSuccess : false
}

const ordersReducer = createSlice({
    name : 'orders',
    initialState,
    reducers : {
        updateDeliveryAddress (state, action) {
            state.deliveryAddress = action.payload
        },
        updateOrders (state, action) {
            state.orders = [...action.payload]
        },
        updatePaymentSuccess (state, action) {
            state.paymentSuccess = action.payload
        }
    }
})

export const ordersActions = ordersReducer.actions

export default ordersReducer