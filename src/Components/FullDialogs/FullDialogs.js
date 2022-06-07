import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, AppBar, Toolbar, IconButton, Typography, Stack, useMediaQuery, Grid } from '@mui/material'
import { Modal, Offcanvas } from 'react-bootstrap'
import { Button } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

//  ------------------- importing from files ------------------
import { styles } from './styles'
import { cartActions } from '../../Store/reducer/cart'
import { stepperActions } from '../../Store/reducer/stepper'

const FullDialogs = (props) => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    // creating css breakpoints
    const break_820 = useMediaQuery('(max-width : 820px')
    const break_500 = useMediaQuery('(max-width : 500px)')
    const break_425 = useMediaQuery('(max-width : 425px)')

    // fetching values from redux store
    const openDialog = useSelector(state => state.dialog.open) // to open/close the fullscreen modal
    const switchCurr = useSelector(state => state.switchCurr.switchCurr) // to switch currencies ruppee<->pesos

    // this method will place order of the cart items saved by the user
    const placeOrderHandler = () => {
        dispatch(cartActions.updateInstantBuy(false))
        dispatch(stepperActions.resetStepper())
        navigate('/buy/delivery-address')
        localStorage.setItem('nextPath', pathname) // to make sure when user navigate backs from delivery address page, then it should navigate back to /cart
        localStorage.removeItem('id') // removing the id of address from address store 
    }

    return (
        <Offcanvas placement = 'bottom' show = {openDialog} style = {{height : '100%'}} >
            <Box className = {classes.navContainer}>
                <AppBar sx = {{backgroundColor : '#110f12'}}>
                    <Toolbar>
                        <Grid container
                            className = 'w-100 mt-1 mb-2' 
                            spacing = {1}
                            alignItems = 'flex-start'>
                            <Grid 
                                item container xs = {11}
                                justifyContent = 'space-between'>
                                <Grid item xs = {break_425 ? 11 : 3}
                                    display = 'flex'
                                    justifyContent = 'center'
                                    alignItems = 'center'
                                    gap = {1}
                                    sx = {{color : '#f9b826'}}>
                                    {props.title &&
                                        <FontAwesomeIcon 
                                            style = {{fontSize : '1.3rem'}}
                                            icon = {faCartShopping}/>
                                    }
                                    <Typography 
                                        sx = {{fontFamily :  'Oswald, sans-serif'}}
                                        variant = 'h5'>
                                        {props.title}
                                    </Typography>
                                </Grid>
                                {props.totalItems ?
                                    <Grid item xs = {break_425 ? 11 : 8}
                                        display = 'flex' 
                                        flexDirection = {break_820 ? 'column' : 'row'} 
                                        gap = {break_820 ? 1 : 7}
                                        alignItems = 'center'>
                                        <Stack 
                                            direction = {break_500 ? 'column' : 'row'} 
                                            alignItems = 'center'>
                                            <Typography 
                                                variant = 'h6'
                                                className = {classes.priceDetails}>
                                                Total Price ( {props.totalItems} {props.totalItems === 1 ? 'item' : 'items'} )
                                            </Typography>
                                            <Box display = 'flex' alignItems = 'center'>
                                                {switchCurr ?
                                                    <FontAwesomeIcon 
                                                        icon = {faIndianRupeeSign}
                                                        className = {classes.price} /> :
                                                    <FontAwesomeIcon 
                                                        icon = {faPesoSign}
                                                        className = {classes.price} />
                                                }
                                                <Typography 
                                                    variant = 'h6' 
                                                    sx = {{fontFamily : 'Comfortaa, cursive', color : '#f9b826'}}>
                                                    {switchCurr ? props.cartPrice : (props.cartPrice*0.67).toFixed(0)}
                                                </Typography>                                        
                                            </Box>
                                        </Stack>
                                        <Button 
                                            variant = 'contained'
                                            color = 'yellowish'
                                            className = {classes.orderButton} 
                                            onClick = {placeOrderHandler}>
                                            Place Order
                                        </Button>
                                    </Grid>
                                    : null
                                }
                            </Grid>
                            <Grid item xs = {1}
                                display = 'flex'
                                flexDirection = 'row'
                                alignItems = 'center'
                                justifyContent = 'center'>
                                <IconButton 
                                    component = {motion.div}
                                    whileHover = {{rotate : 90}}
                                    size = 'large' 
                                    className = 'text-light' 
                                    onClick = {() => props.closeDialogHandler(props.isOrderSummary)}
                                    position = 'relative'
                                    sx = {{float : 'right'}}
                                    color = 'yellowish'
                                    aria-label = 'close'>
                                    <CloseRounded style = {{color: '#f9b826'}} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box sx = {{overflowY : 'auto', height : '100%'}}>
                    {props.children}
                </Box>
            </Box>
        </Offcanvas>           
    )
}

export default FullDialogs