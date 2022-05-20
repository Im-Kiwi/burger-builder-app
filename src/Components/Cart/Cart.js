import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Container, Grid, Paper, Stack, Typography, Chip, Button, IconButton } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { getDocs, query, where, doc, collection, deleteDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uniqueId } from 'uuid'
import { motion, AnimatePresence } from 'framer-motion'

// ------ importing from other files --------
import { db } from '../../firebase-setup'
import { cartActions } from '../../Store/reducer/cart'
import Burger from '../Burger/Burger'
import { dialogActions } from '../../Store/reducer/dialog'
import { CustomPaper, CustomGrid, CustomStack } from './styles'
import { toggleActions } from '../../Store/reducer/toggle'

const Cart = () => {
    const dispatch = useDispatch()

    // getting values from the redux store
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems)

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
                {cartItems.length !== 0 ?
                    <Box>
                        <AnimatePresence>
                        {cartItems.map((item) => {                    
                            return (
                                <motion.div 
                                    layout
                                    key = {item.id}
                                    exit = {{scale : 0 }}
                                >
                                    <CustomPaper >
                                        <CustomGrid container                                          
                                            justifyContent = 'space-around'                             
                                        >
                                            <Grid item display = 'flex' flexDirection = 'row' alignItems = 'center' sx = {{mb:5}}>
                                                <CustomStack
                                                    direction = 'row'  
                                                    alignItems = 'flex-end'                                                 
                                                    className = 'shadow-sm'
                                                >
                                                    <Burger 
                                                        ingredients = {item} 
                                                        width = {45} 
                                                        plateWidth = {150} 
                                                        cokeWidth = {60}
                                                        friesWidth = {60}
                                                    />
                                                </CustomStack>
                                            </Grid>
                                            <Grid item display = 'flex' flexDirection = 'column' alignItems = 'center'>
                                                <Stack 
                                                    className = 'text-light' 
                                                    direction = 'row' 
                                                    justifyContent = 'center' 
                                                    sx = {{mb : 2, mt: 1}}
                                                >
                                                    <Typography variant = 'h6'>Burger Name - {item.burgerName}</Typography>
                                                    <Typography sx = {{ml : 5}} variant = 'h6'>${item.totalPrice.toFixed(2)}</Typography>
                                                </Stack>
                                                <Stack direction = 'row'>
                                                    <Typography className = 'text-light'>Ingredients</Typography>                                                                                        
                                                    <Chip 
                                                        sx = {{ml : 2, mb : 1}} 
                                                        label = {`${item.Lettuce.name} ${item.Lettuce.qty}`} 
                                                        color = 'warning' 
                                                        size = 'small' 
                                                    />
                                                    <Chip 
                                                        sx = {{ml : 2, mb : 1}} 
                                                        label = {`${item.Cheese.name} ${item.Cheese.qty}`} 
                                                        color = 'warning' 
                                                        size = 'small'
                                                    />
                                                    <Chip 
                                                        sx = {{ml : 2, mb : 1}} 
                                                        label = {`${item.Onion.name} ${item.Onion.qty}`} 
                                                        color = 'warning' 
                                                        size = 'small'
                                                    />
                                                    <Chip 
                                                        sx = {{ml : 2, mb : 1}} 
                                                        label = {`${item.Tomato.name} ${item.Tomato.qty}`} 
                                                        color = 'warning' 
                                                        size = 'small' 
                                                    />
                                                    <Chip 
                                                        sx = {{ml : 2, mb : 1}} 
                                                        label = {`${item.Meat.name} ${item.Meat.qty}`} 
                                                        color = 'warning' 
                                                        size = 'small' 
                                                    />
                                                    <Chip 
                                                        sx = {{ml : 2, mb : 1}} 
                                                        label = {`${item.Bacon.name} ${item.Bacon.qty}`} 
                                                        color = 'warning' 
                                                        size = 'small' 
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <IconButton 
                                                    onClick = {() => deleteCartItemHandler(item.id)} 
                                                    sx = {{border : 'solid 1px #f9b826', mt:2.5}}
                                                    size = 'large'
                                                >
                                                    <DeleteForever sx = {{color : '#f9b826', fontSize : 30}} />                
                                                </IconButton>
                                            </Grid>                                      
                                        </CustomGrid>
                                    </CustomPaper>
                                </motion.div>
                            )
                        })}
                        </AnimatePresence>
                    </Box>
                :
                    <Typography>Your Cart is Empty :(</Typography>
                }
            </Box>
        </Container>
    )
}

export default Cart