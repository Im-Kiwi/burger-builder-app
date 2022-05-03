import { configureStore,  } from "@reduxjs/toolkit";
import userFormReducer from "./reducer/userForm";
import dialogReducer from "./reducer/dialog";
import ingredientsReducer from "./reducer/ingredients";
import stepperReducer from "./reducer/stepper";
import basePriceReducer from "./reducer/basePrice";
import cartReducer from "./reducer/cart";
import ordersReducer from "./reducer/orders";
import deliveryAddress from "./reducer/deliveryAddress";
import previousPath from "./reducer/previousPath";
import toggleReducer from './reducer/toggle'

const store = configureStore({
    reducer : {
        userForm : userFormReducer.reducer,
        dialog : dialogReducer.reducer,
        ingredients : ingredientsReducer.reducer,
        stepper : stepperReducer.reducer,
        basePrice : basePriceReducer.reducer,
        cart : cartReducer.reducer,
        orders : ordersReducer.reducer,
        deliveryAddresses : deliveryAddress.reducer,
        previousPath : previousPath.reducer,
        toggle : toggleReducer.reducer
    }
})

export default store