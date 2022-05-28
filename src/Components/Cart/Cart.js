import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Container, Grid, Paper, Stack, Typography, Chip, Button, IconButton } from '@mui/material'
import { Close, Delete, DeleteOutline } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { getDocs, query, where, doc, collection, deleteDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

// ------ importing from other files --------
import { db } from '../../firebase-setup'
import OrderItem from '../OrderItem/OrderItem'

const Cart = () => {

    // getting values from the redux store
    const cartItems = useSelector(state => state.cart.cartItems)

    // method to delete a cart item
    const deleteCartItemHandler = async (dataId) => {
        try {
            await deleteDoc(doc(db, 'cart', dataId))
        } catch (err) {
            console.log('cant able to delete, please check your network connection')
        }
    }

    return (
        <Container>
            <Box sx = {{mt : 12,  height: '650px', overflowY : 'auto'}}>
                <Box position = 'relative' sx = {{mt:6}}>
                    {cartItems.length === 0 &&
                        <Typography position = 'absolute'>Your Cart is Empty</Typography>
                    }
                    <AnimatePresence>
                        {cartItems.map((item) => {
                            return (
                                <motion.div 
                                    layout
                                    key = {item.id}
                                    exit = {{
                                        x : -100, 
                                        opacity : 0,
                                        transition : {
                                            ease : 'easeOut'
                                        }}}
                                    style = {{marginBottom : 100}}>
                                    <OrderItem 
                                        ing = {item} 
                                        thisIsCart = {true}
                                        deleteCartItemHandler = {deleteCartItemHandler} />                                    
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </Box>                
            </Box>
        </Container>
    )
}

export default Cart