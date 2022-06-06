import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isSignUpForm : false, // whether the current form is signup form or not
    isUserNameExist : false, // to check whether user name exist in the database
    currentUser : {}, // will contain authenticated user info
    errorFlag : false // will tell whether user trying to log in with wrong ceredentials      
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
        },
        updateErrorFlag (state, action) {
            state.errorFlag = action.payload
        }
    }    
})

export const userFormActions = userFormReducer.actions

export default userFormReducer