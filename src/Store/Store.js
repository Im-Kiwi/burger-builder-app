import { configureStore } from "@reduxjs/toolkit";
import userFormReducer from "./reducer/userForm";

const store = configureStore({
    reducer : {
        userForm : userFormReducer.reducer
    }
    
});

export default store;