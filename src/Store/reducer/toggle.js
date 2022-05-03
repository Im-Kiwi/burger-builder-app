import { createSlice } from '@reduxjs/toolkit'

const initialState = {    
    isDelete : false // to make sure useEffect execute everytime user clicks on delete button
}

const toggleReducer = createSlice({
    name : 'toggle',
    initialState,
    reducers : {
        updateIsDelete (state, action) {
            state.isDelete = action.payload
        }
    }
})

export const toggleActions = toggleReducer.actions

export default toggleReducer