import { Image, Spinner } from 'react-bootstrap'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// ---------- importing from other files -----------
import { db } from '../../firebase-setup.js'
import { CustomFab, styles } from './styles.js'
import { dialogActions } from '../../Store/reducer/dialog.js'
import { ingredientsActions } from '../../Store/reducer/ingredients.js'
import { stepperActions } from '../../Store/reducer/stepper.js'
import { ordersActions } from '../../Store/reducer/orders.js'
import { loadingActions } from '../../Store/reducer/loading.js'
import { CuteBurger } from '../../path-to-assets/pathToImages'
import { dispatching, india } from '../../identifiers/identifiers.js'
import PaymentMethods from './PaymentMethod/PaymentMethod.js'
import PriceDetails from './PriceDetails/PriceDetails.js'

const Payment = () => {
    const classes = styles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // creating break points
    const break_705 = useMediaQuery('(max-width : 705px)')
    const break_326 = useMediaQuery('(max-width : 326px)')

    // fetching values from redux store
    const userId = useSelector(state => state.userForm.currentUser.userId) // id of the user
    const currentItem = useSelector(state => state.cart.currentItem) // contain current burger which user build
    const cartItems = useSelector(state => state.cart.cartItems) // contains cart items
    const instantBuy = useSelector(state => state.cart.instantBuy) // mode which tells whether user placing order thru cart or buying directly
    const paymentMethod = useSelector(state => state.orders.paymentMethod) // method of payment
    const paymentSuccess = useSelector(state => state.orders.paymentSuccess) // stores the boolean value to tell whether payment is success
    const deliveryAddress = useSelector(state => state.orders.deliveryAddress) // selected delivery address of the user
    const loading = useSelector(state => state.loading.loading) // to enable/disable the loading spinner
    
    let totalPrice
    // total price depends upon whether user buying one item or more then 1 items and instandBuy tells us that (if true means buying 1 item)
    // user buying more then 1 items means he/she added those items in cart first, thus using cart items to extract price from each and summed up
    if (instantBuy) {
        totalPrice = currentItem[0].totalPrice.toFixed(0)
    } else {
        const tempData = cartItems.map(item => item.totalPrice)
        totalPrice = cartItems.length !== 0 ? tempData.reduce((total, price) => total + price).toFixed(0) : 0
    }

    // will sends the orders information to the firebase database
    const paymentHandler = async () => {
        let dataToSend
        dispatch(loadingActions.updateLoading(true)) // enable the loading spinner
        try {
            if (instantBuy) {
                dataToSend = {
                    ...currentItem, 
                    orderedOn : new Date().getTime(), 
                    userId : userId, 
                    totalPrice : totalPrice,
                    paymentType : paymentMethod,
                    status : dispatching,
                    address : deliveryAddress
                }
                await addDoc(collection(db, 'orders'), dataToSend)
            } else {
                dataToSend = {
                    ...cartItems, 
                    orderedOn : new Date().getTime(), 
                    userId : userId, 
                    totalPrice : totalPrice,
                    paymentType : paymentMethod,
                    status : dispatching,
                    address : deliveryAddress
                }
                await addDoc(collection(db, 'orders'), dataToSend)                                 
                // clearing cart
                for (let item of cartItems) {
                    await deleteDoc(doc(db, 'cart', item.id))
                }
            }
            dispatch(stepperActions.updateActiveStep(3)) // stepper will be updated
            dispatch(ordersActions.updatePaymentSuccess(true)) // success payment
            dispatch(loadingActions.updateLoading(false))
        } catch (err) {
            console.log(err)
            dispatch(ordersActions.updatePaymentSuccess(false))
            dispatch(loadingActions.updateLoading(false))
        }
    }

    // this method will take back to the /build-burger page
    // some state properties value also been reset
    const backToBuildingHandler = () => {
        navigate('/build-burger')
        dispatch(dialogActions.updateOpen(false)) // close the fullscreen modal
        dispatch(ingredientsActions.updateReset()) // this will reset the burger in burger builder
        dispatch(ordersActions.updatePaymentSuccess(false)) // payment success flag will reset to false
        dispatch(ordersActions.updatePaymentMethod('')) // payment method will be reset
        // removing data from local storage
        localStorage.removeItem('id') 
        localStorage.removeItem('prevPath')
    }

    // showing the currency signs dynamically
    let icon
    if (deliveryAddress.country === india) {
        icon = faIndianRupeeSign
    } else {
        icon = faPesoSign
    }

    return (
        <Box sx = {{mb:5}}>
            {!paymentSuccess ?
                <Grid 
                    container 
                    component = {motion.div}
                    initial = {{x:200, opacity:0}}
                    animate = {{x:0, opacity:1}}
                    direction = {break_705 ? 'column' : 'row'}
                    justifyContent = 'center' 
                    sx = {{mt : 5}}>
                    <Grid item xs = {6}>
                        <PaymentMethods  />
                    </Grid>
                    <Grid item xs = {6}>
                        <PriceDetails 
                            icon = {icon} 
                            totalPrice = {totalPrice} />                        
                    </Grid>
                    <Grid item xs = {12}>
                        <Box className = 'text-center' sx = {{mt:10}}>
                            <CustomFab 
                                variant = 'extended' 
                                disabled = {paymentMethod ? false : true}
                                onClick= {paymentHandler}
                                sx = {{opacity : paymentMethod ? 1:0.4}}>
                                {loading ? <Spinner animation = 'border' /> : 'Click here to pay'}
                            </CustomFab>
                        </Box>
                    </Grid>                     
            </Grid>
            : 
            // below to display "order successfuly placed" message
            <Box 
                component = {motion.div}
                initial = {{x:200, opacity:0}}
                animate = {{x:0, opacity:1}}
                sx = {{mt:10, textAlign : 'center'}} 
                display = 'flex' 
                justifyContent = 'center' 
                alignItems = 'center' 
                flexDirection = 'column'>
                <Image 
                    src = {CuteBurger} 
                    fluid 
                    width = {300} 
                    alt = 'a cute burger' />
                <Typography 
                    variant = {break_326 ? 'h4' : 'h3'}
                    className = {classes.success}>
                    Order placed successfully :)
                </Typography>
                    <Typography 
                        variant = 'body1'
                        className = {['mt-3', classes.successMsg].join(' ')}>
                        Thanks for placing order
                    </Typography>
                    <Typography 
                        variant = 'body1'
                        className = {['mt-1', classes.successMsg].join(' ')}>
                        Your Burger will be deliver within 20 mins and we bet on that XD
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
        </Box>
    )
}

export default Payment