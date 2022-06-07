import { useSelector } from 'react-redux'
import { Box, Typography, Grid, Container, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// -------- importing from other files ----------
import { styles } from './styles'
import { india } from '../../../identifiers/identifiers'

const PriceDetails = ({icon, totalPrice}) => {
    const classes = styles()

    // fetching values from redux store
    const instantBuy = useSelector(state => state.cart.instantBuy) // this tells us whether user buying burger directly or thru cart
    const currentItem = useSelector(state => state.cart.currentItem) // containing built burger which user made
    const cartItems = useSelector(state => state.cart.cartItems) // containing cart items
    const deliveryAddress = useSelector(state => state.orders.deliveryAddress) // selected delivery address of the user


    return (
        <Box className = {classes.container}>
            <Typography 
                className = {classes.heading} 
                variant = 'h5'>
                Price Details
            </Typography>  
            <Container>
                <Grid 
                    sx = {{mt : 2, mb : 2}} 
                    container 
                    justifyContent = 'space-evenly'
                    alignItems = 'center'>
                    <Grid item xs = {8}>
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            {instantBuy ? 
                                `${currentItem.length} Item` : 
                                `${cartItems.length} Items`}
                        </Typography>
                    </Grid>
                    <Grid item xs = {4}
                        display = 'flex'                                        
                        justifyContent = 'center'
                        alignItems = 'center'>
                        <FontAwesomeIcon 
                            className = {classes.icon}
                            icon = {icon} />
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            {deliveryAddress.country === india ? 
                                totalPrice : 
                                (totalPrice*0.67).toFixed(0)}
                        </Typography>                    
                    </Grid>                        
                </Grid>
                <Grid 
                    container 
                    justifyContent = 'center' 
                    alignItems = 'center'
                    sx = {{mb: 2}}> 
                    <Grid item xs = {8}>
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            Delivery Charges
                        </Typography>
                    </Grid>
                    <Grid item xs = {4}
                        display = 'flex'
                        flexDirection = 'row'
                        justifyContent = 'center'
                        alignItems = 'center'>
                        <FontAwesomeIcon 
                            icon = {icon}
                            className = {classes.icon} />
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            0
                        </Typography>
                    </Grid>
                </Grid>     
                <Divider sx = {{borderColor : '#f9b826', mb : 2}} />
                <Grid 
                    container 
                    justifyContent = 'center'
                    alignItems = 'center'> 
                    <Grid item xs = {8}>
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            Total
                        </Typography>
                    </Grid>
                    <Grid item xs = {4}
                        display = 'flex'
                        flexDirection = 'row'
                        justifyContent = 'center'
                        alignItems = 'center'>
                        <FontAwesomeIcon 
                            icon = {icon}
                            className = {classes.icon} />
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            {deliveryAddress.country === india ? totalPrice : (totalPrice*0.67).toFixed(0)}
                        </Typography>
                    </Grid>
                </Grid>                
            </Container>                 
        </Box>
    )
}

export default PriceDetails