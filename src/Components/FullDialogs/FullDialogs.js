import React, { forwardRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Box, AppBar, Toolbar, IconButton, Typography, Stack, Slide } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { Button } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { motion } from 'framer-motion'

//  ------------------- importing from files ------------------
import { cartActions } from '../../Store/reducer/cart'

const FullDialogs = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const openDialog = useSelector(state => state.dialog.open)

    // const Transition = forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // })
    const placeOrderHandler = () => {
        dispatch(cartActions.updateInstantBuy(false))
        navigate('/buy/delivery-address')
        localStorage.removeItem('id')
    }

    return (

        <Modal fullscreen = {true} show = {openDialog}>
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
                            <motion.div whileHover = {{rotate : 90}} >
                                <IconButton size = 'large' 
                                    className = 'text-light' 
                                    onClick = {() => props.closeDialogHandler(props.isOrderSummary)}
                                    position = 'relative'
                                    sx = {{float : 'right'}}
                                    aria-label = 'close'
                                    disableRipple
                                    >
                                    <CloseRounded style = {{color: '#f9b826'}} />
                                </IconButton>
                            </motion.div>
                        </Stack>
                    </Toolbar>
                </AppBar>
                {props.children}
            </Box>
        </Modal>

        // <Dialog fullScreen open = {openDialog}>
        //     <Box sx = {{width : '100vw', height : '100vh', backgroundColor : '#f9b826'}}>
        //         <AppBar sx = {{backgroundColor : '#110f12'}}>
        //             <Toolbar>
        //                 <Stack className = 'w-100' direction = 'row' justifyContent = 'space-between' alignItems = 'center' >
        //                     <Typography variant = 'h6'>{props.title}</Typography>
        //                     {props.priceInfo ?
        //                         <>
        //                             <Typography variant = 'h6'>{props.priceInfo}</Typography>
        //                             <Button variant = 'contained' color = 'error' onClick = {placeOrderHandler}>Place Order</Button>
        //                         </>
        //                         : null
        //                     }
        //                     <motion.div whileHover = {{rotate : 90}} >
        //                         <IconButton size = 'large' 
        //                             className = 'text-light' 
        //                             onClick = {() => props.closeDialogHandler(props.isOrderSummary)}
        //                             position = 'relative'
        //                             sx = {{float : 'right'}}
        //                             aria-label = 'close'
        //                             disableRipple
        //                             >
        //                             <CloseRounded style = {{color: '#f9b826'}} />
        //                         </IconButton>
        //                     </motion.div>
        //                 </Stack>
        //             </Toolbar>
        //         </AppBar>
        //         {props.children}                
        //     </Box>   
        // </Dialog>            
    )
}

export default FullDialogs