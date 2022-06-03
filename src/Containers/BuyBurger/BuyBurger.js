import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { Container, Stepper, Step, StepLabel, Fab, useMediaQuery, Box } from '@mui/material'
import { motion } from 'framer-motion'

// --------- importing from other files ----------------
import { stepperActions } from '../../Store/reducer/stepper'
import useStyle from './style'

const BuyBurger = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyle()

    // creating responsive breakpoints
    const break_550 = useMediaQuery('(max-width : 550px)')

    const activeStep = useSelector(state => state.stepper.activeStep)
    const selectedAddress = useSelector(state => state.orders.deliveryAddress)
    const paymentSuccess = useSelector(state => state.orders.paymentSuccess)

    // fetching the keys of selectedAddress
    // will use to disable or enable the 'NEXT' button depending upon
    const selectedAddressKey = Object.keys(selectedAddress)

    // what stepper value should be on a particular path
    useEffect(() => {
        switch (pathname) {
            case '/buy/delivery-address':
                dispatch(stepperActions.updateActiveStep(0))
                break;
            case '/buy/order-summary':
                dispatch(stepperActions.updateActiveStep(1))
                break;
            case '/buy/payment':
                paymentSuccess ?
                dispatch(stepperActions.updateActiveStep(3)) :
                dispatch(stepperActions.updateActiveStep(2))
                break;
            default:
                return null
        }        
    }, [activeStep, pathname])

    // to handle the progress of stepper 
    const backHandler = () => {
        if (activeStep === 2) {
            dispatch(stepperActions.updateActiveStep(1))
            navigate('/buy/order-summary')
        } else if (activeStep === 1) {
            dispatch(stepperActions.updateActiveStep(0))
            navigate('/buy/delivery-address')
        }
    }
    
    const nextHandler = () => { 
        // this way we make user that when user click on user button it not only navigate to the next page but also set the stepper value, due to which...
        //.. whenever user try to go back to the previous page, the stepper will also gonna change according to the change in url 
        if (activeStep <= 2) {
            if (activeStep === 0) {
                dispatch(stepperActions.updateActiveStep(1))
                navigate('/buy/order-summary')
            } else if (activeStep === 1) {
                dispatch(stepperActions.updateActiveStep(2))
                navigate('/buy/payment')
            }
        }        
    } 

    return (
        <Container sx = {{mt : 10}}>
            <Stepper 
                className = 'slider' 
                activeStep = {activeStep}
                orientation = {break_550 ? 'vertical' : 'horizontal'}>
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
                    className = {[classes.both, classes.back].join(' ')}>
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