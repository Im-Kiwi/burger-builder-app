import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection, onSnapshot, query, where, doc } from 'firebase/firestore'
import { Stack, Box, Paper, TextField, MenuItem, IconButton, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel  } from '@mui/material'
import { Backdrop } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CloseRounded } from '@mui/icons-material'
import { Modal } from 'react-bootstrap'
import { v4 as uniqueId } from 'uuid'

// -------- importing from other files -------------
import { db } from '../../firebase-setup'
import { userFormTheme } from '../../theme/mui-theme'
import { philippinesStates, indianStates } from '../../Places/places'
import { CustomButton } from './styles.js'
import { dialogActions } from '../../Store/reducer/dialog'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'


const formLabel = {
    firstName : 'First Name',
    lastName : 'Last Name',
    phoneNumber : 'Phone Number',
    address : 'Your Address',
    country : 'Country',
    state : 'State',
    city : 'City/District/Town',
    pinCode : 'Pin Code',
    addressType : 'Address Type'
}

const AddAddress = () => {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.userForm.currentUser.userId)
    const openModal = useSelector(state => state.dialog.openModal)
    const editFlag = useSelector(state => state.deliveryAddresses.editFlag)
    const addressForm = useSelector(state => state.deliveryAddresses.addressForm)
    
    const [selectAddressType, setSelectAddressType] = useState('Home')

    // creating schema for form validation
    const addressFormSchema = yup.object().shape({
        firstName : yup.string().required('Mention first name'),
        lastName : yup.string().required('Mention last name'),
        phoneNumber : yup.number().required(),
        address : yup.string().required('Mention address'),
        city : yup.string().required('Add city'),
        state : yup.string().required('Add state'),
        country : yup.string().required('Add country'),
        pinCode : yup.number().required('Add pin code'),  
    })

    // using react form hook and also connecting yup to react form hook
    const { register, formState : {errors}, handleSubmit } = useForm({
        resolver : yupResolver(addressFormSchema)
    })

    // this method will send data to the database
    const addressSubmitHandler = async(data) => {
        const addressData = {
            firstName : data.firstName,
            lastName : data.lastName,
            phoneNumber : data.phoneNumber,
            address : data.address,
            country : addressForm.selectCountry,
            state : addressForm.selectState,
            city : data.city,
            pinCode : data.pinCode,
            addressType : addressForm.addressType,
            userId : userId
        }

        try {
            await addDoc(collection(db, 'addresses'), addressData) 
            const toListen = query(collection(db, 'addresses'))
            const addressesUpdate = onSnapshot(toListen, (result) => {

            })

        } catch(err) {
            console.log('Some error! Please try again later')
        }
    }

    const closeAddressFormHandler = () => {
        dispatch(dialogActions.updateOpenModal(false))
        dispatch(deliveryAddressActions.updateFirstName(''))
        dispatch(deliveryAddressActions.updateLastName(''))
        dispatch(deliveryAddressActions.updatePhoneNumber(''))
        dispatch(deliveryAddressActions.updateAddress(''))
        dispatch(deliveryAddressActions.updateSelectCountry(''))
        dispatch(deliveryAddressActions.updateSelectState(''))
        dispatch(deliveryAddressActions.updateCity(''))
        dispatch(deliveryAddressActions.updateAddressType(''))
        dispatch(deliveryAddressActions.updatePinCode(''))
    }

    const changeHandler = (event, label) => {
        switch (label) {
            case formLabel.firstName:
                dispatch(deliveryAddressActions.updateFirstName(event.target.value))
                break;
            case formLabel.lastName:
                dispatch(deliveryAddressActions.updateLastName(event.target.value))
                break;
            case formLabel.phoneNumber:
                dispatch(deliveryAddressActions.updatePhoneNumber(event.target.value))
                break;
            case formLabel.address:
                dispatch(deliveryAddressActions.updateAddress(event.target.value))
                break;
            case formLabel.pinCode:
                dispatch(deliveryAddressActions.updatePinCode(event.target.value))
                break;
            case formLabel.country:
                dispatch(deliveryAddressActions.updateSelectCountry(event.target.value))
                break;
            case formLabel.state:
                dispatch(deliveryAddressActions.updateSelectState(event.target.value))
                break;
            case formLabel.city:
                dispatch(deliveryAddressActions.updateCity(event.target.value))
                break;
            case formLabel.addressType:
                dispatch(deliveryAddressActions.updateAddressType(event.target.value))
                break;
            default:
                throw 'unable to change input'
        }
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
            <Modal centered size = 'lg' show = {openModal} onHide = {closeAddressFormHandler}>
                <Box style = {{width : 'inherit'}}>
                        <Paper sx = {{padding : 5, backgroundColor : '#110f12', border : 'solid 2px white', borderRadius : 0}} >
                            <IconButton 
                                sx = {{float : 'right', position : 'relative', bottom : 25, left : 20}} 
                                className = 'text-light'
                                onClick = {closeAddressFormHandler}
                            >
                                <CloseRounded />
                            </IconButton>
                            <form onSubmit = {handleSubmit(addressSubmitHandler)}>
                                <ThemeProvider theme = {userFormTheme}>
                                    <Stack direction = 'column'>
                                        <Stack direction = 'row'>
                                            <TextField variant='filled' className = 'noInputBorder' 
                                                {...register('firstName')}
                                                sx = {{mr : 2, input : {borderColor : 'red'}}} 
                                                size = 'small' 
                                                label = {formLabel.firstName}
                                                value = {addressForm.firstName}
                                                onChange = {(event) => changeHandler(event, formLabel.firstName)}
                                                error = {Boolean(errors.firstName)}
                                                helperText = {errors.firstName ?.message}
                                            />
                                            <TextField 
                                                {...register('lastName')}
                                                variant='filled' 
                                                className = 'noInputBorder' 
                                                label = {formLabel.lastName} 
                                                size = 'small'
                                                onChange={(event) => changeHandler(event, formLabel.lastName)}
                                                value = {addressForm.lastName}
                                                error = {Boolean(errors.lastName)}
                                                helperText = {errors.lastName ?.message} />
                                        </Stack>
                                        <Box sx = {{mt : 2}}>
                                            <TextField 
                                                {...register('phoneNumber')}
                                                variant='filled' 
                                                className = 'noInputBorder' 
                                                type = 'number' 
                                                label = {formLabel.phoneNumber} 
                                                size = 'small'
                                                value = {addressForm.phoneNumber}
                                                onChange = {(event) => changeHandler(event, formLabel.phoneNumber)}
                                                error = {Boolean(errors.phoneNumber)}
                                                helperText = {Boolean(errors.phoneNumber) ? 'Add phone number' : null} />
                                        </Box>
                                        <TextField 
                                            {...register('address')}
                                            variant='filled' 
                                            className = 'noInputBorder' 
                                            sx = {{mt : 2}} 
                                            fullWidth multiline 
                                            rows={4} 
                                            size = 'small' 
                                            label = {formLabel.address}
                                            onChange = {event => changeHandler(event, formLabel.address)}
                                            value = {addressForm.address}
                                            error = {Boolean(errors.address)}
                                            helperText = {errors.address ?.message} />
                                        <Stack direction = 'row' sx = {{mt : 2}}>
                                            <Box sx = {{width : 200, mr : 2}}>
                                                <TextField 
                                                    {...register('country')}
                                                    fullWidth select 
                                                    variant='filled'  
                                                    className = 'noInputBorder' 
                                                    label = {formLabel.country}
                                                    size = 'small' 
                                                    value = {addressForm.selectCountry}
                                                    onChange = {(event) => changeHandler(event, formLabel.country)}
                                                    error = {Boolean(errors.country)}
                                                    helperText = {errors.country ?.message}
                                                >
                                                    <MenuItem value = 'India'>India</MenuItem>
                                                    <MenuItem value = 'Philippines'>Philippines</MenuItem>
                                                </TextField>                                            
                                            </Box>
                                            <Box sx = {{width : 200, mr : 2, '&.MuiPaper-root' : {height : '300px !important'}}}>
                                                <TextField 
                                                    {...register('state')} 
                                                    variant='filled' 
                                                    disabled  = {!Boolean(addressForm.selectCountry)}
                                                    select fullWidth
                                                    value = {addressForm.selectState}
                                                    onChange = {(event) => changeHandler(event, formLabel.state)}                                         
                                                    className = 'noInputBorder' 
                                                    label = 'State' 
                                                    size = 'small'
                                                    error = {Boolean(errors.state)}
                                                    helperText = {errors.state ?.message} 
                                                    SelectProps = {{
                                                        MenuProps : {
                                                            sx : {
                                                                maxHeight : 200
                                                            }
                                                        }                                                    
                                                    }}                                                                                             
                                                >
                                                    {statesOfCountry.map(state => {
                                                        return (
                                                            <MenuItem sx = {{height : 25}} key = {uniqueId()} value = {state}>{state}</MenuItem>
                                                        )
                                                    })}    
                                                </TextField>
                                            </Box>
                                            <TextField 
                                                {...register('city')}
                                                variant='filled'
                                                disabled = {!Boolean(addressForm.selectState)}
                                                className = 'noInputBorder' 
                                                label = {formLabel.city} 
                                                size = 'small'
                                                onChange={(event) => changeHandler(event, formLabel.city)}
                                                value = {addressForm.city}
                                                error = {Boolean(errors.city)}
                                                helperText = {errors.city ?.message} />
                                        </Stack>
                                        <Box>
                                            <TextField 
                                                {...register('pinCode')}
                                                variant='filled' 
                                                sx = {{mt:2}} 
                                                label = {formLabel.pinCode}
                                                type = 'number' 
                                                size = 'small'
                                                className = 'noInputBorder' 
                                                value = {addressForm.pinCode}
                                                onChange = {(event) => changeHandler(event, formLabel.pinCode)}
                                                error = {Boolean(errors.pinCode)}
                                                helperText = {Boolean(errors.pinCode) ? 'Add pincode' : null} />
                                        </Box>                            
                                        <FormControl sx = {{mt:2}}>
                                            <FormLabel 
                                                id = 'address-type' 
                                                sx = {{'& .Mui-focused' : {color : 'rgba(0, 0, 0, 0.6)'}}}
                                            >
                                                Address Type
                                            </FormLabel>
                                            <RadioGroup row
                                                {...register('addressType')}
                                                aria-labelledby='address-type'  
                                                value = {addressForm.addressType} 
                                                onChange = {(event) => changeHandler(event, formLabel.addressType)}
                                            >
                                                <FormControlLabel 
                                                    label = 'Home' 
                                                    value = 'Home' 
                                                    control = {<Radio color = 'success' />} />
                                                <FormControlLabel 
                                                    label = 'Office' 
                                                    value = 'Office' 
                                                    control = {<Radio color = 'success' />} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>                        
                                </ThemeProvider>
                                <CustomButton 
                                    sx = {{mt : 2}} 
                                    variant = 'contained' type = 'submit'
                                >
                                    Save
                                </CustomButton>
                            </form>
                        </Paper>
                </Box>
            </Modal>
        </Backdrop>
    )
}

export default AddAddress