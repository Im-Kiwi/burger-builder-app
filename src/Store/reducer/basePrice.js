import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    basePrice : {} // will contain the base price of the burger and other extra items
}

const basePriceReducer = createSlice({
    name : 'base price',
    initialState,
    reducers : {
        updateBasePrice (state, action) {
            state.basePrice = action.payload
        }
    }
})

export const basePriceActions = basePriceReducer.actions

export default basePriceReducer