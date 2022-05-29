import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeStep : 0
}

const stepperReducer = createSlice({
    name : 'stepper',
    initialState,
    reducers : {
        updateActiveStep (state, action) {
            state.activeStep = action.payload
        },
        resetStepper (state) {
            state.activeStep = 0
        }
    }
})

export const stepperActions = stepperReducer.actions

export default stepperReducer
