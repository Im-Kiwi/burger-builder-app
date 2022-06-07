import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signUpForm : { // to control sign up form
        userName : '',
        emailAddress : '',
        password : '',
        confirmPass : ''
    },
    isSignUpForm : false, // whether the current form is signup form or not
    isUserNameExist : false, // to check whether user name exist in the database
    currentUser : {}, // will contain authenticated user info
    errorFlag : false, // will tell whether user trying to log in with wrong ceredentials
    toDeleteAcc : false // to delete account permanently (is used when user has to re-aunthenticate to delete account)
}

const userFormReducer = createSlice({
    name : 'user form reducer',
    initialState,
    reducers : {
        updateUserName (state, action) {
            state.signUpForm.userName = action.payload
        },
        updateEmail (state, action) {
            state.signUpForm.emailAddress = action.payload
        },
        updatePassword (state, action) {
            state.signUpForm.password = action.payload
        },
        updateConfirmPass (state, action) {
            state.signUpForm.confirmPass = action.payload
        },
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
        },
        updateDeleteAccount (state, action) {
            state.toDeleteAcc = action.payload
        }
    }    
})

export const userFormActions = userFormReducer.actions

export default userFormReducer