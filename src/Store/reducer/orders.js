import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deliveryAddress : {}, // selected delivery address
    orders : [], // total orders placed by the users
    paymentMethod : '', // payment method user used to buy
    paymentSuccess : false, // to inform whether payment was success or failure
    orderStatus : 'dispatching . . .' // the order status
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
        updatePaymentMethod (state, action) {
            state.paymentMethod = action.payload
        },
        updatePaymentSuccess (state, action) {
            state.paymentSuccess = action.payload
        }
    }
})

export const ordersActions = ordersReducer.actions

export default ordersReducer