import { createSlice } from '@reduxjs/toolkit'
import * as global from '../../identifiers/identifiers'

const initialState = {
    Lettuce : 0,
    Cheese : 0,
    Meat : 0,
    Tomato : 0,
    Bacon : 0,
    Coke : false,
    Sauce : false,
    FrenchFries : false,
    totalPrice : 1
}

const ingredientsReducer = createSlice({
    name : 'ingredients',
    initialState,
    reducers : {
        updateIngredient (state, action) {
            switch (action.payload.ingName) {
                case global.lettuce:
                    state.Lettuce = state.Lettuce + action.payload.qty
                    break;  
                case global.cheese:
                    state.Cheese = state.Cheese + action.payload.qty
                    break;
                case global.meat:
                    state.Meat = state.Meat + action.payload.qty
                    break;
                case global.tomato:
                    state.Tomato = state.Tomato + action.payload.qty
                    break;
                case global.bacon:
                    state.Bacon = state.Bacon + action.payload.qty
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
        }
    }
})

export const ingredientsActions = ingredientsReducer.actions

export default ingredientsReducer