import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Paper, Stack, Typography, IconButton, ThemeProvider } from '@mui/material'
import { Add, NoEncryption } from '@mui/icons-material'
import { getDoc, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { v4 as uniqueId } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMobileRetro, faHouse, faCity, faPlus } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'

// ----- importing from other files -----------
import { db } from '../../firebase-setup'
import { CustomPaper, addressBox, AddAddress } from './styles'
import { ordersActions } from '../../Store/reducer/orders'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'
import { mainColors } from '../../theme/mui-theme'


const DisplayAddresses = (props) => {
    const dispatch = useDispatch()
    const classes = addressBox()

    const addressStore = useSelector(state => state.deliveryAddresses.addressStore)
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
        try {
            await deleteDoc(doc(db, 'addresses', addressId))
        } catch (err) {
            console.log('unable to delete')
        }
    }

    const editAddressHandler = (id) => {
        props.openForm()
        dispatch(deliveryAddressActions.updateEditZone({flag : true, id : id}))
    }

    const animateAddress = {
        initial : {
            y : 100
        },
        hover : {
            y : -60
        },
        animate : {
            y : -60
        },
        
    }

    return (
        <Box 
            className = 'p-2' 
            display = 'flex' 
            flexWrap = 'wrap' 
            justifyContent = 'center' 
            gap = {1}
            sx = {{ height : 520, overflowY : 'auto' }}
        >   
            <CustomPaper className = {classes.addressContainer}>
                <AddAddress  onClick = {props.openForm} component = 'button'>
                    <Add style = {{fontSize : '5rem', color : '#f9b826'}} icon = {faPlus} />
                </AddAddress>
            </CustomPaper>
            {addressStore.map((address, index) => {
                return (
                    <CustomPaper 
                        elevation={1}
                        className = {[classes.addressContainer, idForStyling === index ? classes.clickedAddress : null].join(' ')}
                        key = {uniqueId()} 
                        aria-label= 'select address card button'  
                    >
                        <motion.div 
                            style = {{height : 'inherit', width : '100%', padding : 10}} 
                            initial = 'initial' 
                            whileHover = 'hover'
                            exit = 'exit'
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
                            <AnimatePresence>
                                <motion.div 
                                    variants = {animateAddress}
                                >
                                    <Box 
                                        id = 'configAddress' 
                                        className = {classes.editBox}
                                        sx = {{'&:before' : {backgroundColor : index === idForStyling ? '#110f12' : '#f9b826'}}}
                                    >
                                            <Stack 
                                                direction = 'row' 
                                                justifyContent = 'center' 
                                                alignItems = 'center' 
                                                sx = {{height : 'inherit', width : '100%'}} 
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
                                    </Box>
                                </motion.div>                    
                            </AnimatePresence>
                        </motion.div>                        
                    </CustomPaper>
                )
            })}
        </Box>
    )
}

export default DisplayAddresses