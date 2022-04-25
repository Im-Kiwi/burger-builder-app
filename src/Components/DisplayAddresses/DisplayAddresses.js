import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { v4 as uniqueId } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMobileRetro, faHouse, faCity } from '@fortawesome/free-solid-svg-icons'

// ----- importing from other files -----------
import { db } from '../../firebase-setup'
import { CustomPaper, addressBox } from './styles'
import { ordersActions } from '../../Store/reducer/orders'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'


const DisplayAddresses = () => {
    const dispatch = useDispatch()
    const classes = addressBox()

    const addressStore = useSelector(state => state.deliveryAddresses.addressStore)
    console.log(addressStore)
    const [toggle, setToggle] = useState(false) // helps to re-render the component after value get stores in local storage
    const idForStyling = parseInt(localStorage.getItem('id')) // the value by default stores as a string in local storage
    const userId = useSelector(state => state.userForm.currentUser.userId)

    // method to select an address from bunch of addresses
    const selectAddressHandler = (address, id) => {
        localStorage.setItem('id', id)
        setToggle(v => !v)
        if (addressStore[id] === address) {
            dispatch(ordersActions.updateDeliveryAddress(address))
        }
    }

    return (
        <Box 
            className = 'shadow p-5' 
            display = 'flex' 
            flexWrap = 'wrap' 
            justifyContent = 'center' 
            gap = {1} 
            sx = {{backgroundColor : '#110f12'}}
        >
            {addressStore.map((address, index) => {
                return (
                    <Paper 
                        className = {[classes.addressContainer, idForStyling === index ? classes.clickedAddress : null].join(' ')}
                        key = {uniqueId()} 
                        component = 'button' 
                        aria-label= 'select address button' 
                        onClick = {() => selectAddressHandler(address, index)}
                    >
                        <Box className = {classes.addressBox}>
                            <Stack direction = 'row' spacing = {5}>
                                <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                                    <FontAwesomeIcon icon = {faUser} style = {{fontSize : '1.5rem'}} />
                                    <Typography >{address.firstName} {address.lastName}</Typography>
                                </Stack>
                                <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                                    <FontAwesomeIcon icon = {faMobileRetro} style = {{fontSize : '1.5rem'}} />
                                    <Typography >{address.phoneNumber}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction = 'row' spacing = {2} sx = {{mt:2}} alignItems = 'center'>
                                <FontAwesomeIcon icon = {faHouse} style = {{fontSize : '1.5rem'}} />
                                <Typography >{address.address}</Typography>
                            </Stack>
                            <Stack direction = 'row' sx = {{mt:2}} spacing = {2}>
                                <FontAwesomeIcon icon = {faCity} style = {{fontSize : '1.5rem'}} />
                                <Typography>{address.city}, {address.state}, {address.country}</Typography>
                            </Stack>
                            <Typography>zip code: {address.pinCode} </Typography>
                        </Box>
                    </Paper>
                )
            })}
        </Box>
    )
}

export default DisplayAddresses