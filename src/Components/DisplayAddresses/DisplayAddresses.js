import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { getDoc, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { v4 as uniqueId } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMobileRetro, faHouse, faCity } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// ----- importing from other files -----------
import { db } from '../../firebase-setup'
import { CustomPaper, addressBox } from './styles'
import { ordersActions } from '../../Store/reducer/orders'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'


const DisplayAddresses = (props) => {
    const dispatch = useDispatch()
    const classes = addressBox()

    const addressStore = useSelector(state => state.deliveryAddresses.addressStore)
    console.log(addressStore)
    const [toggle, setToggle] = useState(false) // helps to re-render the component after value get stores in local storage
    const idForStyling = parseInt(localStorage.getItem('id')) // the value by default stores as a string in local storage

    // method to select an address from bunch of addresses
    const selectAddressHandler = (address, id) => {
        localStorage.setItem('id', id)
        setToggle(v => !v)
        if (addressStore[id] === address) {
            dispatch(ordersActions.updateDeliveryAddress(address))
        }
    }

    const deleteAddressHandler = async (addressId) => {
        const findAddress = addressStore.find(address => address.id === addressId )
        try {
            await deleteDoc(doc(db, 'addresses', findAddress.id))
        } catch (err) {
            console.log('unable to delete')
        }
    }

    const editAddressHandler = (id) => {
        props.openForm()
        dispatch(deliveryAddressActions.updateEditFlag({flag : true, id : id}))
    }

    return (
        <Box 
            className = 'shadow p-5' 
            display = 'flex' 
            flexWrap = 'wrap' 
            justifyContent = 'center' 
            gap = {1} 
            sx = {{backgroundColor : '#110f12', height : 420, overflowY : 'auto'}}
        >
            {addressStore.map((address, index) => {
                return (
                    <CustomPaper 
                        className = {[classes.addressContainer, idForStyling === index ? classes.clickedAddress : null].join(' ')}
                        key = {uniqueId()} 
                        aria-label= 'select address card button'                         
                    >
                        <Box 
                            className = {classes.addressBox} 
                            component = 'button'  
                            onClick = {() => selectAddressHandler(address, index)}
                        >
                            <Stack 
                                direction = 'row' 
                                spacing = {5}
                            >
                                <Stack 
                                    direction = 'row' 
                                    spacing = {1} 
                                    alignItems = 'center'
                                >
                                    <FontAwesomeIcon 
                                        icon = {faUser} 
                                        style = {{fontSize : '1.5rem'}} 
                                    />
                                    <Typography>{address.firstName} {address.lastName}</Typography>
                                </Stack>
                                <Stack 
                                    direction = 'row' 
                                    spacing = {1} 
                                    alignItems = 'center'
                                >
                                    <FontAwesomeIcon 
                                        icon = {faMobileRetro} 
                                        style = {{fontSize : '1.5rem'}} />
                                    <Typography >{address.phoneNumber}</Typography>
                                </Stack>
                            </Stack>
                            <Stack 
                                direction = 'row' 
                                spacing = {2} 
                                sx = {{mt:2}} 
                                alignItems = 'center'
                            >
                                <FontAwesomeIcon 
                                    icon = {faHouse} 
                                    style = {{fontSize : '1.5rem'}} 
                                />
                                <Typography >{address.address}</Typography>
                            </Stack>
                            <Stack 
                                direction = 'row' 
                                sx = {{mt:2}} 
                                spacing = {2}
                            >
                                <FontAwesomeIcon 
                                    icon = {faCity} 
                                    style = {{fontSize : '1.5rem'}}
                                />
                                <Typography>{address.city}, {address.state}, {address.country}</Typography>
                            </Stack>
                            <Typography>zip code: {address.pinCode} </Typography>
                        </Box>
                        <Box id = 'configAddress' className = {classes.editBox}>
                            <motion.div 
                                style = {{height : 'inherit'}}
                            >
                                <Stack 
                                    direction = 'row' 
                                    justifyContent = 'center' 
                                    alignItems = 'center' 
                                    sx = {{height : 'inherit'}} 
                                    spacing = {2}
                                >
                                    <Button 
                                        variant = 'outlined' 
                                        color = 'success' 
                                        size = 'small'
                                        onClick = {() => editAddressHandler(index)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant = 'outlined' 
                                        color = 'error' 
                                        size = 'small'
                                        onClick = {() => deleteAddressHandler(address.id)}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Box>
                    </CustomPaper>
                )
            })}
        </Box>
    )
}

export default DisplayAddresses