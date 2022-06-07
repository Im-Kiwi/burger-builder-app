import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    switchCurr : false // toggle currency  false-india ruppee, true - pesos
}

const switchCurrReducer = createSlice({
    name : 'Switch Currency',
    initialState,
    reducers : {
        updateSwitchCurr (state, action) {
            state.switchCurr = action.payload
        }
    }
})

export const switchCurrActions = switchCurrReducer.actions

export default switchCurrReducer