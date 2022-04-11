import { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { getDocs, query, where, doc, collection } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'

// ------ importing from other files --------
import { db } from '../../firebase-setup'
import { cartActions } from '../../Store/reducer/cart'

const Cart = () => {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.userForm.currentUser.userId)
    const cartItems = useSelector(state => state.cart.cartItems)

    useEffect(() => {
        (async () => {

            try {
                const cartItemsQuery = query(collection(db, 'cart'), where('userId', '==', userId))
                const getCartItem = await getDocs(cartItemsQuery)            
                
                let temp = []
                getCartItem.forEach(doc => {
                    temp.push(doc.data())
                })
                dispatch(cartActions.updateCartItems([...temp]))
            } catch (err) {
                console.log('failed to fetch cart items, please check ur internet connection')
            }
        })();
    }, [])

    return (
        <Container>
            <Box sx = {{mt : 10}}>
                {cartItems.map(item => {
                    return (
                        <div>
                            {item.totalPrice.toFixed(2)}
                        </div>
                    )
                })}
            </Box>
        </Container>
    )
}

export default Cart