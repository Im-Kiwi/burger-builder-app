import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false,   // to open/close fullscreen dialog 
    openModal : false, // to open/close address form modal 
    openUserProfModal : false, // to open/close user profile modal
    openDeleteAccModal : false, // to open/close delete account modal
    showCanvas : false, // this to open/close login and sign up form
    showSideMenu : false // to show navigation drawer for smaller devices
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
        },
        updateShowSideMenu (state, action) {
            state.showSideMenu = action.payload
        }
    }
})

export const dialogActions = dialogReducer.actions

export default dialogReducer