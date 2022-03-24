import { configureStore } from "@reduxjs/toolkit";
import userFormReducer from "./reducer/userForm";
import dialogReducer from "./reducer/dialog";
import ingredientsReducer from "./reducer/ingredients";

const store = configureStore({
    reducer : {
        userForm : userFormReducer.reducer,
        dialog : dialogReducer.reducer,
        ingredients : ingredientsReducer.reducer
    }
    
});

export default store;