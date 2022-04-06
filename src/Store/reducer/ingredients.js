import { createSlice } from '@reduxjs/toolkit'
import * as global from '../../identifiers/identifiers'

const initialState = {
    Lettuce : 0,
    Cheese : 0,
    Onion : 0,
    Tomato : 0,
    Meat : 0,    
    Bacon : 0,
    Coke : false,
    Sauce : false,
    FrenchFries : false,
    totalPrice : 0.20,
    burgerName : ''
}

const ingredientsReducer = createSlice({
    name : 'ingredients',
    initialState,
    reducers : {
        updateIngredient (state, action) {
            switch (action.payload.ingName) {
                case global.lettuce:
                    state.Lettuce = state.Lettuce + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;  
                case global.cheese:
                    state.Cheese = state.Cheese + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case global.meat:
                    state.Meat = state.Meat + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case global.onion:
                    state.Onion = state.Onion + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case global.tomato:
                    state.Tomato = state.Tomato + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case global.bacon:
                    state.Bacon = state.Bacon + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;            
                default:
                    break;
            }
        },
        updateAddExtras (state, action) {
            switch (action.payload.name) {
                case global.coke:
                    state.Coke = action.payload.value
                    break;
                case global.sauce:
                    state.Sauce = action.payload.value
                    break;
                case global.frenchFries:
                    state.FrenchFries = action.payload.value
                    break;
                default:
                    break;
            }
        },
        updateReset (state) {
            state.Lettuce = 0
            state.Cheese = 0
            state.Meat = 0
            state.Tomato = 0
            state.Bacon = 0
            state.Onion = 0
            state.Coke = false
            state.Sauce = false
            state.FrenchFries = false
            state.totalPrice = 0.20
        },
        updateBurgerName (state, action) {
            state.burgerName = action.payload
        }
        
    }
})

export const ingredientsActions = ingredientsReducer.actions

export default ingredientsReducer