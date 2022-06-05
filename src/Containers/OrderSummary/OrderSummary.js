import { useSelector } from 'react-redux'
import { Typography, Grid, Box, Stack  } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uniqueId } from 'uuid'
import { faUser, faMobileRetro, faHouse, faCity, faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// -------------- importing from other files ------------
import OrderItem from '../../Components/OrderItem/OrderItem'
import { philippines, india } from '../../identifiers/identifiers'

const OrderSummary = (props) => {
    
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const address = useSelector(state => state.orders.deliveryAddress)
    return (  
        <motion.div
            initial = {{x:200, opacity:0}}
            animate = {{x:0, opacity:1}}>
            <Grid container 
                sx = {{mt : 5, maxHeight : 590, overflowY : 'auto'}} 
                display = 'flex' 
                justifyContent = 'center' 
                alignItems = 'flex-start'>
                <Grid xs = {12} item  
                    display = 'flex'  
                    flexWrap = 'wrap' 
                    justifyContent = 'center' 
                    gap = {3.5}
                    sx = {{mt:4}}>
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
                    xs = {12} 
                    className = 'text-center'  
                    display = 'flex' 
                    flexDirection = 'row' 
                    justifyContent = 'space-around'
                    sx = {{p:1, backgroundColor : '#110f12', borderRadius : 2}}>
                    <Grid item 
                        sx = {{mb:3}} 
                        display = 'flex' 
                        flexDirection = 'row' 
                        justifyContent = 'center' 
                        alignItems = 'center'>
                        <Typography 
                            variant = 'body1'
                            sx = {{
                                mr:2, 
                                fontFamily : 'DM Serif Text, serif', 
                                fontSize : '1.3rem',
                                color : '#f9b826'}}>
                            Pay 
                        </Typography>
                        {address.country === "Philippines" ?
                            <FontAwesomeIcon 
                                icon = {faPesoSign} 
                                style = {{fontSize : '1.3rem', color : '#f9b826'}}/>
                        : 
                            <FontAwesomeIcon 
                                icon = {faIndianRupeeSign} 
                                style = {{fontSize : '1.3rem', color : '#f9b826'}}/>
                        }
                        <Typography 
                            variant = 'body1'
                            sx = {{
                                fontFamily : 'Comfortaa, cursive', 
                                fontWeight : 600, 
                                fontSize : '1.3rem',
                                color : '#f9b826'}}>
                            {instantBuy ?
                                address.country === philippines ? (items[0].totalPrice*0.67).toFixed(0) : items[0].totalPrice
                                : 
                                address.country === india ? props.cartPrice : (props.cartPrice*0.67).toFixed(0)}
                        </Typography>
                    </Grid>                                                   
                    <Grid item  display = 'flex' flexDirection = 'column' justifyContent = 'center'>
                        <Typography
                            variant = 'h6' 
                            sx = {{
                                color : '#f9b826', 
                                fontFamily : 'DM Serif Text, serif'}}>
                            Delivery address
                        </Typography>
                        <Box 
                            display = 'flex' 
                            flexDirection = 'column' 
                            alignItems = 'center'
                            sx = {{color : '#f9b826',}}>
                            <Stack 
                                direction = 'row' 
                                spacing = {5} 
                                justifyContent = 'flex-start' 
                                sx = {{width : 300}}>
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
        </motion.div>              
    )
}

export default OrderSummary
