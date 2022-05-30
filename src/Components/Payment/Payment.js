import { useState } from 'react'
import { Image } from 'react-bootstrap'
import { Box, Divider, FormControl, FormControlLabel, Grid, RadioGroup, Typography, Container } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, arrayUnion, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// ---------- importing from other files -----------
import { db } from '../../firebase-setup.js'
import { CustomRadio, CustomFormLabel, CustomFab } from './style.js'
import { dialogActions } from '../../Store/reducer/dialog.js'
import { ingredientsActions } from '../../Store/reducer/ingredients.js'
import { stepperActions } from '../../Store/reducer/stepper.js'
import { ordersActions } from '../../Store/reducer/orders.js'
import { CuteBurger } from '../../path-to-assets/pathToImages'

const Payment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userId = useSelector(state => state.userForm.currentUser.userId)
    const currentItem = useSelector(state => state.cart.currentItem)
    const cartItems = useSelector(state => state.cart.cartItems) 
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const paymentSuccess = useSelector(state => state.orders.paymentSuccess)
    const address = useSelector(state => state.orders.deliveryAddress)
    
    let totalPrice

    // total price depends upon whether user buying one item or more then 1 items and instandBuy tells us that (if true means buying 1 item)
    // user buying more then 1 items means he/she added those items in cart first, thus using cart items to extract price from each and summed up
    if (instantBuy) {
        totalPrice = currentItem[0].totalPrice.toFixed(1)
    } else {
        const tempData = cartItems.map(item => item.totalPrice)
        totalPrice = cartItems.length !== 0 ? tempData.reduce((total, price) => total + price).toFixed(1) : 0
    }

    // will sends the orders information to the firebase database
    const paymentHandler = async () => {
        let dataToSend
        try {
            if (instantBuy) {
                dataToSend = {...currentItem, orderedOn : new Date().getTime(), userId : userId, totalPrice : totalPrice}
                await addDoc(collection(db, 'orders'), dataToSend)
            } else {
                dataToSend = {...cartItems, orderedOn : new Date().getTime(), userId : userId, totalPrice : totalPrice}
                await addDoc(collection(db, 'orders'), dataToSend) 
                                
                // clearing cart
                for (let item of cartItems) {
                    await deleteDoc(doc(db, 'cart', item.id))
                }
            }
            dispatch(stepperActions.updateActiveStep(3))
            dispatch(ordersActions.updatePaymentSuccess(true))
        } catch (err) {
            console.log(err)
        }
    }

    // this method will take back to the /build-burger page
    // some state properties value also been reset
    const backToBuildingHandler = () => {
        navigate('/build-burger')
        dispatch(dialogActions.updateOpen(false))
        dispatch(ingredientsActions.updateReset())
        dispatch(ordersActions.updatePaymentSuccess(false))
    }

    // showing the currency signs dynamically
    let icon
    if (address.country === 'India') {
        icon = faIndianRupeeSign
    } else {
        icon = faPesoSign
    }

    return (
        <>
            {!paymentSuccess ?
                <Grid container justifyContent = 'center' sx = {{mt : 5}}>
                    <Grid item xs = {6}>
                        <Box 
                            sx = {{ 
                                padding : 3, 
                                backgroundColor : '#f9b826', 
                                height : 300,
                                borderRadius : '10px 0 0 10px',
                                border : 'solid 2px #110f12'}}>
                            <FormControl
                                sx = {{
                                    display : 'flex',
                                    flexDirection : 'column',
                                    alignItems : 'center',
                                }}>
                                <CustomFormLabel id = 'payment method'>
                                    <Typography
                                        variant = 'h5'
                                        sx = {{fontFamily : 'DM Serif Text, serif'}}>
                                        Choose payment method
                                    </Typography>
                                </CustomFormLabel>
                                <RadioGroup aria-labelledby='payment method' sx = {{mt : 2}}>
                                    <FormControlLabel
                                        sx = {{
                                            color : '#110f12',
                                            '& .MuiFormControlLabel-label' : {
                                                fontWeight : 400,
                                                fontSize : '1.2rem',
                                                fontFamily : 'Karla, sans-serif'                                            
                                            }}} 
                                        label = 'Debit Card' 
                                        value = 'Debit Card' 
                                        control = {<CustomRadio />} />
                                    <FormControlLabel  
                                        sx = {{
                                            color : '#110f12',
                                            '& .MuiFormControlLabel-label' : {
                                                fontWeight : 400,
                                                fontSize : '1.2rem',
                                                fontFamily : 'Karla, sans-serif'                                            
                                            }}}
                                        label = 'Credit Card' 
                                        value = 'Credit Card' 
                                        control = {<CustomRadio />} />
                                    <FormControlLabel  
                                        sx = {{
                                            color : '#110f12',
                                            '& .MuiFormControlLabel-label' : {
                                                fontWeight : 400,
                                                fontSize : '1.2rem',
                                                fontFamily : 'Karla, sans-serif'                                            
                                            }}}
                                        label = 'Paypal' 
                                        value = 'Paypal' 
                                        control = {<CustomRadio />} />
                                    <FormControlLabel  
                                        sx = {{
                                            color : '#110f12',
                                            '& .MuiFormControlLabel-label' : {
                                                fontWeight : 400,
                                                fontSize : '1.2rem',
                                                fontFamily : 'Karla, sans-serif'                                            
                                            }}}
                                        label = 'Cash on Delivery' 
                                        value = 'Cash on Delivery' 
                                        control = {<CustomRadio />} />
                                </RadioGroup>
                            </FormControl>                        
                        </Box>
                    </Grid>
                    <Grid item xs = {6}>
                        <Box 
                            sx = {{ 
                                padding : 3, 
                                backgroundColor : '#110f12', 
                                borderRadius : '0 10px 10px 0',
                                height : 300
                            }}>
                            <Typography 
                                className = 'text-center' 
                                sx = {{
                                    color : '#f9b826',
                                    fontFamily : 'DM Serif Text, serif'
                                }} 
                                variant = 'h5'>
                                Price Details
                            </Typography>  
                            <Container>
                                <Grid 
                                    sx = {{mt : 2, mb : 2}} 
                                    container 
                                    justifyContent = 'space-evenly'
                                    alignItems = 'center'>
                                    <Grid item xs = {8}>
                                        <Typography 
                                            variant = 'body1'
                                            sx = {{
                                                color : '#f9b826', 
                                                ml : 6, 
                                                fontFamily :  'Oswald, sans-serif',
                                                fontWeight : 600,
                                                fontSize : '1.3rem'}}>
                                            {instantBuy ? `${currentItem.length} Item` : `${cartItems.length} Items`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs = {4}
                                        display = 'flex'                                        
                                        justifyContent = 'center'
                                        alignItems = 'center'>
                                        <FontAwesomeIcon 
                                            icon = {icon} 
                                            style = {{fontSize : '1.3rem', color : '#f9b826'}}/>  
                                        <Typography 
                                            variant = 'body1'
                                            sx = {{
                                                color : '#f9b826', 
                                                ml : 1,
                                                fontWeight : 600,
                                                fontSize : '1.3rem',
                                                fontFamily :  'Oswald, sans-serif'}}>
                                            {totalPrice}
                                        </Typography>                    
                                    </Grid>                        
                                </Grid>
                                <Grid 
                                    container 
                                    justifyContent = 'center' 
                                    alignItems = 'center'
                                    sx = {{mb: 2}}> 
                                    <Grid item xs = {8}>
                                        <Typography 
                                            variant = 'body1'
                                            sx = {{
                                                color : '#f9b826', 
                                                ml:6,
                                                fontWeight : 600,
                                                fontSize : '1.3rem',
                                                fontFamily :  'Oswald, sans-serif'}}>
                                            Delivery Charges
                                        </Typography>
                                    </Grid>
                                    <Grid item xs = {4}
                                        display = 'flex'
                                        flexDirection = 'row'
                                        justifyContent = 'center'
                                        alignItems = 'center'>
                                        <FontAwesomeIcon 
                                            icon = {icon} 
                                            style = {{fontSize : '1.3rem', color : '#f9b826'}}/>
                                        <Typography 
                                            variant = 'body1'
                                            sx = {{
                                                color : '#f9b826', 
                                                ml:1,
                                                fontWeight : 600,
                                                fontFamily :  'Oswald, sans-serif',
                                                fontSize : '1.3rem'}}>
                                            0
                                        </Typography>
                                    </Grid>
                                </Grid>     
                                <Divider sx = {{borderColor : '#f9b826', mb : 2}} />
                                <Grid 
                                    container 
                                    justifyContent = 'center'
                                    alignItems = 'center'> 
                                    <Grid item xs = {8}>
                                        <Typography 
                                            variant = 'body1'
                                            sx = {{
                                                color : '#f9b826', 
                                                ml:6,
                                                fontWeight : 600,
                                                fontFamily :  'Oswald, sans-serif',
                                                fontSize : '1.3rem'}}>
                                            Total
                                        </Typography>
                                    </Grid>
                                    <Grid item xs = {4}
                                        display = 'flex'
                                        flexDirection = 'row'
                                        justifyContent = 'center'
                                        alignItems = 'center'>
                                        <FontAwesomeIcon 
                                            icon = {icon} 
                                            style = {{fontSize : '1.3rem', color : '#f9b826'}}/>                                        
                                        <Typography 
                                            variant = 'body1'
                                            sx = {{
                                                color : '#f9b826', 
                                                ml:1,
                                                fontWeight : 600,
                                                fontFamily :  'Oswald, sans-serif',
                                                fontSize : '1.3rem'}}>
                                            {totalPrice}
                                        </Typography>
                                    </Grid>
                                </Grid>                
                            </Container>                 
                        </Box>
                    </Grid>
                    <Grid item xs = {12}>
                        <Box className = 'text-center' sx = {{mt:10}}>
                            <CustomFab 
                                variant = 'extended' 
                                onClick= {paymentHandler}>
                                Click here to pay
                            </CustomFab>
                        </Box>
                    </Grid>                     
            </Grid>
            : 
            <Box 
                sx = {{mt:10}} 
                display = 'flex' 
                justifyContent = 'center' 
                alignItems = 'center' 
                flexDirection = 'column'>
                <Image src = {CuteBurger} fluid width = {300} alt = 'a cute burger' />
                <Typography 
                    variant = 'h3' 
                    sx = {{
                        mt:3,
                        fontFamily : 'Abril Fatface, cursive'}}>
                    Payment Successful :)
                </Typography>
                <Typography 
                    sx = {{
                        mt:4,
                        fontFamily : 'Concert One, cursive',
                        fontSize : '1.4rem'}} 
                    variant = 'body1'>
                    Thanks for purchasing
                </Typography>
                <Typography 
                    sx = {{mt:1,
                        fontFamily : 'Concert One, cursive',
                        fontSize : '1.4rem'}} 
                    variant = 'body1'>
                    Your Burger will be deliever within 20 mins and we bet on that XD
                </Typography>
                <CustomFab 
                    onClick = {backToBuildingHandler} 
                    sx = {{mt:5}} 
                    variant = 'extended' 
                    size = 'large'>
                    Continue building burger
                </CustomFab>
            </Box>
            }
        </>
    )
}

export default Payment