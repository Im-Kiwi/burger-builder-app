import { useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Divider, Typography, Stack, Fab, useMediaQuery } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { v4 as uniqueId } from 'uuid'
import { collection, where, query, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// ----------- importing from other files --------------
import { styles } from './styles'
import { dialogActions } from '../../Store/reducer/dialog'
import { loadingActions } from '../../Store/reducer/loading'
import OrderItem from '../OrderItem/OrderItem'
import { db } from '../../firebase-setup'
import { onTheWay, delivered, dispatching } from '../../identifiers/identifiers'

const YourOrders = () => {
    const classes = styles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // creating css breakpoints
    const break_1199 = useMediaQuery('(max-width : 1199px)')
    const break_991 = useMediaQuery('(max-width : 991px)')
    const break_441 = useMediaQuery('(max-width : 441px)')

    // fetching value from redux store
    const orders = useSelector(state => state.orders.orders) // contains list or orders placed by user
    const showModal = useSelector(state => state.dialog.openUserProfModal) // to show modal
    const loading = useSelector(state => state.loading.loading) // to enable/disable loading spinner

    // this will stay the modal open even when user reload the page
    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    // to change the order status
    useEffect(() => {
        dispatch(loadingActions.updateLoading(true))
        const currentTime = new Date().getTime()
        orders.forEach(order => {
            if (order.status !== 'delivered') {
                (async () => {
                    const dispatchTime = order.orderedOn + 300000 // 5 min after the order placement
                    const deliverTime = order.orderedOn + 1200000 // 20 min after the order placement
                    if (currentTime >= dispatchTime && currentTime < deliverTime) {
                        await updateDoc(doc(db, 'orders', order.id), {status : onTheWay}) // updating the status in database
                    } else if (currentTime >= deliverTime) {
                        await updateDoc(doc(db, 'orders', order.id), {status : delivered}) // updating the status in database
                    }                    
                })();  
            }
        })
        dispatch(loadingActions.updateLoading(false))          
    }, [orders])

    // to deleting the orders from database which are older and delivered
    // this will delete the orders which are more then 1 day old
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
        
    }, [orders])

    // method to close modal
    const closeModalHandler = () => {
        navigate(localStorage.getItem('prevPath')) // it will navigate to the previous path from where user came from before opening the 'Your orders' modal
        dispatch(dialogActions.updateUserProfModal(false)) // to close the modal
        localStorage.removeItem('prevPath') // removing the previous path info from local storage
    }
    
    const ordersDisplayMethod = () => {
        return orders.map(order => {
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
                            className = {classes.header}>
                            <Box 
                                display = 'flex'
                                flexDirection = {break_991 ? 'column' : 'row'}
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
                                            className = {classes.dotShadow}
                                            sx = {{backgroundColor : statusColor}}></Box>
                                        <Box
                                            className = {classes.dot}
                                            sx = {{backgroundColor : statusColor}}></Box>
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
                            alignItems = 'center'
                            sx = {{width : '100%'}}
                            spacing = {4}>
                            {filterKeys.map(objKey => {
                                return (
                                    <Grid 
                                        key = {uniqueId()} 
                                        item xs = {12}
                                        sx = {{ml : break_991 ? break_441 ? 1 : 3 : 0}} >
                                        <OrderItem 
                                            ing = {order[objKey]} 
                                            firstBreak = {break_1199}
                                            secondBreak = {break_991}
                                            thirdBreak = {break_441}/>
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
                className = {classes.closeButton}>
                <CloseRounded />
            </Fab>
            <Box className = {classes.orders}>
                {orders.length === 0 ?
                    <Box 
                        display = 'flex' 
                        alignItems = 'center' 
                        justifyContent = 'center'
                        sx = {{height : '100%', textAlign : 'center'}}>
                        <Typography 
                            variant = 'h3'
                            sx = {{fontFamily : 'Passion One, cursive'}}>
                            No orders placed
                        </Typography>
                    </Box>
                :
                    <Box sx = {{mt:2}}>
                        {loading ? <Spinner animation = 'border' /> : displayOrders}                        
                    </Box>
                }
            </Box>
        </Modal>
    )
}

export default YourOrders