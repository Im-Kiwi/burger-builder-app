import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false
}

const loadingReducer = createSlice({
    name : 'loading',
    initialState,
    reducers : {
        updateLoading (state, action) {
            state.loading = action.payload
        }
    }
})

export const loadingActions = loadingReducer.actions

export default loadingReducer