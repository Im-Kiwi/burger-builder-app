import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    prevPath : ''
}

const previousPath = createSlice({
    name : 'previous path',
    initialState,
    reducers : {
        updatePrevPath(state, action) {
            state.prevPath = action.payload
        }
    }
})

export const previousPathActions = previousPath.actions

export default previousPath