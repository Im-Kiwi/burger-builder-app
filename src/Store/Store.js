import { configureStore,  } from "@reduxjs/toolkit";
import userFormReducer from "./reducer/userForm";
import dialogReducer from "./reducer/dialog";
import ingredientsReducer from "./reducer/ingredients";
import stepperReducer from "./reducer/stepper";
import cartReducer from "./reducer/cart";
import ordersReducer from "./reducer/orders";
import deliveryAddress from "./reducer/deliveryAddress";
import securityReducer from "./reducer/security";
import animationReducer from "./reducer/animation";
import switchCurrReducer from "./reducer/switchCurrency";
import basePriceReducer from "./reducer/basePrice";
import loadingReducer from "./reducer/loading";
import errorsReducer from "./reducer/errors";

const store = configureStore({
    reducer : {
        userForm : userFormReducer.reducer,
        dialog : dialogReducer.reducer,
        ingredients : ingredientsReducer.reducer,
        stepper : stepperReducer.reducer,
        cart : cartReducer.reducer,
        orders : ordersReducer.reducer,
        deliveryAddresses : deliveryAddress.reducer,
        security : securityReducer.reducer,
        animation : animationReducer.reducer,
        switchCurr : switchCurrReducer.reducer,
        basePrice : basePriceReducer.reducer,
        loading : loadingReducer.reducer,
        errors : errorsReducer.reducer
    }
})

export default store