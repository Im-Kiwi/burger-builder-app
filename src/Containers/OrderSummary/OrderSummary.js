import { useSelector } from 'react-redux'
import { Typography, Grid, Box, Stack  } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uniqueId } from 'uuid'
import { faUser, faMobileRetro, faHouse, faCity, faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'
import OrderItem from '../../Components/OrderItem/OrderItem'

const OrderSummary = (props) => {
    
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const address = useSelector(state => state.orders.deliveryAddress)
    return (                
        <Grid container 
            sx = {{mt : 5, maxHeight : 590, overflowY : 'auto'}} 
            display = 'flex' 
            justifyContent = 'center' 
            alignItems = 'center'>
            <Grid xs = {12} md = {8} item  
                display = 'flex'  
                flexWrap = 'wrap' 
                justifyContent = 'center' 
                gap = {3.5}>
                {items.map(ing => {
                    return (
                        <Box 
                            key = {uniqueId()}
                            sx = {{mb:2, width : '100%'}}>
                            <OrderItem ing = {ing} />    
                        </Box>
                    )
                })}
            </Grid>
            <Grid item container 
                xs = {12} md = {4} 
                className = 'text-center'  
                display = 'flex' 
                flexDirection = 'column' 
                justifyContent = 'flex-start'>
                <Grid item 
                    sx = {{mb:3}} 
                    display = 'flex' 
                    flexDirection = 'row' 
                    justifyContent = 'center' 
                    alignItems = 'center'>
                    <Typography 
                        variant = 'body1'
                        sx = {{mr:2, fontFamily : 'DM Serif Text, serif', fontSize : '1.3rem'}}>
                        Pay 
                    </Typography>
                    {address.country === "Philippines" ?
                        <FontAwesomeIcon icon = {faPesoSign} style = {{fontSize : '1.3rem'}}/>
                    : 
                        <FontAwesomeIcon icon = {faIndianRupeeSign} style = {{fontSize : '1.3rem'}}/>
                    }
                    <Typography 
                        variant = 'body1'
                        sx = {{fontFamily : 'Comfortaa, cursive', fontWeight : 600, fontSize : '1.3rem'}}>
                        {instantBuy ? items[0].totalPrice : props.cartPrice}
                    </Typography>
                </Grid>                
                <Grid item  sx = {{mb:2}}>
                    <Typography
                        variant = 'h6' 
                        sx = {{
                            color : '#110f12', 
                            fontFamily : 'DM Serif Text, serif'}}>
                        Delivery address
                    </Typography>
                </Grid>
                
                <Grid item  display = 'flex' justifyContent = 'center'>
                    <Box 
                        display = 'flex' 
                        flexDirection = 'column' 
                        alignItems = 'center'
                        sx = {{color : '#110f12', width : '60%'}}>
                        <Stack 
                            direction = 'row' 
                            spacing = {5} 
                            justifyContent = 'flex-start' 
                            sx = {{width : 300, }}>
                            <Stack 
                                direction = 'row' 
                                justifyContent= 'center' 
                                spacing = {1}  
                                alignItems = 'center'>
                                <FontAwesomeIcon 
                                    icon = {faUser} 
                                    style = {{fontSize : '1.5rem'}} />
                                <Typography
                                    sx = {{
                                        fontFamily : 'BIZ UDMincho, serif', 
                                        fontSize : '1.2rem'}}>                                                            
                                    {address.firstName} {address.lastName}
                                </Typography>
                            </Stack>
                            <Stack 
                                direction = 'row' 
                                spacing = {1} 
                                alignItems = 'center'>
                                <FontAwesomeIcon 
                                    icon = {faMobileRetro} 
                                    style = {{fontSize : '1.5rem'}}/>
                                <Typography
                                    sx = {{
                                        fontFamily : 'BIZ UDMincho, serif', 
                                        fontSize : '1.2rem'}}>
                                    {address.phoneNumber}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack 
                            direction = 'row' 
                            spacing = {2} 
                            sx = {{mt:2, width : 300}} 
                            justifyContent= 'flex-start' 
                            alignItems = 'center'>
                            <FontAwesomeIcon 
                                icon = {faHouse} 
                                style = {{fontSize : '1.5rem'}} />
                            <Typography
                                sx = {{
                                    fontFamily : 'BIZ UDMincho, serif', 
                                    fontSize : '1.2rem'}}>
                                {address.address}
                            </Typography>
                        </Stack>
                        <Stack 
                            direction = 'row' 
                            sx = {{mt:2, width : 300}} 
                            spacing = {2}>
                            <FontAwesomeIcon  
                                icon = {faCity} 
                                style = {{fontSize : '1.5rem'}} />
                            <Typography
                                sx = {{
                                    fontFamily : 'BIZ UDMincho, serif', 
                                    fontSize : '1.2rem'}}>
                                {address.city}, {address.state}, {address.country}
                            </Typography>
                        </Stack>
                        <Box 
                            sx = {{width : 300}} 
                            display = 'flex' 
                            justifyContent = 'flex-start'>
                            <Typography 
                                sx = {{
                                    mt:2,
                                    fontFamily : 'BIZ UDMincho, serif', 
                                    fontSize : '1.2rem'}}>
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
