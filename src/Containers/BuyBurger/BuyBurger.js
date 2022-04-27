import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { Container, Stepper, Step, StepLabel, Fab } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

// --------- importing from other files ----------------
import { stepperActions } from '../../Store/reducer/stepper'
import useStyle from './style'

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
                    <StepLabel>Mention delivery address</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Order Summary</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Outlet />
            <Fab 
                variant = 'extended' size = 'small'
                color = 'secondary' 
                onClick = {backHandler}
                className = {[classes.both, classes.back].join(' ')}
            >
                Back
            </Fab> 
            {true ?
                <Fab 
                    variant = 'extended' size = 'small'
                    color = 'secondary' 
                    onClick = {nextHandler}
                    className = {[classes.both, classes.next].join(' ')}
                    disabled = {selectedAddressKey.length === 0}
                >
                    Next
                </Fab>           
            : null
            }
        </Container>
    )
}

export default BuyBurger