import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogIn : false
}

const userFormReducer = createSlice({
    name : 'user form reducer',
    initialState,
    reducers : {
        updateIsLogIn (state, action) {
            state.isLogIn = action.payload
        }
    }    
});

export const userFormActions = userFormReducer.actions

export default userFormReducer;