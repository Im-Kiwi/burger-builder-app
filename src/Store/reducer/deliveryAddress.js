
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addressStore : [],
    addAddressToggle : false, // when user add address, this value will change which is use as a dependency in useEffect
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