import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false,
    openModal : false,
    openUserProfModal : false,
    openDeleteAccModal : false
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
        }
    }
})

export const dialogActions = dialogReducer.actions

export default dialogReducer