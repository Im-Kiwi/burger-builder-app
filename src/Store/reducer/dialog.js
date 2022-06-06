import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false,   // for fullscreen dialog 
    openModal : false, // for 
    openUserProfModal : false, // to open user profile modal
    openDeleteAccModal : false, // to open delete account modal
    showCanvas : false, // this to open login and sign up form
}

const dialogReducer = createSlice({
    name : 'dialog reducer',
    initialState,
    reducers : {
        updateOpen (state, action) {
            state.open = action.payload
        },
        updateOpenModal (state, action) {
            state.openModal = action.payload
        },
        updateUserProfModal(state, action) {
            state.openUserProfModal = action.payload
        },
        updateDelAccModal (state, action) {
            state.openDeleteAccModal = action.payload
        },
        updateShowCanvas (state, action) {
            state.showCanvas = action.payload
        }
    }
})

export const dialogActions = dialogReducer.actions

export default dialogReducer