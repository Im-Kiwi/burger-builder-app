import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Grid, Divider, Typography, Stack, Fab, ThemeProvider } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { v4 as uniqueId } from 'uuid'
import { collection, where, query, getDocs, deleteDoc, doc } from 'firebase/firestore'

// ----------- importing from other files --------------
import { dialogActions } from '../../Store/reducer/dialog'
import OrderItem from '../OrderItem/OrderItem'
import { db } from '../../firebase-setup'

const YourOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orders = useSelector(state => state.orders.orders)
    const showModal = useSelector(state => state.dialog.openUserProfModal)
    console.log(orders)

    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    // to deleting the orders from database which are older and delivered
    useEffect(() => {
        (async () => {
            const time = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 4).getTime()
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
            const filterKeys = ordersKeys.filter((_, index) => index < ordersKeys.length - 4)
        
            return ( 
                <Box key = {uniqueId()}>
                    <Grid  container spacing = {4} justifyContent = 'center'>
                        <Grid xs = {12} item display = 'flex' flexWrap = 'wrap' justifyContent = 'space-evenly'>
                            <Typography variant = 'body1'><strong>Order id :</strong> #{order.id}</Typography>    
                            <Typography><strong>Price paid :</strong> </Typography>                    
                            <Stack direction = 'row' alignItems = 'center' spacing = {1}>
                                <Box position = 'relative'>
                                    <Box 
                                        sx = {{
                                            position : 'absolute',
                                            width : 10, 
                                            height : 10, 
                                            borderRadius : '50%', 
                                            backgroundColor : 'red',
                                            filter : 'blur(4px)'
                                        }}
                                    ></Box>
                                    <Box sx = {{
                                        width : 9, 
                                        height : 9, 
                                        borderRadius : '50%', 
                                        backgroundColor : 'red',
                                        zIndex : 10
                                    }}></Box>
                                </Box>
                                <Typography variant = 'body1' sx = {{color : 'red'}}>on the way</Typography>
                            </Stack>
                        </Grid>
                        <Grid item container justifyContent = 'center' spacing = {5}>
                            {filterKeys.map(objKey => {
                                return (
                                    <Grid key = {uniqueId()} item>
                                        <OrderItem ing = {order[objKey]} />
                                    </Grid>
                                )
                            })}
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