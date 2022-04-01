import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false,
}

const dialogReducer = createSlice({
    name : 'dialog reducer',
    initialState,
    reducers : {
        updateOpen (state, action) {
            state.open = action.payload
        }
    }
})

export const dialogActions = dialogReducer.actions

export default dialogReducer