import { useEffect, useState } from 'react'
import { Box, Container, Grid, Paper, Stack, Typography, Chip, Button } from '@mui/material'
import { getDocs, query, where, doc, collection, deleteDoc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uniqueId } from 'uuid'

// ------ importing from other files --------
import { db } from '../../firebase-setup'
import { cartActions } from '../../Store/reducer/cart'
import Burger from '../Burger/Burger'

const Cart = () => {
    const dispatch = useDispatch()

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
                                <Paper key = {uniqueId()} sx = {{mt : 1, mb : 3, borderRadius : 50, backgroundColor: '#110f12'}}>
                                    <Grid container alignItems = 'center' justifyContent = 'space-around' sx = {{position : 'relative', borderRadius: 50, width : 'inherit', height: 'inherit'}}>
                                        <Grid item display = 'flex' flexDirection = 'row' flexWrap = 'wrap' alignItems = 'center' sx = {{width : 'inherit', height : 'inherit'}}>
                                            <Stack 
                                                direction = 'row'  
                                                alignItems = 'flex-end' 
                                                sx = {{
                                                    minHeight : 110,
                                                    backgroundColor : '#f9b826',
                                                    borderRadius : 50, 
                                                    border : 'solid 2px #805b10',
                                                    pl:4, pr:4, pt:0.5, pb:0.8,
                                                    transform : 'scale(1.13,1.13)'
                                                    }}   
                                                className = 'shadow-sm'
                                            >
                                                <Burger ingredients = {item} width = {50} />
                                            </Stack>
                                            <Stack direction = 'column' sx = {{ml : 2}}>
                                                <Stack className = 'text-light' direction = 'row' justifyContent = 'center' sx = {{mb : 2}}>
                                                    <Typography variant = 'h6'>Burger Name {item.BurgerName}</Typography>
                                                    <Typography sx = {{ml : 5}} variant = 'h6'>${item.totalPrice.toFixed(2)}</Typography>
                                                </Stack>
                                                <Stack direction = 'row'>
                                                    <Typography className = 'text-light'>Ingredients</Typography>                                                                                        
                                                    <Chip sx = {{ml : 2, mb : 1}} label = {`${item.Lettuce.name} ${item.Lettuce.qty}`} color = 'warning' size = 'small' />
                                                    <Chip sx = {{ml : 2, mb : 1}} label = {`${item.Cheese.name} ${item.Cheese.qty}`} color = 'warning' size = 'small' />
                                                    <Chip sx = {{ml : 2, mb : 1}} label = {`${item.Onion.name} ${item.Onion.qty}`} color = 'warning' size = 'small' />
                                                    <Chip sx = {{ml : 2, mb : 1}} label = {`${item.Tomato.name} ${item.Tomato.qty}`} color = 'warning' size = 'small' />
                                                    <Chip sx = {{ml : 2, mb : 1}} label = {`${item.Meat.name} ${item.Meat.qty}`} color = 'warning' size = 'small' />
                                                    <Chip sx = {{ml : 2, mb : 1}} label = {`${item.Bacon.name} ${item.Bacon.qty}`} color = 'warning' size = 'small' />
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item >
                                            <Button onClick = {() => deleteCartItemHandler(item.dataId)} variant = 'outlined' color = 'success'>Delete</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
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