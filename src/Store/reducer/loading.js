import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false // to enable disable the loading spinner
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