import { useSelector, useDispatch } from 'react-redux'
import { Box, FormControl, Typography, RadioGroup, FormControlLabel } from '@mui/material'

// ------ importing from other files -------
import { CustomRadio, CustomFormLabel, styles } from './styles'
import { ordersActions } from '../../../Store/reducer/orders'

const PaymentMethods = () => {
    const classes = styles()
    const dispatch = useDispatch()

    // fetching values from redux store
    const paymentMethod = useSelector(state => state.orders.paymentMethod) // contains the payment mode which user selected

    // method to control radio button
    const changePaymentMethod = (event) => {
        dispatch(ordersActions.updatePaymentMethod(event.target.value))
    }

    return (
        <Box className = {classes.paymentContainer}>
            <FormControl
                className = {classes.formControl}>
                <CustomFormLabel id = 'payment method'>
                    <Typography
                        variant = 'h5'
                        sx = {{textAlign : 'center', fontFamily : 'DM Serif Text, serif'}}>
                        Choose payment method
                    </Typography>
                </CustomFormLabel>
                <RadioGroup 
                    aria-labelledby='payment method' 
                    sx = {{mt : 2}}
                    value = {paymentMethod}
                    onChange = {(event) => changePaymentMethod(event)}>
                    <FormControlLabel
                        className = {classes.formLabel}
                        label = 'Debit Card' 
                        value = 'Debit Card' 
                        control = {<CustomRadio />} />
                    <FormControlLabel  
                        className = {classes.formLabel}
                        label = 'Credit Card' 
                        value = 'Credit Card' 
                        control = {<CustomRadio />} />
                    <FormControlLabel  
                        className = {classes.formLabel}
                        label = 'Paypal' 
                        value = 'Paypal' 
                        control = {<CustomRadio />} />
                    <FormControlLabel  
                        className = {classes.formLabel}
                        label = 'Cash on Delivery' 
                        value = 'Cash on Delivery' 
                        control = {<CustomRadio />} />
                </RadioGroup>
            </FormControl>                        
        </Box>
    )
}

export default PaymentMethods