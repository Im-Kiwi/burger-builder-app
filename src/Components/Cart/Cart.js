import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Container, Grid, Paper, Stack, Typography, Chip, Button, IconButton } from '@mui/material'
import { Close, Delete, DeleteOutline } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { getDocs, query, where, doc, collection, deleteDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uniqueId } from 'uuid'
import { motion, AnimatePresence } from 'framer-motion'

// ------ importing from other files --------
import { db } from '../../firebase-setup'
import { cartActions } from '../../Store/reducer/cart'
import Burger from '../Burger/Burger'
import { dialogActions } from '../../Store/reducer/dialog'
import { CustomBox, CustomGrid, CustomStack, CustomChip } from './styles'
import { toggleActions } from '../../Store/reducer/toggle'

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
                <Box position = 'relative'>
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
                                        }
                                    }}>
                                    <CustomBox>
                                        <Grid container                                          
                                            justifyContent = 'flex-start'  
                                            alignItems = 'center'>
                                            <Grid item 
                                                display = 'flex' 
                                                flexDirection = 'row'>
                                                <CustomStack
                                                    direction = 'row'  
                                                    alignItems = 'flex-end'>
                                                    <Burger 
                                                        ingredients = {item} 
                                                        width = {45} 
                                                        plateWidth = {150} 
                                                        cokeWidth = {60}
                                                        friesWidth = {60}/>
                                                </CustomStack>
                                            </Grid>
                                            <Grid item 
                                                display = 'flex' 
                                                flexDirection = 'column' 
                                                alignItems = 'flex-start'>
                                                <Stack 
                                                    direction = 'row' 
                                                    justifyContent = 'center' 
                                                    sx = {{mb : 2, mt: 1, color : '#110f12'}}>                                                            
                                                    <Typography sx = {{ml : 5}} variant = 'h6'>
                                                        ${item.totalPrice.toFixed(2)}
                                                    </Typography>
                                                </Stack>
                                                <Stack direction = 'row' sx = {{color : '#110f12'}}>
                                                    <Typography>
                                                        <strong>Ingredients</strong> 
                                                    </Typography>                                                                                        
                                                    <CustomChip 
                                                        label = {`${item.Lettuce.name} ${item.Lettuce.qty}`} 
                                                        size = 'small'/>
                                                    <CustomChip 
                                                        label = {`${item.Cheese.name} ${item.Cheese.qty}`} 
                                                        size = 'small'/>
                                                    <CustomChip 
                                                        label = {`${item.Onion.name} ${item.Onion.qty}`}
                                                        size = 'small'/>
                                                    <CustomChip 
                                                        label = {`${item.Tomato.name} ${item.Tomato.qty}`} 
                                                        size = 'small' />
                                                    <CustomChip 
                                                        label = {`${item.Meat.name} ${item.Meat.qty}`} 
                                                        size = 'small'/>
                                                    <CustomChip 
                                                        label = {`${item.Bacon.name} ${item.Bacon.qty}`} 
                                                        size = 'small'/>
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <motion.div
                                                    whileTap = {{transform : 'translateY(5px)'}}
                                                    transition = {{ease : 'easeOut', duration : 0.1}}>
                                                    <IconButton
                                                        sx = {{ml:10, mt:5}} 
                                                        onClick = {() => deleteCartItemHandler(item.id)} 
                                                        size = 'small'>
                                                        <FontAwesomeIcon 
                                                            style = {{color : '#011627', fontSize : '1.2rem'}}
                                                            icon = {faTrashCan} />                
                                                    </IconButton>
                                                </motion.div>
                                            </Grid>                                      
                                        </Grid>
                                    </CustomBox>
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