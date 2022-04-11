import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { Stack, Box, Typography, Button, Paper, TextField, MenuItem, IconButton, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel  } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CloseRounded } from '@mui/icons-material'
import { v4 as uniqueId } from 'uuid'

// -------- importing from other files -------------
import { db } from '../../firebase-setup'
import { userFormTheme } from '../../theme/mui-theme'
import { philippinesStates, indianStates } from '../../Places/places'
import { CustomButton } from './styles.js'


const AddAddress = (props) => {

    const userId = useSelector(state => state.userForm.currentUser.userId)

    const [selectAddressType, setSelectAddressType] = useState('Home')
    const [selectCountry, setSelectCountry] = useState('')
    const [selectState, setSelectState] = useState('')

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
            country : selectCountry,
            state : selectState,
            city : data.city,
            pinCode : data.pinCode,
            addressType : selectAddressType,
            userId : userId
        }

        try {
            await addDoc(collection(db, 'addresses'), addressData)        
        } catch(err) {
            console.log('Some error! Please try again later')
        }
    }

    let statesOfCountry = []

    switch (selectCountry) {
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
        <Box sx = {{mt : 2}}>
            <Paper sx = {{padding : 5, backgroundColor : '#110f12', border : 'solid 2px white', borderRadius : 0}} >
                <IconButton 
                    sx = {{float : 'right', position : 'relative', bottom : 25, left : 20}} 
                    className = 'text-light'
                    onClick = {() => props.setOpenForm(false)}
                >
                    <CloseRounded />
                </IconButton>
                <form onSubmit = {handleSubmit(addressSubmitHandler)}>
                    <ThemeProvider theme = {userFormTheme}>
                        <Stack direction = 'column'>
                            <Stack direction = 'row'>
                                <TextField variant='filled' className = 'noInputBorder' 
                                    sx = {{mr : 2, input : {borderColor : 'red'}}} 
                                    size = 'small' 
                                    label = 'First Name'
                                    autoComplete='false'
                                    {...register('firstName')}
                                    error = {Boolean(errors.firstName)}
                                    helperText = {errors.firstName ?.message} />
                                <TextField 
                                    variant='filled' 
                                    className = 'noInputBorder' 
                                    label = 'Last Name' 
                                    size = 'small'
                                    {...register('lastName')}
                                    error = {Boolean(errors.lastName)}
                                    helperText = {errors.lastName ?.message} />
                            </Stack>
                            <Box sx = {{mt : 2}}>
                                <TextField 
                                    variant='filled' 
                                    className = 'noInputBorder' 
                                    type = 'number' 
                                    label = 'Phone Number' 
                                    size = 'small'
                                    {...register('phoneNumber')}
                                    error = {Boolean(errors.phoneNumber)}
                                    helperText = {Boolean(errors.phoneNumber) ? 'Add phone number' : null} />
                            </Box>
                            <TextField 
                                variant='filled' 
                                className = 'noInputBorder' 
                                sx = {{mt : 2}} 
                                fullWidth multiline 
                                rows={4} 
                                size = 'small' 
                                label = 'Your Address'
                                {...register('address')}
                                error = {Boolean(errors.address)}
                                helperText = {errors.address ?.message} />
                            <Stack direction = 'row' sx = {{mt : 2}}>
                                <Box sx = {{width : 200, mr : 2}}>
                                    <TextField 
                                        fullWidth select 
                                        variant='filled'  
                                        className = 'noInputBorder' 
                                        label = 'Country' 
                                        size = 'small' 
                                        value = {selectCountry}
                                        {...register('country')}
                                        onChange = {(event) => setSelectCountry(event.target.value)}
                                        error = {Boolean(errors.country)}
                                        helperText = {errors.country ?.message}
                                    >
                                        <MenuItem value = 'India'>India</MenuItem>
                                        <MenuItem value = 'Philippines'>Philippines</MenuItem>
                                    </TextField>                                            
                                </Box>
                                <Box sx = {{width : 200, mr : 2, '&.MuiPaper-root' : {height : '300px !important'}}}>
                                    <TextField 
                                        variant='filled' 
                                        disabled  = {!Boolean(selectCountry)}
                                        select fullWidth
                                        value = {selectState}
                                        {...register('state')} 
                                        onChange = {(event) => setSelectState(event.target.value)}                                         
                                        className = 'noInputBorder' 
                                        label = 'State' 
                                        size = 'small'
                                        error = {Boolean(errors.state)}
                                        helperText = {errors.state ?.message} 
                                        SelectProps = {{
                                            MenuProps : {
                                                sx : {
                                                    height : 200
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
                                    variant='filled'
                                    disabled = {!Boolean(selectState)}
                                    className = 'noInputBorder' 
                                    label = 'City/District/Town' 
                                    size = 'small'
                                    {...register('city')}
                                    error = {Boolean(errors.city)}
                                    helperText = {errors.city ?.message} />
                            </Stack>
                            <Box>
                                <TextField 
                                    variant='filled' 
                                    sx = {{mt:2}} 
                                    label = 'Pin code' 
                                    type = 'number' 
                                    size = 'small'
                                    className = 'noInputBorder' 
                                    {...register('pinCode')}
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
                                    aria-labelledby='address-type'  value = {selectAddressType} 
                                    {...register('addressType')}
                                    onChange = {(event) => setSelectAddressType(event.target.value)}
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
    )
}

export default AddAddress