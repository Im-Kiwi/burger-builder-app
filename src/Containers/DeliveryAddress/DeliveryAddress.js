import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button } from '@mui/material'

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
        <Box sx = {{mt : 5, position : 'relative'}} display = 'flex' flexDirection = 'column' alignItems = 'center' >
            <Typography variant = 'h6' sx = {{mb:3}}>Select Your delivery address</Typography>
            <DisplayAddresses openForm = {openAddressForm} />            
            <AddAddress />      
        </Box>
    )
}

export default DeliveryAddress