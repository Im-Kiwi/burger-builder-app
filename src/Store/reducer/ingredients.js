import { createSlice } from '@reduxjs/toolkit'
import * as global from '../../identifiers/identifiers'

// information of the burger slices and its quantities and status of extra items whether it is included by the user or not
const initialState = {
    Lettuce : {name : 'Lettuce', qty : 0},
    Cheese : {name : 'Cheese', qty : 0},
    Onion : {name : 'Onion', qty : 0},
    Tomato : {name : 'Tomato', qty : 0},
    Meat : {name : 'Meat', qty : 0},    
    Bacon : {name : 'Bacon', qty : 0},
    Coke : {name : 'Coke', status : false},
    Sauce : {name : 'Sauce', status : false},
    FrenchFries : {name : 'FrenchFries', status : false},
    totalPrice : 0,
}

const ingredientsReducer = createSlice({
    name : 'ingredients',
    initialState,
    reducers : {    
        updateIngredient (state, action) {
            switch (action.payload.ingName) {
                case state.Lettuce.name:
                    state.Lettuce.qty = state.Lettuce.qty + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;  
                case state.Cheese.name:
                    state.Cheese.qty = state.Cheese.qty + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case state.Meat.name:
                    state.Meat.qty = state.Meat.qty + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case state.Onion.name:
                    state.Onion.qty = state.Onion.qty + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case state.Tomato.name:
                    state.Tomato.qty = state.Tomato.qty + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                case state.Bacon.name:
                    state.Bacon.qty = state.Bacon.qty + action.payload.qty
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;            
                default:
                    break;
            }
        },
        updateAddExtras (state, action) {
            switch (action.payload.name) {
                case state.Coke.name:
                    state.Coke.status = action.payload.value
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;                
                case state.FrenchFries.name:
                    state.FrenchFries.status = action.payload.value
                    state.totalPrice = state.totalPrice + action.payload.price
                    break;
                default:
                    break;
            }
        },
        updateReset (state) {
            state.Lettuce.qty = 0
            state.Cheese.qty = 0
            state.Meat.qty = 0
            state.Tomato.qty = 0
            state.Bacon.qty = 0
            state.Onion.qty = 0
            state.Coke.status = false
            state.Sauce.status = false
            state.FrenchFries.status = false
            state.totalPrice = 0
        }        
    }
})

export const ingredientsActions = ingredientsReducer.actions

export default ingredientsReducer