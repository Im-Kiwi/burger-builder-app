import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    beginAnime : false, // to make sure that transition of the element only begin when the value turns true
}

const animationReducer = createSlice({
    name : 'animation',
    initialState,
    reducers : {
        updateBeginAnime (state, action) {
            state.beginAnime = action.payload
        },
    }
})

export const animationActions = animationReducer.actions

export default animationReducer