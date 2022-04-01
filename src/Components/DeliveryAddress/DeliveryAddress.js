import { Box, Typography, Button } from '@mui/material'

const DeliveryAddress = () => {

    return (
        <Box display = 'flex' flexDirection = 'column' justifyContent = 'center' >
            <Typography className = 'text-center'>select your address</Typography>
            <Box>
                <Button variant = 'contained'>Add Address</Button>
            </Box>
        </Box>
    )
}

export default DeliveryAddress