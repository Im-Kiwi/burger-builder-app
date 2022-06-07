import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    logInError : {
        status : false,
        message : ''
    },
    signUpError : {
        status : false,
        message : ''
    },
    paymentError : {
        status : false,
        message : ''
    }
}

const errorsReducer = createSlice({
    name : 'errors',
    initialState,
    reducers : {
        updateLogInError (state, action) {
            state.logInError.status = action.payload.status
            state.logInError.message = action.payload.message
        },
        updateSignUpError (state, action) {
            state.signUpError.status = action.payload.status
            state.signUpError.message = action.payload.message
        },
        updatePaymentError (state, action) {
            state.paymentError.status = action.payload.status
            state.signUpError.message = action.payload.message
        }
    }
})

export const errorsActions = errorsReducer.actions

export default errorsReducer