import { useSelector } from 'react-redux'
import { Typography, Card, Grid, Box, Stack, Paper, Divider  } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uniqueId } from 'uuid'
import { faUser, faMobileRetro, faHouse, faCity, faCheck } from '@fortawesome/free-solid-svg-icons'

// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'
import OrderItem from '../../Components/OrderItem/OrderItem'

const OrderSummary = (props) => {
    
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const address = useSelector(state => state.orders.deliveryAddress)
    
    return (                
        <Grid container 
            sx = {{mt : 5, maxHeight : 590}} 
            display = 'flex' 
            justifyContent = 'center' 
            alignItems = 'center'
        >
            <Grid xs = {12} md = {8} item  
                display = 'flex'  
                flexWrap = 'wrap' 
                justifyContent = 'center' 
                gap = {3.5}
            >
                {items.map(ing => {
                    return (
                        <OrderItem ing = {ing} key = {uniqueId()} />    
                    )
                })}
            </Grid>
            <Grid item container 
                xs = {12} md = {4} 
                className = 'text-center'  
                display = 'flex' 
                flexDirection = 'column' 
                justifyContent = 'flex-start'
            >
                <Grid item  sx = {{mb:2}}>
                    <Typography>display address</Typography>
                </Grid>
                <Grid item  display = 'flex' justifyContent = 'center' >
                    <Box 
                        sx = {{width : '60%'}} 
                        display = 'flex' 
                        flexDirection = 'column' 
                        alignItems = 'center'
                    >
                        <Stack 
                            direction = 'row' 
                            spacing = {5} 
                            justifyContent = 'flex-start' 
                            sx = {{width : 300}}
                        >
                            <Stack 
                                direction = 'row' 
                                justifyContent= 'center' 
                                spacing = {1}  
                                alignItems = 'center'
                            >
                                <FontAwesomeIcon 
                                    icon = {faUser} 
                                    style = {{fontSize : '1.5rem', color : '#110f12'}} 
                                />
                                <Typography sx = {{color : '#110f12'}}>                                                            
                                    {address.firstName} {address.lastName}
                                </Typography>
                            </Stack>
                            <Stack 
                                direction = 'row' 
                                spacing = {1} 
                                alignItems = 'center' 
                            >
                                <FontAwesomeIcon 
                                    icon = {faMobileRetro} 
                                    style = {{fontSize : '1.5rem', color : '#110f12'}} 
                                />
                                <Typography sx = {{color : '#110f12'}}>
                                    {address.phoneNumber}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack 
                            direction = 'row' 
                            spacing = {2} 
                            sx = {{mt:2, width : 300}} 
                            justifyContent= 'flex-start' 
                            alignItems = 'center'
                        >
                            <FontAwesomeIcon 
                                icon = {faHouse} 
                                style = {{fontSize : '1.5rem', color : '#110f12'}} 
                            />
                            <Typography sx = {{color : '#110f12'}}>
                                {address.address}
                            </Typography>
                        </Stack>
                        <Stack 
                            direction = 'row' 
                            sx = {{mt:2, width : 300}} 
                            spacing = {2}
                        >
                            <FontAwesomeIcon  
                                icon = {faCity} 
                                style = {{fontSize : '1.5rem', color : '#110f12'}} 
                            />
                            <Typography 
                                sx = {{color : '#110f12'}}
                            >
                                {address.city}, {address.state}, {address.country}
                            </Typography>
                        </Stack>
                        <Box 
                            sx = {{width : 300}} 
                            display = 'flex' 
                            justifyContent = 'flex-start'
                        >
                            <Typography sx = {{color : '#110f12', mt:2}}>
                                <strong>zip code:</strong> {address.pinCode} 
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>                
    )
}

export default OrderSummary
