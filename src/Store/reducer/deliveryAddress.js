
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addressForm : {
        firstName : '',
        lastName : '',
        phoneNumber : '',
        address : '',
        selectCountry : '',
        selectState : '',
        city : '',
        addressType : 'Home',
        pinCode : ''       
    },
    addressStore : [],
    editZone : {flag : false, id : null}
}

const deliveryAddress = createSlice({
    name : 'addresses',
    initialState,
    reducers : {
        updateFirstName (state, action) {
            state.addressForm.firstName = action.payload
        },
        updateLastName (state, action) {
            state.addressForm.lastName = action.payload
        },
        updatePhoneNumber (state, action) {
            state.addressForm.phoneNumber = action.payload
        },
        updateAddress (state, action) {
            state.addressForm.address = action.payload
        },
        updateSelectCountry (state, action) {
            state.addressForm.selectCountry = action.payload
        },
        updateSelectState (state, action) {
            state.addressForm.selectState = action.payload
        },
        updateCity (state, action) {
            state.addressForm.city = action.payload
        },
        updateAddressType (state, action) {
            state.addressForm.addressType = action.payload
        },
        updatePinCode (state, action) {
            state.addressForm.pinCode = action.payload
        },
        updateAddressStore (state, action) {
            state.addressStore = [...action.payload] 
        },
        updateEditFlag  (state, action) {
            state.editFlag = action.payload
        }
    }        
})

export const deliveryAddressActions = deliveryAddress.actions

export default deliveryAddress