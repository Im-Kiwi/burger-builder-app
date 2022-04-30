import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button } from '@mui/material'

// -------- importing from other files -------------
import AddAddress from '../AddAddress/AddAddress'
import DisplayAddresses from '../DisplayAddresses/DisplayAddresses'
import { dialogActions } from '../../Store/reducer/dialog'


const DeliveryAddress = (props) => {
    const dispatch = useDispatch()

    const openAddressForm = () => {
        dispatch(dialogActions.updateOpenModal(true))
    }

    return (
        <Box sx = {{mt : 5, position : 'relative', height : '70vh'}} display = 'flex' flexDirection = 'column' alignItems = 'center' >
            <Typography variant = 'h5' sx = {{mb:3}}>Select Your delivery address</Typography>
            <DisplayAddresses openForm = {openAddressForm} />
            <Typography variant = 'h5' sx = {{mt:2,mb:3}}>- Or -</Typography>
            <Button 
                variant = 'contained'
                sx = {{backgroundColor : '#110f12', borderRadius : 0, '&:hover' : {backgroundColor : '#110f12'}}}
                onClick = {openAddressForm}
            >
                Add Address
            </Button>
            <AddAddress />      
        </Box>
    )
}

export default DeliveryAddress