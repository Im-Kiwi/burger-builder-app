import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    basePrice : {}
}

const basePriceReducer = createSlice({
    name : 'basePrice',
    initialState,
    reducers : {
        updateBasePrice (state, action) {
            state.basePrice = action.payload
        }
    }
})

export const basePriceActions = basePriceReducer.actions

export default basePriceReducer