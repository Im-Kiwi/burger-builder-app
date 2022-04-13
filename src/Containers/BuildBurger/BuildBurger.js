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
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const token = useSelector(state => state.userForm.currentUser.token)

    return (
        <Box className = {classes.main}>
            <NavigationBar />
            <Grid container>
                <Grid xs = {7} item className = {[classes.firstItem].join(' ')}>
                    <Box display = 'flex' justifyContent = 'center' className = {classes.burgerContainer}>
                        <DisplayBurger />
                    </Box>
                </Grid>
                <Grid xs = {5} item className = {classes.secondItem}>
                    <BurgerController />
                </Grid>
            </Grid>
            <FullDialogs title = {props.title} priceInfo = {props.priceInfo} isOrderSummary = {true} closeDialogHandler = {props.closeDialogHandler} >
                <Outlet />
            </FullDialogs>
        </Box>        
    )
}

export default BuildBurger