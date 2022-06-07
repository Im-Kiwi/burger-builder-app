import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    networkError : false
}

const errorsReducer = createSlice({
    name : 'errors',
    initialState,
    reducers : {
        updateNetworkError (state, action) {
            state.networkError = action.payload
        }
    }
})

export const errorsActions = errorsReducer.actions

export default errorsReducer