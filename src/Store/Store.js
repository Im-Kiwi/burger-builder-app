import { configureStore } from "@reduxjs/toolkit";
import userFormReducer from "./reducer/userForm";
import dialogReducer from "./reducer/dialog";

const store = configureStore({
    reducer : {
        userForm : userFormReducer.reducer,
        dialog : dialogReducer.reducer
    }
    
});

export default store;