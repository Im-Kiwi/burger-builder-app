import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Container, Grid, Paper, Stack, Typography, Chip, Button, IconButton } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { getDocs, query, where, doc, collection, deleteDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uniqueId } from 'uuid'

// ------ importing from other files --------
import { db } from '../../firebase-setup'
import { cartActions } from '../../Store/reducer/cart'
import Burger from '../Burger/Burger'
import { dialogActions } from '../../Store/reducer/dialog'
import { CustomPaper, CustomGrid, CustomStack } from './styles'

const Cart = () => {
    const dispatch = useDispatch()
    console.log(uniqueId())
    // to make sure useEffect execute everytime user clicks on delete button to delete cart item
    const [isDelete, setIsDelete] = useState(false) 

    // getting values from the redux store
    const userId = useSelector(state => state.userForm.currentUser.userId)
    const cartItems = useSelector(state => state.cart.cartItems)

    useEffect (() => {
        // fetching cart items from database
        (async () => {
            console.log('execute')
            try {
                const cartItemsQuery = query(collection(db, 'cart'), where('userId', '==', userId))
                const getCartItem = await getDocs(cartItemsQuery)            
                let temp = []
                getCartItem.forEach(doc => {
                    temp.push({...doc.data(), dataId : doc.id})
                })
                dispatch(cartActions.updateCartItems([...temp]))
            } catch (err) {
                console.log('failed to fetch cart items, please check ur internet connection')
            }
        })();
    }, [userId, isDelete])

    // method to delete a cart item
    const deleteCartItemHandler = async (dataId) => {
        const cartItemRef = doc(db, 'cart', dataId)

        try {
            await deleteDoc(cartItemRef)
            setIsDelete(v => !v)
        } catch (err) {
            console.log('cant able to delete, please check your network connection')
        }
    }

    return (
        <Container>
            <Box sx = {{mt : 12,  height: '650px', overflowY : 'auto'}}>
                {cartItems.length !== 0 ?
                    <Box>
                        {cartItems.map(item => {                    
                            return (
                                <CustomPaper key = {uniqueId()}>
                                    <CustomGrid container                                          
                                        justifyContent = 'space-around'                             
                                    >
                                        <Grid item display = 'flex' flexDirection = 'row' alignItems = 'center' sx = {{mb:5}}>
                                            <CustomStack
                                                direction = 'row'  
                                                alignItems = 'flex-end'                                                 
                                                className = 'shadow-sm'
                                            >
                                                <Burger ingredients = {item} width = {45} />
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
                                                onClick = {() => deleteCartItemHandler(item.dataId)} 
                                                sx = {{border : 'solid 1px #f9b826', mt:2.5}}
                                                size = 'large'
                                            >
                                                <DeleteForever sx = {{color : '#f9b826', fontSize : 30}} />                
                                            </IconButton>
                                        </Grid>                                      
                                    </CustomGrid>
                                </CustomPaper>
                            )
                        })}
                    </Box>
                :
                    <Typography>Your Cart is Empty :(</Typography>
                }
            </Box>
        </Container>
    )
}

export default Cart