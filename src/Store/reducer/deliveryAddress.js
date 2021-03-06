
import { createSlice } from '@reduxjs/toolkit'
import { firstName, lastName, phoneNumber, address, country, state as aState, city, addressType, pinCode } from '../../identifiers/identifiers'

// this slice is to store the information of addresses 
const initialState = {
    addressForm : { // store the values which user filled inside the address form
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
    addressStore : [], // contains all addresses of the authenticated user
    editZone : {flag : false, id : null}, // make sure whether the user clicked on the edit button, if yes then the id of that address will be stored as an id
    validationFlag : false // when user click on the SAVE button of the address form
}

const deliveryAddress = createSlice({
    name : 'addresses',
    initialState,
    reducers : {
        updateAddressForm (state, action) {
            switch (action.payload.label) {
                case firstName:
                    state.addressForm.firstName = action.payload.value
                    break;
                case lastName:
                    state.addressForm.lastName = action.payload.value
                    break;
                case phoneNumber:
                    state.addressForm.phoneNumber = action.payload.value
                    break;
                case address:
                    state.addressForm.address = action.payload.value
                    break;
                case country:
                    state.addressForm.selectCountry = action.payload.value
                    break;
                case aState:
                    state.addressForm.selectState = action.payload.value
                    break;
                case city:
                    state.addressForm.city = action.payload.value
                    break;
                case addressType:
                    state.addressForm.addressType = action.payload.value
                    break;
                case pinCode:
                    state.addressForm.pinCode = action.payload.value
                    break;
            }
        },
        updateResetAddressForm(state, action) {
            state.addressForm.firstName = ''
            state.addressForm.lastName = ''
            state.addressForm.phoneNumber = ''
            state.addressForm.address = ''
            state.addressForm.selectCountry = ''
            state.addressForm.selectState = ''
            state.addressForm.city = ''
            state.addressForm.addressType = 'Home'
            state.addressForm.pinCode = ''
        },
        updateAddressStore (state, action) {
            state.addressStore = [...action.payload] 
        },
        updateEditZone  (state, action) {
            state.editZone.flag = action.payload.flag
            state.editZone.id = action.payload.id
        },
        updateValidationFlag (state, action) {
            state.validationFlag = action.payload
        }
    }        
})

export const deliveryAddressActions = deliveryAddress.actions

export default deliveryAddress