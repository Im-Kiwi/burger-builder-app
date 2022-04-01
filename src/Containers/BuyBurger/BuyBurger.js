import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Stepper, Step, StepLabel, Box, Button, AppBar, Fab } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

// --------- importing from other files ----------------
import OrderSummary from "../OrderSummary/OrderSummary"
import DeliveryAddress from '../../Components/DeliveryAddress/DeliveryAddress'

const BuyBurger = () => {

    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0)

    // to handle the progress of stepper 
    const stepHandler = (isNext) => {
        if (isNext && activeStep <= 2) {
            setActiveStep(prev => prev + 1)
        } else if (!isNext &&   activeStep >= 1) {
            setActiveStep(prev => prev - 1)
        }
    }

    const confirmBurgerHandler = () => {
        navigate('/delivery-address')
    }

    return (
        <Container sx = {{mt : 10}}>
            <Stepper className='slider' activeStep = {activeStep}>
                <Step className = 'text-danger '>
                    <StepLabel>Confirm Your Burger</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Delivery Address</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Routes>
                <Route path = '/order-summary' element = {<OrderSummary confirmBurgerHandler = {confirmBurgerHandler} />} />
                <Route path = '/delivery-address' element = {<DeliveryAddress />} />
            </Routes>
           
            <Fab 
                variant = 'extended' size = 'small'
                color = 'secondary' 
                sx = {{position : 'fixed', bottom : 50, left : '15%', padding : 2}} 
                onClick = {() => stepHandler()}
            >
                Back
            </Fab>
        </Container>
    )
}

export default BuyBurger