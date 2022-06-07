import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stack, Typography, IconButton, useMediaQuery } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import { doc, deleteDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMobileRetro, faHouse, faCity, faPlus } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'

// ----- importing from other files -----------
import { db } from '../../firebase-setup'
import { CustomPaper, addressBox, AddAddress } from './styles'
import { ordersActions } from '../../Store/reducer/orders'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'


const DisplayAddresses = (props) => {
    const dispatch = useDispatch() 
    const classes = addressBox() // contains css properties corressponds to the class name of the elements

    const addressStore = useSelector(state => state.deliveryAddresses.addressStore)
    const [selectedAddressId, setSelectedAddressId] = useState(null) // helps to re-render the component after value get stores in local storage
     // the value by default stores as a string in local storage
    let selectAddress
    // method to select an address from bunch of addresses
    const selectAddressHandler = (address, id) => {
        selectAddress = id
        localStorage.setItem('id', id)
        const addressId = parseInt(localStorage.getItem('id'))
        setSelectedAddressId(addressId)
        if (!props.manageAddressFlag) {
            if (addressStore[id] === address) {
                dispatch(ordersActions.updateDeliveryAddress(address))
            }
        }
    }

    // to delete an address card
    const deleteAddressHandler = async (addressId) => {
        try {
            await deleteDoc(doc(db, 'addresses', addressId)) // this will delete address from the database
        } catch (err) {
            console.log('unable to delete')
        }
    }

    // this method will help to edit address
    const editAddressHandler = (id) => {
        props.openForm() // will open the address form
        dispatch(deliveryAddressActions.updateEditZone({flag : true, id : id})) // will send the info to the redux store abt which address card will be edited
    }

    // to animate the section where edit and delete address buttons are
    const animateAddress = {
        initial : {
            y : 60
        },
        initial_B : {
            y : -60
        },
        hover : {
            y :  -60 
        },
    }

    return (
        <>
            <Typography variant = 'h6' sx = {{fontFamily : 'DM Serif Text, serif'}}>
                {props.manageAddressFlag ?
                    'Manage your addresses' : 
                    'Select your delivery address'}
            </Typography>
            <Box 
                className = {['p-2','mt-5', classes.main].join(' ')} 
                display = 'flex' 
                flexWrap = 'wrap' 
                justifyContent = 'center'
                gap = {1}>   
                <CustomPaper className = {classes.addressContainer}>
                    <AddAddress  onClick = {props.openForm} component = 'button'>
                        <Add style = {{fontSize : '5rem', color : '#f9b826'}} icon = {faPlus} />
                    </AddAddress>
                </CustomPaper>
                <AnimatePresence>
                    {addressStore.map((address, index) => {
                        return (
                            <CustomPaper
                                component = {motion.div}
                                exit = {{scale : 0}}
                                transition = {{ease : 'easeOut'}}
                                layout
                                elevation={1}
                                className = {[
                                    classes.addressContainer, 
                                    selectedAddressId === index && !props.manageAddressFlag ? classes.clickedAddress : null].join(' ')}
                                key = {address.id} 
                                aria-label= 'select address card button'>
                                <motion.div 
                                    className = {classes.transitionContainer}
                                    initial = 'initial'
                                    whileHover = 'hover'>
                                    <Box 
                                        className = {classes.addressBox} 
                                        component = 'button'                                     
                                        onClick = {() => selectAddressHandler(address, index)}>
                                        <Stack direction = 'row' spacing = {5}>
                                            <Stack 
                                                direction = 'row' 
                                                spacing = {1} 
                                                alignItems = 'center'>
                                                <FontAwesomeIcon icon = {faUser} style = {{fontSize : '1.5rem'}}/>                                        
                                                <Typography variant = 'body1' 
                                                    sx = {{
                                                        fontFamily : 'BIZ UDMincho, serif',
                                                        fontSize : '1.1rem'}}>
                                                    {address.firstName} {address.lastName}
                                                </Typography>
                                            </Stack>
                                            <Stack 
                                                direction = 'row' 
                                                spacing = {1} 
                                                alignItems = 'center'>
                                                <FontAwesomeIcon icon = {faMobileRetro} style = {{fontSize : '1.5rem'}} />
                                                <Typography
                                                    variant = 'body1'
                                                    sx = {{
                                                        fontFamily : 'BIZ UDMincho, serif',
                                                        fontSize : '1.1rem'}}>
                                                    {address.phoneNumber}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack 
                                            direction = 'row' 
                                            spacing = {2} 
                                            sx = {{mt:2}} 
                                            alignItems = 'center'>
                                            <FontAwesomeIcon icon = {faHouse} style = {{fontSize : '1.5rem'}} />
                                            <Typography
                                                variant = 'body1'
                                                sx = {{
                                                    fontFamily : 'BIZ UDMincho, serif',
                                                    fontSize : '1.1rem'}}>
                                                {address.address}
                                            </Typography>
                                        </Stack>
                                        <Stack 
                                            direction = 'row' 
                                            sx = {{mt:2}} 
                                            spacing = {2}>
                                            <FontAwesomeIcon icon = {faCity} style = {{fontSize : '1.5rem'}}/>
                                            <Typography
                                                variant = 'body1'
                                                sx = {{
                                                    fontFamily : 'BIZ UDMincho, serif',
                                                    fontSize : '1.1rem'}}>
                                                {address.city}, {address.state}, {address.country}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant = "body1"
                                            sx = {{
                                                fontFamily : 'BIZ UDMincho, serif',
                                                fontSize : '1.1rem'}}>
                                            zip code: {address.pinCode} 
                                        </Typography>
                                    </Box>
                                    <AnimatePresence>
                                        <Box
                                            component = {motion.div} 
                                            //below animate is for mobile version, user can click on address card to see edit and delete button                                            
                                            animate = {{y : index === selectedAddressId ? -60 : 60}} 
                                            variants = {animateAddress}
                                            id = 'configAddress' 
                                            className = {classes.editBox}
                                            sx = {{
                                                '&:before' : {
                                                    backgroundColor : index === selectedAddressId && !props.manageAddressFlag ? '#110f12' : '#f9b826'
                                                }}}>
                                                <Stack 
                                                    direction = 'row' 
                                                    justifyContent = 'center' 
                                                    alignItems = 'center' 
                                                    sx = {{height : 'inherit', width : '100%'}} 
                                                    spacing = {2}>
                                                    <IconButton 
                                                        color = {index === selectedAddressId && !props.manageAddressFlag ? 'yellowish' : 'blackish'} 
                                                        onClick = {() => editAddressHandler(index)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        color = {index === selectedAddressId && !props.manageAddressFlag ? 'yellowish' : 'blackish'} 
                                                        onClick = {() => deleteAddressHandler(address.id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Stack>
                                        </Box>
                                    </AnimatePresence>
                                </motion.div>                        
                            </CustomPaper>
                        )
                    })}
                </AnimatePresence>
            </Box>
        </>
    )
}

export default DisplayAddresses