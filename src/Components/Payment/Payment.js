import { useState } from 'react'
import { Box, Button, Divider, FormControl, FormControlLabel, Grid, Paper, RadioGroup, Stack, Typography, Container, Fab } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ---------- importing from other files -----------
import { CustomRadio, CustomFormLabel, CustomFab } from './style.js'
import { dialogActions } from '../../Store/reducer/dialog.js'
import { ingredientsActions } from '../../Store/reducer/ingredients.js'

const Payment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentItem = useSelector(state => state.cart.currentItem)
    const cartItems = useSelector(state => state.cart.cartItems) 
    const instantBuy = useSelector(state => state.cart.instantBuy)

    const [paymentSuccess, setPaymentSuccess] = useState(false)
    
    let totalPrice

    // total price depends upon whether user buying one item or more then 1 items and instandBuy tells us that (if true means buying 1 item)
    // user buying more then 1 items means he/she added those items in cart first, thus using cart items to extract price from each and summed up
    if (instantBuy) {
        totalPrice = currentItem[0].totalPrice.toFixed(1)
    } else {
        const tempData = cartItems.map(item => item.totalPrice)
        totalPrice = tempData.reduce((total, price) => total + price).toFixed(1)
    }

    const paymentHandler = () => {
        setTimeout(() => {
            setPaymentSuccess(true)
        }, [2000])
    }

    const backToBuildingHandler = () => {
        navigate('/build-burger')
        dispatch(dialogActions.updateOpen(false))
        dispatch(ingredientsActions.updateReset())
    }

    return (
        <>
            {!paymentSuccess ?
                <Grid container justifyContent = 'center' sx = {{mt : 5}} spacing = {2}>
                    <Grid item xs = {6} sx = {{}}>
                        <Paper sx = {{ padding : 3, backgroundColor : '#110f12', height : 300}}>
                            <Stack alignItems = 'center'>
                                <FormControl>
                                    <CustomFormLabel id = 'payment method'>Choose payment method</CustomFormLabel>
                                    <RadioGroup aria-labelledby='payment method' sx = {{mt : 2}}>
                                        <FormControlLabel  
                                            sx = {{color : '#f9b826'}} 
                                            label = 'Debit Card' 
                                            value = 'Debit Card' 
                                            control = {<CustomRadio />}
                                        />
                                        <FormControlLabel  
                                            sx = {{color : '#f9b826'}} 
                                            label = 'Credit Card' 
                                            value = 'Credit Card' 
                                            control = {<CustomRadio />} 
                                        />
                                        <FormControlLabel  
                                            sx = {{color : '#f9b826'}} 
                                            label = 'Paypal' 
                                            value = 'Paypal' 
                                            control = {<CustomRadio />} 
                                        />
                                        <FormControlLabel  
                                            sx = {{color : '#f9b826'}} 
                                            label = 'Cash on Delivery' 
                                            value = 'Cash on Delivery' 
                                            control = {<CustomRadio />} 
                                        />
                                    </RadioGroup>
                                </FormControl>                        
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs = {6}>
                        <Paper 
                            sx = {{ 
                                padding : 3, 
                                backgroundColor : '#110f12', 
                                height : 300
                            }}
                        >
                            <Typography 
                                className = 'text-center' 
                                sx = {{color : '#f9b826'}} 
                                variant = 'h4'
                            >
                                Price Details
                            </Typography>  
                            <Container>
                                <Grid sx = {{mt : 2, mb : 2}} container justifyContent = 'space-evenly'>
                                    <Grid item xs = {8}>
                                        <Typography sx = {{color : '#f9b826', ml : 6}}>
                                            {instantBuy ? `${currentItem.length} Item` : `${cartItems.length} Items`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs = {4}>
                                        <Typography sx = {{color : '#f9b826', ml : 6}}>
                                            ${totalPrice}
                                        </Typography>                    
                                    </Grid>                        
                                </Grid>
                                <Grid container justifyContent = 'center' sx = {{mb: 2}}> 
                                    <Grid item xs = {8}>
                                        <Typography sx = {{color : '#f9b826', ml:6}}>
                                            Delivery Charges
                                        </Typography>
                                    </Grid>
                                    <Grid item xs = {4}>
                                        <Typography sx = {{color : '#f9b826', ml:6}}>$0</Typography>
                                    </Grid>
                                </Grid>     
                                <Divider sx = {{borderColor : '#f9b826', mb : 2}} />
                                <Grid container justifyContent = 'center'> 
                                    <Grid item xs = {8}>
                                        <Typography sx = {{color : '#f9b826', ml:6}}>Total</Typography>
                                    </Grid>
                                    <Grid item xs = {4}>
                                        <Typography sx = {{color : '#f9b826', ml:6}}>${totalPrice}</Typography>
                                    </Grid>
                                </Grid>                
                            </Container>                 
                        </Paper>
                    </Grid>
                    <Grid item xs = {12}>
                        <Box className = 'text-center' sx = {{mt:10}}>
                            <CustomFab 
                                variant = 'extended' 
                                color = 'primary'
                                onClick={paymentHandler}
                            >
                                <strong>Click here to pay</strong>
                            </CustomFab>
                        </Box>
                    </Grid>                     
            </Grid>
            : 
                <Box sx = {{mt:10}} display = 'flex' justifyContent = 'center'>
                    <Paper sx = {{p:3}}>
                        <Typography variant = 'h5'>Payment Successful :)</Typography>
                        <Typography sx = {{mt:4}}>Thanks for purchasing</Typography>
                        <Typography sx = {{mt:1}}>Your Burger will be delieverd shortly</Typography>
                        <Button onClick = {backToBuildingHandler} sx = {{mt:5}} variant = 'contained' color = 'secondary'>Continue building burger</Button>
                    </Paper>

                </Box>
            }
        </>
    )
}

export default Payment