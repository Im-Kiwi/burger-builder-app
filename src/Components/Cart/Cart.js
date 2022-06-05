import { Box, Container, Stack, Typography, useMediaQuery, Divider } from '@mui/material'
import { Image } from 'react-bootstrap'
import { doc, deleteDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

// ------ importing from other files --------
import { styles } from './styles'
import { cartBreakpoints } from '../../theme/mui-theme'
import { db } from '../../firebase-setup'
import OrderItem from '../OrderItem/OrderItem'
import { EmptyCart } from '../../path-to-assets/pathToImages'

const Cart = () => {
    const classes = styles()

    // creating breakpoints
    const break_940 = useMediaQuery('(max-width : 940px)')
    const break_700 = useMediaQuery('(max-width : 700px')
    const break_500 = useMediaQuery('(max-width : 500px)')
    const break_420 = useMediaQuery('(max-width : 420px)')

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
            {cartItems.length === 0 &&
                <Stack
                    className = {classes.emptyCart}
                    component = {motion.div}
                    initial = {{opacity : 0}}
                    animate = {{opacity : 1}}                    
                    alignItems = 'center'
                    justifyContent = 'center'
                    spacing = {5}>
                    <Image 
                        fluid 
                        src = {EmptyCart} 
                        width = {600} 
                        alt = 'empty cart' />
                    <Typography
                        variant = 'h3'
                        sx = {{fontFamily : 'Passion One, cursive'}}>
                        Your Cart is Empty
                    </Typography>
                </Stack>
            }
            <Box className = {classes.cart}>
                <Box position = 'relative' sx = {{mt: break_500 ? 15:6}}>
                    <AnimatePresence>
                        {cartItems.map((item) => {
                            return (
                                <div key = {item.id}>
                                    <motion.div 
                                        className = 'mx-auto'
                                        layout
                                        exit = {{
                                            x : -100, 
                                            opacity : 0,
                                            transition : {ease : 'easeOut'}
                                        }}
                                        style = {{marginBottom : 100}}>
                                        <OrderItem 
                                            ing = {item} 
                                            thisIsCart = {true}
                                            deleteCartItemHandler = {deleteCartItemHandler}
                                            firstBreak = {break_940}
                                            secondBreak = {break_700}
                                            thirdBreak = {break_420} />                                    
                                    </motion.div>
                                    {break_940 && <Divider sx = {{mt:-9, mb:6}} />}
                                </div>
                            )
                        })}
                    </AnimatePresence>
                </Box>                
            </Box>
        </Container>
    )
}

export default Cart