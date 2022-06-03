import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore'
import { Stack, Box, Paper, TextField, MenuItem, IconButton, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel  } from '@mui/material'
import { Backdrop } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CloseRounded } from '@mui/icons-material'
import { Modal } from 'react-bootstrap'
import { v4 as uniqueId } from 'uuid'

// -------- importing from other files -------------
import { db } from '../../firebase-setup'
import { mainColors } from '../../theme/mui-theme'
import { philippinesStates, indianStates } from '../../Places/places'
import { CustomButton } from './styles.js'
import { dialogActions } from '../../Store/reducer/dialog'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'
import { firstName, lastName, phoneNumber, address, country, state, city, pinCode, addressType } from '../../identifiers/identifiers'

const AddAddress = () => {
    const dispatch = useDispatch()

    // fetching data from redux store
    const userId = useSelector(state => state.userForm.currentUser.userId)
    const openModal = useSelector(state => state.dialog.openModal)
    const addressForm = useSelector(state => state.deliveryAddresses.addressForm)
    const editZone = useSelector(state => state.deliveryAddresses.editZone)
    const addressStore = useSelector(state => state.deliveryAddresses.addressStore)
    const validationFlag = useSelector(state => state.deliveryAddresses.validationFlag)
    
    // when the user click on the edit button to edit address then all the information will be displayed in address form
    // then user can edit and later save the new address
    useEffect(() => {
        if (editZone.flag) {
            const resultantAddress = addressStore.find((_, index) => index === editZone.id)
            dispatch(deliveryAddressActions.updateAddressForm({label: firstName, value : resultantAddress.firstName}))
            dispatch(deliveryAddressActions.updateAddressForm({label: lastName, value : resultantAddress.lastName}))
            dispatch(deliveryAddressActions.updateAddressForm({label: phoneNumber, value : resultantAddress.phoneNumber}))
            dispatch(deliveryAddressActions.updateAddressForm({label: address, value : resultantAddress.address}))
            dispatch(deliveryAddressActions.updateAddressForm({label: country, value : resultantAddress.country}))
            dispatch(deliveryAddressActions.updateAddressForm({label: state, value : resultantAddress.state}))
            dispatch(deliveryAddressActions.updateAddressForm({label: city, value : resultantAddress.city}))
            dispatch(deliveryAddressActions.updateAddressForm({label: addressType, value : resultantAddress.addressType}))
            dispatch(deliveryAddressActions.updateAddressForm({label: pinCode, value : resultantAddress.pinCode}))
        }
    }, [editZone.flag])

    // this method will send data to the database
    const addressSubmitHandler = async(event) => {
        event.preventDefault()
        dispatch(deliveryAddressActions.updateValidationFlag(true)) // validation of form will begin once user click the SAVE button
        const addressData = {
            firstName : addressForm.firstName,
            lastName : addressForm.lastName,
            phoneNumber : addressForm.phoneNumber,
            address : addressForm.address,
            country : addressForm.selectCountry,
            state : addressForm.selectState,
            city : addressForm.city,
            pinCode : addressForm.pinCode,
            addressType : addressForm.addressType,
            userId : userId
        }

        // to check whether the values inside addressForm object is non empty strings
        // if it is empty string that means user is not in edit mode 
        let emptyFlag = false
        const checkValues = Object.values(addressForm)
        checkValues.forEach(value => {
            if (value === '') {
                emptyFlag = true
            }
        })

        try {
            // to update the address which user edited 
            if (!emptyFlag) { 
                if (editZone.flag) {
                    await updateDoc(doc(db, 'addresses', addressStore[editZone.id].id), addressData)
                } else {
                    await addDoc(collection(db, 'addresses'), addressData) 
                }                
                closeAddressFormHandler() // to close the address form once user save it
            }
        } catch(err) {
            console.log('Some error! Please try again later')
            closeAddressFormHandler()
        }
    }

    //  this method will help to close the address form
    const closeAddressFormHandler = () => {
        dispatch(dialogActions.updateOpenModal(false))
        dispatch(deliveryAddressActions.updateEditZone({flag : false, id : null}))
        dispatch(deliveryAddressActions.updateResetAddressForm())
        dispatch(deliveryAddressActions.updateValidationFlag(false))
    }

    // method to handle change in the input tags of the address form
    const changeHandler = (event, label) => {
        dispatch(deliveryAddressActions.updateAddressForm({label : label, value : event.target.value}))
    }

    let statesOfCountry = []
    // storing the states of country in an array
    switch (addressForm.selectCountry) {
        case 'Philippines':
            statesOfCountry = [...philippinesStates]
            break;
        case 'India':
            statesOfCountry = [...indianStates]
            break;
        default:
            statesOfCountry = []
    }

    return (
        <Backdrop open = {openModal}>
            <Modal centered 
                size = 'lg' 
                show = {openModal} 
                onHide = {closeAddressFormHandler}>
                <Box style = {{width : 'inherit'}}>
                    <Paper                         
                        sx = {{
                            padding : 5, 
                            backgroundColor : '#f9a620',                             
                            border : 'solid 2px #110f12', 
                            borderRadius : 0}} >
                        <IconButton 
                            sx = {{
                                float : 'right', 
                                position : 'relative', 
                                bottom : 25, 
                                left : 20}} 
                            className = 'text-dark'
                            onClick = {closeAddressFormHandler} >
                            <CloseRounded />
                        </IconButton>
                        
                        <form onSubmit = {(event) => addressSubmitHandler(event)}>
                            <Stack direction = 'column'>
                                <Stack direction = 'row'>
                                    <TextField variant='filled' className = 'noInputBorder' 
                                        sx = {{mr : 2}} 
                                        size = 'small'
                                        color = 'blackish' 
                                        label = {firstName}
                                        value = {addressForm.firstName}
                                        onChange = {(event) => changeHandler(event, firstName)}
                                        error = {validationFlag && addressForm.firstName.length === 0 ? true : false}
                                        helperText = {validationFlag && addressForm.firstName.length === 0 ? 'Mention first name' : ''} />
                                    <TextField 
                                        variant='filled' 
                                        className = 'noInputBorder' 
                                        color = 'blackish' 
                                        label = {lastName} 
                                        size = 'small'
                                        onChange={(event) => changeHandler(event, lastName)}
                                        value = {addressForm.lastName}
                                        error = {validationFlag && addressForm.lastName.length === 0 ? true : false}
                                        helperText = {validationFlag && addressForm.lastName.length === 0 ? 'Mention last name' : ''} />
                                </Stack>
                                <Box sx = {{mt : 2}}>
                                    <TextField 
                                        variant='filled' 
                                        className = 'noInputBorder' 
                                        color = 'blackish' 
                                        type = 'number' 
                                        label = {phoneNumber} 
                                        size = 'small'
                                        value = {addressForm.phoneNumber}
                                        onChange = {(event) => changeHandler(event, phoneNumber)}
                                        error = {validationFlag && addressForm.phoneNumber.length === 0 ? true : false}
                                        helperText = {validationFlag && addressForm.phoneNumber.length === 0 ? 'Add phone number' : null} />
                                </Box>
                                <TextField 
                                    variant='filled' 
                                    className = 'noInputBorder' 
                                    color = 'blackish' 
                                    sx = {{mt : 2}} 
                                    fullWidth multiline 
                                    rows={4} 
                                    size = 'small' 
                                    label = {address}
                                    onChange = {event => changeHandler(event, address)}
                                    value = {addressForm.address}
                                    error = {validationFlag && addressForm.address.length === 0 ? true : false}
                                    helperText = {validationFlag && addressForm.address.length === 0 ? 'Mention address' : ''} />
                                <Stack direction = 'row' sx = {{mt : 2}}>
                                    <Box sx = {{width : 200, mr : 2}}>
                                        <TextField 
                                            fullWidth select 
                                            variant='filled'  
                                            className = 'noInputBorder' 
                                            label = 'Country'
                                            size = 'small' 
                                            color = 'blackish' 
                                            value = {addressForm.selectCountry}
                                            onChange = {(event) => changeHandler(event, country)}
                                            error = {validationFlag && addressForm.selectCountry.length === 0 ? true : false}
                                            helperText = {validationFlag && addressForm.selectCountry.length === 0 ? 'Mention Country' : ''}>
                                            <MenuItem value = 'India'>India</MenuItem>
                                            <MenuItem value = 'Philippines'>Philippines</MenuItem>
                                        </TextField>                                            
                                    </Box>
                                    <Box sx = {{width : 200, mr : 2}}>
                                        <TextField 
                                            variant='filled' 
                                            disabled  = {!Boolean(addressForm.selectCountry)}
                                            select fullWidth
                                            value = {addressForm.selectState}
                                            onChange = {(event) => changeHandler(event, state)}                                         
                                            className = 'noInputBorder' 
                                            label = {state}
                                            size = 'small'
                                            color = 'blackish' 
                                            error = {validationFlag && addressForm.selectState.length === 0 ? true : false}
                                            helperText = {validationFlag && addressForm.selectState.length === 0 ? 'Mention state' : ''} 
                                            SelectProps = {{
                                                MenuProps : {
                                                    sx : {
                                                        maxHeight : 200
                                                    }
                                                }                                                    
                                            }}>
                                            {statesOfCountry.map(state => {
                                                return (
                                                    <MenuItem sx = {{height : 25}} key = {uniqueId()} value = {state}>{state}</MenuItem>
                                                )
                                            })}    
                                        </TextField>
                                    </Box>
                                    <TextField 
                                        variant='filled'
                                        disabled = {!Boolean(addressForm.selectState)}
                                        className = 'noInputBorder' 
                                        label = {city} 
                                        size = 'small'
                                        color = 'blackish' 
                                        onChange={(event) => changeHandler(event, city)}
                                        value = {addressForm.city}
                                        error = {validationFlag && addressForm.city.length === 0 ? true : false}
                                        helperText = {validationFlag && addressForm.city.length === 0 ? 'Mention city' : ''} />
                                </Stack>
                                <Box>
                                    <TextField 
                                        variant='filled' 
                                        sx = {{mt:2}} 
                                        label = {pinCode}
                                        type = 'number' 
                                        size = 'small'
                                        color = 'blackish'                                             
                                        className = 'noInputBorder' 
                                        value = {addressForm.pinCode}
                                        onChange = {(event) => changeHandler(event, pinCode)}
                                        error = {validationFlag && addressForm.pinCode.length === 0 ? true : false}
                                        helperText = {validationFlag && addressForm.pinCode.length === 0 ? 'Add pincode' : null} />
                                </Box>                            
                                <FormControl sx = {{mt:2}}>
                                    <FormLabel 
                                        id = 'address-type' 
                                        sx = {{'& .Mui-focused' : {color : 'rgba(0, 0, 0, 0.6)'}}}
                                        color = 'blackish'>
                                        Address Type
                                    </FormLabel>
                                    <RadioGroup row
                                        aria-labelledby='address-type'  
                                        value = {addressForm.addressType} 
                                        onChange = {(event) => changeHandler(event, addressType)}>
                                        <FormControlLabel 
                                            label = 'Home' 
                                            value = 'Home' 
                                            control = {<Radio color = 'blackish' />} />
                                        <FormControlLabel 
                                            label = 'Office' 
                                            value = 'Office'
                                            control = {<Radio color = 'blackish' />} />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>                        
                            <CustomButton 
                                sx = {{mt : 2, borderRadius : 0, color : '#f9b826'}}
                                color = 'blackish' 
                                variant = 'contained' 
                                type = 'submit'>
                                <strong>Save</strong>
                            </CustomButton>
                        </form>
                    </Paper>
                </Box>
            </Modal>
        </Backdrop>
    )
}

export default AddAddress