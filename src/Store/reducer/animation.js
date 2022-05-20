import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    beginAnime : false,
    animeAtEnd : false
}

const animationReducer = createSlice({
    name : 'animation',
    initialState,
    reducers : {
        updateBeginAnime (state, action) {
            state.beginAnime = action.payload
        },
        updateAnimeAtEnd (state, action) {
            state.animeAtEnd = action.payload
        }
    }
})

export const animationActions = animationReducer.actions

export default animationReducer