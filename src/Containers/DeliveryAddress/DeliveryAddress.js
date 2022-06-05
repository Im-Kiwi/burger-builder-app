import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'

// -------- importing from other files -------------
import AddAddress from '../../Components/AddAddress/AddAddress'
import DisplayAddresses from '../../Components/DisplayAddresses/DisplayAddresses'
import { dialogActions } from '../../Store/reducer/dialog'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'

const DeliveryAddress = (props) => {
    const dispatch = useDispatch()

    // fetching values from the redux store
    const editZone = useSelector(state => state.deliveryAddresses.editZone)
    const addressStore = useSelector(state => state.deliveryAddresses.addressStore)

    // creating responsive breakpoints
    const break_550 = useMediaQuery('(max-width : 550px)')
    
    // to open address form
    const openAddressForm = () => {
        dispatch(dialogActions.updateOpenModal(true))

        // if user clicked on edit button then address form will gonna open but with filled values which user can later edit
        if (editZone.editFlag) {
            const resultantAddress = addressStore.find((_, index) => index === editZone.id) // to find the address which user clicked to edit
            dispatch(deliveryAddressActions.updateFirstName(resultantAddress.firstName))
        }
    }

    return (
        <Box
            component = {motion.div}
            initial = {{x: props.manageAddressFlag ? 0 : 200, opacity:props.manageAddressFlag ? 1 : 0}} 
            animate = {{x:0, opacity:1}}
            sx = {{
                mt : break_550 ? 1 : 5, 
                position : 'relative', 
                mb : 1}}
            display = 'flex' 
            flexDirection = 'column' 
            alignItems = 'center'>
            <DisplayAddresses 
                openForm = {openAddressForm} 
                manageAddressFlag = {props.manageAddressFlag} />            
            <AddAddress />      
        </Box>
    )
}

export default DeliveryAddress