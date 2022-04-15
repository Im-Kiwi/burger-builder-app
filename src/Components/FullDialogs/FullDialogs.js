import { useState, forwardRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Box, AppBar, Toolbar, IconButton, Typography, Stack, Slide } from '@mui/material'
import { Button, List, ListItem, ListItemText, Divider } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { dialogActions } from '../../Store/reducer/dialog'

//  ------------------- importing from files ------------------
import SignUp from '../SignUp/SignUp'
import LogIn from '../LogIn/LogIn'
import { cartActions } from '../../Store/reducer/cart'

const FullDialogs = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const openDialog = useSelector(state => state.dialog.open)
    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm) 

    // const Transition = forwardRef(function Transition(props, ref) {
    //     return <Slide direction = 'up' ref = {ref} {...props} />
    // })

    const placeOrderHandler = () => {
        dispatch(cartActions.updateInstantBuy(false))
        navigate('/buy/delivery-address')
    }

    return (
        <Dialog fullScreen open = {openDialog} onClose = {() => props.closeDialogHandler(props.isOrderSummary)}>
            <Box sx = {{width : '100vw', height : '100vh', backgroundColor : '#f9b826'}}>
                <AppBar sx = {{backgroundColor : '#110f12'}}>
                    <Toolbar>
                        <Stack className = 'w-100' direction = 'row' justifyContent = 'space-between' alignItems = 'center' >
                            <Typography variant = 'h6'>{props.title}</Typography>
                            {props.priceInfo ?
                                <>
                                    <Typography variant = 'h6'>{props.priceInfo}</Typography>
                                    <Button variant = 'contained' color = 'error' onClick = {placeOrderHandler}>Place Order</Button>
                                </>
                                : null
                            }
                            <IconButton size = 'large' 
                                className = 'text-light' 
                                onClick = {() => props.closeDialogHandler(props.isOrderSummary)}
                                position = 'relative'
                                sx = {{float : 'right'}}
                                aria-label = 'close'
                            >
                                <CloseRounded />
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
                {props.children}                
            </Box>   
        </Dialog>
    )
}

export default FullDialogs