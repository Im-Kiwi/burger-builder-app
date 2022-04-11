import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'

// -------- importing from other files -------------
import AddAddress from '../AddAddress/AddAddress'
import DisplayAddresses from '../DisplayAddresses/DisplayAddresses'

const DeliveryAddress = (props) => {


    const [openForm, setOpenForm] = useState(false)

    return (
        <Box sx = {{mt : 5, position : 'relative', height : '70vh', overflowY : 'auto'}} display = 'flex' flexDirection = 'column' alignItems = 'center' >
            { !openForm ? 
                <>
                    <Typography variant = 'h5' sx = {{mb:3}}>Select Your delivery address</Typography>
                    <DisplayAddresses />
                    <Typography variant = 'h5' sx = {{mt:2,mb:3}}>- Or -</Typography>
                    <Button 
                        variant = 'contained'
                        sx = {{backgroundColor : '#110f12', borderRadius : 0, '&:hover' : {backgroundColor : '#110f12'}}}
                        onClick = {() => setOpenForm(true)}
                    >
                        Add Address
                    </Button>
                </>
            :
                <AddAddress setOpenForm = {setOpenForm} />      
            }
        </Box>
    )
}

export default DeliveryAddress