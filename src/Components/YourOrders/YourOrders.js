import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Divider, Typography, Stack, Fab } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { v4 as uniqueId } from 'uuid'
import { collection, where, query, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// ----------- importing from other files --------------
import { dialogActions } from '../../Store/reducer/dialog'
import OrderItem from '../OrderItem/OrderItem'
import { db } from '../../firebase-setup'
import { onTheWay, delivered, dispatching } from '../../identifiers/identifiers'

const YourOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orders = useSelector(state => state.orders.orders)
    const showModal = useSelector(state => state.dialog.openUserProfModal)

    // sorting orders according to the order place time
    const sortedOrders = [...orders].sort((a,b) => b.orderedOn - a.orderedOn)
    
    // this will stay the modal open even when user reload the page
    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    // to deleting the orders from database which are older and delivered
    useEffect(() => {
        (async () => {
            const time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).getTime()
            const ordersRef = query(collection(db, 'orders'), where('orderedOn', '<=', time))
            const getOrders = await getDocs(ordersRef)
            let temp = []
            getOrders.forEach(doc => {
                temp.push({...doc.data(), id : doc.id})
            })
            
            for (let order of temp) {
                await deleteDoc(doc(db, 'orders', order.id))
            }
        })();
        
    }, [])

    // to change the order status
    useEffect(() => {
        const currentTime = new Date().getTime()
        sortedOrders.forEach(order => {
            if (order.status !== 'delivered') {
                (async () => {
                    const dispatchTime = order.orderedOn + 300000
                    const deliverTime = order.orderedOn + 1200000
                    if (currentTime >= dispatchTime && currentTime < deliverTime) {
                        await updateDoc(doc(db, 'orders', order.id), {status : onTheWay})
                    } else if (currentTime >= deliverTime) {
                        await updateDoc(doc(db, 'orders', order.id), {status : delivered})
                    }                    
                })();            
            }
        })
    }, [])

    

    
    // method to close modal
    const closeModalHandler = () => {
        navigate(localStorage.getItem('prevPath')) // it will navigate to the previous path from where user came from before opening the 'Your orders' modal
        dispatch(dialogActions.updateUserProfModal(false)) // to close the modal
        localStorage.removeItem('prevPath') // removing the previous path info from local storage
    }
    
    const ordersDisplayMethod = () => {
        return sortedOrders.map(order => {
            // trying to get the order item from the order object
            // this can be done by filtering the keys of that object, as last 4 properties of this object are extra info of the order
            // instead of that rest are order items
            const ordersKeys = Object.keys(order)
            const filterKeys = ordersKeys.filter((_, index) => index < ordersKeys.length - 7)

             // to store the font color of the order status
            let statusColor
            if (order.status === dispatching) {
                statusColor = '#d00000'
            } else if (order.status === onTheWay) {
                statusColor = '#f3722c'
            } else if (order.status === delivered) {
                statusColor = '#008000'                
            }
        
            return ( 
                <Box key = {uniqueId()}>
                    <Grid  container spacing = {4} justifyContent = 'center'>
                        <Grid 
                            xs = {12} item 
                            sx = {{backgroundColor : '#110f12', color : '#f9b826'}}>
                            <Box 
                                display = 'flex'
                                flexDirection = 'row'
                                justifyContent = 'space-evenly'
                                alignItems = 'center'
                                sx = {{mb:1}}>
                                <Stack direction = 'row' spacing = {2}>
                                    <Typography
                                        variant = 'body1' 
                                        sx = {{fontFamily : 'Anton, sans-serif'}}>
                                        Order id
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx = {{fontFamily : 'Poppins, sans-serif'}}>
                                        #{order.id.slice(0,9)}
                                    </Typography>
                                </Stack>
                                <Stack direction = 'row' spacing = {2}>
                                    <Typography
                                        variant = 'body1'
                                        sx = {{fontFamily : 'Anton, sans-serif'}}> 
                                        {order.paymentType === 'Cash on Delivery' ? 
                                            'Price to pay' :
                                            'Price Paid'}
                                    </Typography>
                                    <Stack direction = 'row' alignItems = 'center'>
                                        {order.address.country === 'India' ?
                                            <FontAwesomeIcon icon = {faIndianRupeeSign} /> :
                                            <FontAwesomeIcon icon = {faPesoSign} />
                                        }
                                        <Typography
                                            variant = 'body1'
                                            sx = {{ml:0.5, fontFamily : 'Poppins, sans-serif'}}>
                                            {order.totalPrice} ({order.paymentType})
                                        </Typography>
                                    </Stack>                    
                                </Stack>    
                                <Stack direction = 'row' alignItems = 'center' spacing = {1}>
                                    <Box position = 'relative'>
                                        <Box 
                                            sx = {{
                                                position : 'absolute',
                                                width : 10, 
                                                height : 10, 
                                                borderRadius : '50%', 
                                                backgroundColor : statusColor,
                                                filter : 'blur(4px)'
                                            }}
                                        ></Box>
                                        <Box sx = {{
                                            width : 9, 
                                            height : 9, 
                                            borderRadius : '50%', 
                                            backgroundColor : statusColor,
                                            zIndex : 10
                                        }}></Box>
                                    </Box>
                                    <Typography 
                                        variant = 'body1' 
                                        sx = {{
                                            color : statusColor,
                                            fontFamily : 'Poppins, sans-serif'}}>
                                            {order.status}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs = {12} 
                            container 
                            justifyContent = 'center' 
                            spacing = {4}>
                            {filterKeys.map(objKey => {
                                return (
                                    <Grid key = {uniqueId()} item xs = {9} >
                                        <OrderItem ing = {order[objKey]} />
                                    </Grid>
                                )
                            })}                            
                        </Grid>
                        <Grid item>
                                <Typography
                                    variant = 'h6'
                                    sx = {{fontFamily : 'DM Serif Text, serif'}}>
                                    DeliveryAddress
                                </Typography>
                                <Typography
                                    variant = 'body1'
                                    sx = {{fontFamily : 'BIZ UDMincho, serif'}}>
                                    {order.address.firstName} {order.address.lastName}                                    
                                </Typography>
                                <Typography
                                    variant = 'body1'
                                    sx = {{fontFamily : 'BIZ UDMincho, serif'}}>
                                    {order.address.address}
                                </Typography>
                                <Typography
                                    variant = 'body1'
                                    sx = {{fontFamily : 'BIZ UDMincho, serif'}}>
                                    {order.address.city}- {order.address.pinCode} 
                                </Typography>
                                <Typography
                                    variant = 'body1'
                                    sx = {{fontFamily : 'BIZ UDMincho, serif'}}>
                                    {order.address.state}, {order.address.country}
                                </Typography>
                                <Typography
                                    variant = 'body1'
                                    sx = {{fontFamily : 'BIZ UDMincho, serif'}}>
                                    {order.address.phoneNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                    <Divider sx = {{mt:3, mb:3}} />
                </Box>                   
                
            )
        })
    }
    
    const displayOrders = ordersDisplayMethod()

    return (
        <Modal size = 'xl' centered show = {showModal} onHide = {closeModalHandler}>
            <Fab
                size = 'small' 
                aria-label = 'close button'
                onClick = {closeModalHandler}
                sx = {{
                    position : 'absolute', 
                    right : -15, 
                    top : -20, 
                    zIndex : 10,
                    backgroundColor : '#ffb600',
                    '&:hover' : {
                        backgroundColor : '#ffb600'
                    }
                }}
            >
                <CloseRounded />
            </Fab>
            <Box 
                sx = {{
                    width : 'inherit', 
                    height : 700, 
                    backgroundColor : '#f9b826', 
                    py : 1.5, 
                    overflowY: 'auto',
                    position : 'relative',
                }}>
                <Box sx = {{mt:2}}>
                    {displayOrders}
                </Box>
            </Box>
        </Modal>
    )
}

export default YourOrders