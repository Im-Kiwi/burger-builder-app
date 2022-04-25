
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addressStore : [],
    addAddressToggle : false 
}

const deliveryAddress = createSlice({
    name : 'addresses',
    initialState,
    reducers : {
        updateAddressStore (state, action) {
            state.addressStore = [...action.payload] 
        }
    }
})

export const deliveryAddressActions = deliveryAddress.actions

export default deliveryAddress