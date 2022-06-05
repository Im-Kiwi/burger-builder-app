import { useSelector } from 'react-redux'
import { Typography, Grid, Box, Stack, useMediaQuery  } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uniqueId } from 'uuid'
import { faUser, faMobileRetro, faHouse, faCity, faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// -------------- importing from other files ------------
import { styles } from './styles'
import OrderItem from '../../Components/OrderItem/OrderItem'
import { philippines, india } from '../../identifiers/identifiers'

const OrderSummary = (props) => {
    const classes = styles()

    // creating breakpoints
    const break_855 = useMediaQuery('(max-width : 855px)')
    const break_740 = useMediaQuery('(max-width : 740px)')
    const break_431 = useMediaQuery('(max-width : 431px)')

    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const address = useSelector(state => state.orders.deliveryAddress)
    return (  
        <motion.div
            initial = {{x:200, opacity:0}}
            animate = {{x:0, opacity:1}}
            style = {{marginBottom : 10}}>
            <Grid container 
                className = {classes.orderSummary}
                justifyContent = 'center' 
                alignItems = 'center'>
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
                                <OrderItem 
                                    ing = {ing}
                                    firstBreak = {break_855}
                                    secondBreak = {break_740}
                                    thirdBreak = {break_431} />    
                            </Box>
                        )
                    })}
                </Grid>
                <Grid item container 
                    xs = {12} 
                    className = {classes.deliveryAddress}  
                    display = 'flex' 
                    flexDirection = {break_740 ? 'column' : 'row'} 
                    alignItems = 'center'
                    justifyContent = 'space-around'>
                    <Grid item xs = {break_740 ? 12 : 3}
                        sx = {{mb:3}} 
                        display = 'flex' 
                        flexDirection = 'row' 
                        justifyContent = 'center' 
                        alignItems = 'center'>
                        <Typography 
                            variant = 'body1'
                            className = {classes.pay}>
                            Pay 
                        </Typography>
                        {address.country === "Philippines" ?
                            <FontAwesomeIcon 
                                icon = {faPesoSign}
                                className = {classes.currencyIcon} />
                        : 
                            <FontAwesomeIcon 
                                icon = {faIndianRupeeSign} 
                                className = {classes.currencyIcon} />
                        }
                        <Typography 
                            variant = 'body1'
                            className = {classes.price}>
                            {instantBuy ?
                                address.country === philippines ? (items[0].totalPrice*0.67).toFixed(0) : items[0].totalPrice
                                : 
                                address.country === india ? props.cartPrice : (props.cartPrice*0.67).toFixed(0)}
                        </Typography>
                    </Grid>                                                   
                    <Grid item xs = {break_740 ? 12 : 9} 
                        display = 'flex' 
                        flexDirection = 'column' 
                        justifyContent = 'center'
                        alignItems = 'center'>
                        <Typography
                            variant = 'h6' 
                            className = {classes.addressHeading}>
                            Delivery address
                        </Typography>
                        <Box 
                            display = 'flex' 
                            flexDirection = 'column' 
                            alignItems = 'center'
                            gap = {1}
                            sx = {{color : '#f9b826',}}>
                            <Stack 
                                spacing = {1} 
                                justifyContent = 'flex-start'
                                alignItems = 'flex-start' 
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
                                        variant = 'body1'
                                        className = {classes.addressText}>                                                            
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
                                        variant = 'body1'
                                        className = {classes.addressText}>
                                        {address.phoneNumber}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack 
                                direction = 'row' 
                                spacing = {1} 
                                sx = {{width : 300}} 
                                justifyContent= 'flex-start' 
                                alignItems = 'center'>
                                <FontAwesomeIcon 
                                    icon = {faHouse} 
                                    style = {{fontSize : '1.5rem'}} />
                                <Typography
                                    variant = 'body1'
                                    className = {classes.addressText}>
                                    {address.address}
                                </Typography>
                            </Stack>
                            <Stack 
                                direction = 'row' 
                                sx = {{ width : 300}} 
                                spacing = {1}>
                                <FontAwesomeIcon  
                                    icon = {faCity} 
                                    style = {{fontSize : '1.5rem'}} />
                                <Typography
                                    variant = 'body1'
                                    className = {classes.addressText}>
                                    {address.city}, {address.state}, {address.country}
                                </Typography>
                            </Stack>
                            <Box 
                                display = 'flex' 
                                justifyContent = 'flex-start'>
                                <Typography 
                                    variant = 'body1'
                                    className = {classes.zipCodeText}>
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
