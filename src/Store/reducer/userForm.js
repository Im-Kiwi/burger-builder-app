import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isSignUpForm : false,
    isUserNameExist : false,
    currentUser : {}      
}

const userFormReducer = createSlice({
    name : 'user form reducer',
    initialState,
    reducers : {
        updateIsSignUpForm (state, action) {
            state.isSignUpForm = action.payload
        },
        updateCurrentUser (state, action) {
            state.currentUser = action.payload;
        },
        updateIsUserNameExist (state, action) {
            state.isUserNameExist = action.payload
        }
    }    
})

export const userFormActions = userFormReducer.actions

export default userFormReducer