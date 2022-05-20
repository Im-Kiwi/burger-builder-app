import { configureStore,  } from "@reduxjs/toolkit";
import userFormReducer from "./reducer/userForm";
import dialogReducer from "./reducer/dialog";
import ingredientsReducer from "./reducer/ingredients";
import stepperReducer from "./reducer/stepper";
import cartReducer from "./reducer/cart";
import ordersReducer from "./reducer/orders";
import deliveryAddress from "./reducer/deliveryAddress";
import toggleReducer from './reducer/toggle'
import securityReducer from "./reducer/security";
import animationReducer from "./reducer/animation";

const store = configureStore({
    reducer : {
        userForm : userFormReducer.reducer,
        dialog : dialogReducer.reducer,
        ingredients : ingredientsReducer.reducer,
        stepper : stepperReducer.reducer,
        cart : cartReducer.reducer,
        orders : ordersReducer.reducer,
        deliveryAddresses : deliveryAddress.reducer,
        toggle : toggleReducer.reducer,
        security : securityReducer.reducer,
        animation : animationReducer.reducer
    }
})

export default store