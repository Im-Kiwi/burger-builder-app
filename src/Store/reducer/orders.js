import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deliveryAddress : {}
}

const ordersReducer = createSlice({
    name : 'orders',
    initialState,
    reducers : {
        updateDeliveryAddress (state, action) {
            state.deliveryAddress = action.payload
        }
    }
})

export const ordersActions = ordersReducer.actions

export default ordersReducer