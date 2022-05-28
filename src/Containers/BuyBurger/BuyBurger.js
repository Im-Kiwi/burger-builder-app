import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { Container, Stepper, Step, StepLabel, Fab } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

// --------- importing from other files ----------------
import { stepperActions } from '../../Store/reducer/stepper'
import useStyle from './style'
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress'

const BuyBurger = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyle()

    const activeStep = useSelector(state => state.stepper.activeStep)
    const selectedAddress = useSelector(state => state.orders.deliveryAddress)

    // fetching the keys of selectedAddress
    // will use to disable or enable the 'NEXT' button depending upon
    const selectedAddressKey = Object.keys(selectedAddress)

    useEffect(() => {
        switch (activeStep) {
            case 0:
                navigate('/buy/delivery-address')
                break;
            case 1:
                navigate('/buy/order-summary')
                break;
            case 2:
                navigate('/buy/payment')
                break;
            default:
                return null
        }        
    }, [activeStep])

    // to handle the progress of stepper 
    const backHandler = () => {
        if (activeStep >= 1) {
            dispatch(stepperActions.updateActiveStep(-1))            
        }
    }
    
    const nextHandler = () => {        
        if (activeStep <= 2) {
            dispatch(stepperActions.updateActiveStep(1))            
        }
        
    }

    return (
        <Container sx = {{mt : 10}}>
            <Stepper className='slider' activeStep = {activeStep}>
                <Step className = 'text-danger '>
                    <StepLabel>
                        <strong>Mention delivery address</strong>    
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        <strong>Order Summary</strong>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        <strong>Payment</strong>
                    </StepLabel>
                </Step>
            </Stepper>
            <Outlet />
            <motion.div
                initial = {{opacity : 0}}
                animate = {{opacity : activeStep > 0 && activeStep < 3 ? 1 : 0 }}>
                <Fab 
                    variant = 'extended' size = 'small'
                    color = 'secondary' 
                    onClick = {backHandler}
                    className = {[classes.both, classes.back].join(' ')}
                >
                    Back
                </Fab> 
            </motion.div>            
            <motion.div
                initial = {{opacity : 0}}
                animate = {{opacity : activeStep !== 2 && activeStep < 3 && selectedAddressKey.length !== 0 ? 1 : 0}}
                transition = {{ease : 'easeOut'}}>
                <motion.div>
                    <Fab 
                        variant = 'extended' size = 'small'
                        color = 'secondary' 
                        onClick = {nextHandler}
                        className = {[classes.both, classes.next].join(' ')}>
                        Next
                    </Fab>                       
                </motion.div>
            </motion.div>
        </Container>
    )
}

export default BuyBurger