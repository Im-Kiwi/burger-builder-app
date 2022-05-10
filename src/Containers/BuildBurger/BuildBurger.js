import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

// ------- importing from files -------------
import classes from './BuildBurger.module.css'
import BurgerController from '../../Components/BurgerController/BurgerController'
import DisplayBurger from '../../Components/DisplayBurger/DisplayBurger'
import FullDialogs from '../../Components/FullDialogs/FullDialogs'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'

const BuildBurger = (props) => {
    const { pathname } = useLocation()

    return (
        <Box className = {classes.main}>
            <NavigationBar />
            <Grid container>
                <Grid xs = {7} item className = {[classes.firstItem].join(' ')}>
                    <Box display = 'flex' justifyContent = 'center' className = {classes.burgerContainer}>
                        <DisplayBurger /> {/* burger will display here */}
                    </Box>
                </Grid>
                <Grid xs = {5} item className = {classes.secondItem}>
                    <BurgerController /> {/* this will display the burger controller with the help of which user can add ingredients on the burger */}
                </Grid>
            </Grid>
            {/* below is the condition to show the modal and full screen modal depending upon the url */}
            {pathname === '/your-orders' || pathname === '/your-addresses' || pathname === '/security-settings' ? 
                <Outlet />
            :
            <FullDialogs title = {props.title} priceInfo = {props.priceInfo} isOrderSummary = {true} closeDialogHandler = {props.closeDialogHandler} >
                <Outlet />
            </FullDialogs>
            }
        </Box>        
    )
}

export default BuildBurger