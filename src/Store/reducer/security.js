import { createSlice } from '@reduxjs/toolkit'

// a slice of state of redux store for Security component
const initialState = {
    navigationIndex : 0, // this will record the navigation of user in security modal
    newEmailOrPass : '', // this will record new email or password mention by the user
    newUserName : '', // this will record the user name 
    confirmPass : '', // record confirm password 
    startValidation : false, // this will turn to true when user clicks on the confirm button, which will validate the form
    successFlag : false, // if the request to the database is successful then success message will appear
    userNameExist : false // user name already exist or not
}

const securityReducer = createSlice({
    name : 'security',
    initialState,
    reducers : {
        updateNavigationIndex(state, action) {
            state.navigationIndex = action.payload
        },
        updateNewEmailOrPass (state, action) {
            state.newEmailOrPass = action.payload
        },
        updateNewUserName (state, action) {
            state.newUserName = action.payload
        },
        updateConfirmPass (state, action) {
            state.confirmPass = action.payload
        },
        updateStartValidation (state, action) {
            state.startValidation = action.payload
        },
        updateSuccessFlag (state, action) {
            state.successFlag = action.payload
        },
        updateUserNameExist (state, action) {
            state.userNameExist = action.payload
        }
    }
})

export const securityActions = securityReducer.actions 

export default securityReducer